import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:crypto/crypto.dart';
import 'package:device_info_plus/device_info_plus.dart';
import 'dart:convert';
import 'dart:io';

import '../../../core/services/api_service.dart';
import '../../../models/user.dart';
import '../../../models/api_response.dart';

class AuthState {
  final User? user;
  final bool isLoading;
  final bool isAuthenticated;
  final String? error;

  const AuthState({
    this.user,
    this.isLoading = false,
    this.isAuthenticated = false,
    this.error,
  });

  AuthState copyWith({
    User? user,
    bool? isLoading,
    bool? isAuthenticated,
    String? error,
  }) {
    return AuthState(
      user: user ?? this.user,
      isLoading: isLoading ?? this.isLoading,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      error: error,
    );
  }

  @override
  String toString() {
    return 'AuthState{user: $user, isLoading: $isLoading, isAuthenticated: $isAuthenticated, error: $error}';
  }
}

class AuthNotifier extends StateNotifier<AuthState> {
  final ApiService _apiService;

  AuthNotifier(this._apiService) : super(const AuthState()) {
    _checkAuthStatus();
  }

  Future<void> _checkAuthStatus() async {
    if (_apiService.sessionId == null) {
      state = state.copyWith(isAuthenticated: false, isLoading: false);
      return;
    }

    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final user = await _apiService.getCurrentUser();
      state = state.copyWith(
        user: user,
        isAuthenticated: true,
        isLoading: false,
      );
    } catch (e) {
      // Session is invalid
      await _apiService.setSessionId(null);
      state = state.copyWith(
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      );
    }
  }

  Future<void> login(String username, String password) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final response = await _apiService.login(username, password);
      state = state.copyWith(
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString().replaceFirst('Exception: ', ''),
      );
      rethrow;
    }
  }

  Future<void> register(String username, String password) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final deviceId = await _generateDeviceFingerprint();
      
      // Check if device can register
      final deviceCheck = await _apiService.checkDevice(deviceId);
      if (!deviceCheck.canRegister) {
        throw Exception(deviceCheck.reason ?? 'Thiết bị này không thể đăng ký.');
      }

      final response = await _apiService.register(username, password, deviceId);
      state = state.copyWith(
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString().replaceFirst('Exception: ', ''),
      );
      rethrow;
    }
  }

  Future<void> logout() async {
    state = state.copyWith(isLoading: true);
    
    try {
      await _apiService.logout();
    } catch (e) {
      // Continue with logout even if API call fails
    } finally {
      state = const AuthState(isLoading: false, isAuthenticated: false);
    }
  }

  void clearError() {
    state = state.copyWith(error: null);
  }

  Future<String> _generateDeviceFingerprint() async {
    final deviceInfo = DeviceInfoPlugin();
    String fingerprint = '';

    try {
      if (Platform.isAndroid) {
        final androidInfo = await deviceInfo.androidInfo;
        fingerprint = [
          androidInfo.model,
          androidInfo.manufacturer,
          androidInfo.brand,
          androidInfo.device,
          androidInfo.id,
        ].join('|');
      } else if (Platform.isIOS) {
        final iosInfo = await deviceInfo.iosInfo;
        fingerprint = [
          iosInfo.model,
          iosInfo.name,
          iosInfo.systemName,
          iosInfo.systemVersion,
          iosInfo.identifierForVendor,
        ].join('|');
      } else {
        fingerprint = 'unknown_device';
      }
    } catch (e) {
      fingerprint = 'fallback_device_${DateTime.now().millisecondsSinceEpoch}';
    }

    // Create a hash of the fingerprint
    final bytes = utf8.encode(fingerprint);
    final digest = sha256.convert(bytes);
    return digest.toString();
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  final apiService = ref.watch(apiServiceProvider);
  return AuthNotifier(apiService);
});