import 'package:json_annotation/json_annotation.dart';

part 'api_response.g.dart';

@JsonSerializable(genericArgumentFactories: true)
class ApiResponse<T> {
  final bool success;
  final String? message;
  final T? data;
  final String? error;

  const ApiResponse({
    required this.success,
    this.message,
    this.data,
    this.error,
  });

  factory ApiResponse.fromJson(
    Map<String, dynamic> json,
    T Function(Object? json) fromJsonT,
  ) =>
      _$ApiResponseFromJson(json, fromJsonT);

  Map<String, dynamic> toJson(Object? Function(T value) toJsonT) =>
      _$ApiResponseToJson(this, toJsonT);

  factory ApiResponse.success(T data, {String? message}) {
    return ApiResponse(
      success: true,
      data: data,
      message: message,
    );
  }

  factory ApiResponse.error(String error) {
    return ApiResponse(
      success: false,
      error: error,
    );
  }

  bool get isSuccess => success && error == null;
  bool get isError => !success || error != null;

  @override
  String toString() {
    return 'ApiResponse{success: $success, message: $message, data: $data, error: $error}';
  }
}

@JsonSerializable()
class LoginResponse {
  final User user;
  final String? sessionId;

  const LoginResponse({
    required this.user,
    this.sessionId,
  });

  factory LoginResponse.fromJson(Map<String, dynamic> json) =>
      _$LoginResponseFromJson(json);
  Map<String, dynamic> toJson() => _$LoginResponseToJson(this);
}

@JsonSerializable()
class RegisterResponse {
  final User user;
  final String? sessionId;

  const RegisterResponse({
    required this.user,
    this.sessionId,
  });

  factory RegisterResponse.fromJson(Map<String, dynamic> json) =>
      _$RegisterResponseFromJson(json);
  Map<String, dynamic> toJson() => _$RegisterResponseToJson(this);
}

@JsonSerializable()
class CreditsResponse {
  final int credits;

  const CreditsResponse({
    required this.credits,
  });

  factory CreditsResponse.fromJson(Map<String, dynamic> json) =>
      _$CreditsResponseFromJson(json);
  Map<String, dynamic> toJson() => _$CreditsResponseToJson(this);
}

@JsonSerializable()
class ModelStatusResponse {
  final bool enabled;
  final String status;

  const ModelStatusResponse({
    required this.enabled,
    required this.status,
  });

  factory ModelStatusResponse.fromJson(Map<String, dynamic> json) =>
      _$ModelStatusResponseFromJson(json);
  Map<String, dynamic> toJson() => _$ModelStatusResponseToJson(this);
}

@JsonSerializable()
class DeviceCheckResponse {
  final bool canRegister;
  final String? reason;

  const DeviceCheckResponse({
    required this.canRegister,
    this.reason,
  });

  factory DeviceCheckResponse.fromJson(Map<String, dynamic> json) =>
      _$DeviceCheckResponseFromJson(json);
  Map<String, dynamic> toJson() => _$DeviceCheckResponseToJson(this);
}

// Import User class
class User {
  final String id;
  final String username;
  final bool isAdmin;
  final String? deviceId;
  final DateTime? createdAt;

  const User({
    required this.id,
    required this.username,
    required this.isAdmin,
    this.deviceId,
    this.createdAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as String,
      username: json['username'] as String,
      isAdmin: json['isAdmin'] as bool? ?? false,
      deviceId: json['deviceId'] as String?,
      createdAt: json['createdAt'] != null 
          ? DateTime.parse(json['createdAt'] as String)
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'username': username,
      'isAdmin': isAdmin,
      'deviceId': deviceId,
      'createdAt': createdAt?.toIso8601String(),
    };
  }
}