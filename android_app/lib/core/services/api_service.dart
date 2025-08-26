import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../constants/api_constants.dart';
import '../../models/api_response.dart';
import '../../models/user.dart';
import '../../models/video_generation.dart';
import '../../models/photai_generation.dart';

final dioProvider = Provider<Dio>((ref) {
  final dio = Dio(BaseOptions(
    baseUrl: ApiConstants.baseUrl,
    connectTimeout: const Duration(seconds: 30),
    receiveTimeout: const Duration(seconds: 30),
    headers: {
      'Content-Type': 'application/json',
    },
  ));

  // Add interceptors for logging and error handling
  dio.interceptors.add(LogInterceptor(
    requestBody: true,
    responseBody: true,
    error: true,
  ));

  dio.interceptors.add(
    InterceptorsWrapper(
      onError: (error, handler) {
        // Handle common errors
        if (error.response?.statusCode == 401) {
          // Handle unauthorized - redirect to login
        }
        handler.next(error);
      },
    ),
  );

  return dio;
});

final sharedPreferencesProvider = Provider<SharedPreferences>((ref) {
  throw UnimplementedError();
});

final apiServiceProvider = Provider<ApiService>((ref) {
  final dio = ref.watch(dioProvider);
  final prefs = ref.watch(sharedPreferencesProvider);
  return ApiService(dio, prefs);
});

class ApiService {
  final Dio _dio;
  final SharedPreferences _prefs;
  
  static const String _sessionKey = 'session_id';

  ApiService(this._dio, this._prefs);

  String? get sessionId => _prefs.getString(_sessionKey);
  
  Future<void> setSessionId(String? sessionId) async {
    if (sessionId != null) {
      await _prefs.setString(_sessionKey, sessionId);
    } else {
      await _prefs.remove(_sessionKey);
    }
  }

  // Add session to headers if available
  Options get _defaultOptions {
    final session = sessionId;
    return Options(
      headers: session != null 
          ? {'Cookie': 'connect.sid=$session'} 
          : null,
    );
  }

  // Auth endpoints
  Future<LoginResponse> login(String username, String password) async {
    try {
      final response = await _dio.post(
        ApiConstants.login,
        data: {
          'username': username,
          'password': password,
        },
      );

      final loginResponse = LoginResponse.fromJson(response.data);
      
      // Extract session from cookies if available
      final cookies = response.headers['set-cookie'];
      if (cookies != null) {
        for (final cookie in cookies) {
          if (cookie.startsWith('connect.sid=')) {
            final sessionId = cookie.split('=')[1].split(';')[0];
            await setSessionId(sessionId);
            break;
          }
        }
      }

      return loginResponse;
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  Future<RegisterResponse> register(String username, String password, String deviceId) async {
    try {
      final response = await _dio.post(
        ApiConstants.register,
        data: {
          'username': username,
          'password': password,
          'deviceId': deviceId,
        },
      );

      final registerResponse = RegisterResponse.fromJson(response.data);
      
      // Extract session from cookies if available
      final cookies = response.headers['set-cookie'];
      if (cookies != null) {
        for (final cookie in cookies) {
          if (cookie.startsWith('connect.sid=')) {
            final sessionId = cookie.split('=')[1].split(';')[0];
            await setSessionId(sessionId);
            break;
          }
        }
      }

      return registerResponse;
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  Future<void> logout() async {
    try {
      await _dio.post(
        ApiConstants.logout,
        options: _defaultOptions,
      );
    } finally {
      await setSessionId(null);
    }
  }

  Future<User> getCurrentUser() async {
    try {
      final response = await _dio.get(
        ApiConstants.authUser,
        options: _defaultOptions,
      );

      return User.fromJson(response.data['user']);
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  Future<DeviceCheckResponse> checkDevice(String deviceId) async {
    try {
      final response = await _dio.post(
        ApiConstants.checkDevice,
        data: {'deviceId': deviceId},
      );

      return DeviceCheckResponse.fromJson(response.data);
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  // Video generation endpoints
  Future<VideoGeneration> generateVideo({
    required String prompt,
    required AspectRatio aspectRatio,
    required VideoModel model,
    String? imageUrl,
    String? watermark,
    bool hdGeneration = false,
  }) async {
    try {
      final data = {
        'prompt': prompt,
        'aspectRatio': _aspectRatioToString(aspectRatio),
        'model': _videoModelToString(model),
        'hdGeneration': hdGeneration,
      };

      if (imageUrl != null) {
        data['imageUrl'] = imageUrl;
      }
      if (watermark != null) {
        data['watermark'] = watermark;
      }

      final response = await _dio.post(
        ApiConstants.generateVideo,
        data: data,
        options: _defaultOptions,
      );

      return VideoGeneration.fromJson(response.data);
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  Future<VideoGeneration> checkVideoGeneration(String generationId) async {
    try {
      final response = await _dio.post(
        ApiConstants.checkGeneration,
        data: {'generationId': generationId},
        options: _defaultOptions,
      );

      return VideoGeneration.fromJson(response.data);
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  Future<List<VideoGeneration>> getVideoGenerations() async {
    try {
      final response = await _dio.get(
        ApiConstants.generations,
        options: _defaultOptions,
      );

      return (response.data as List)
          .map((item) => VideoGeneration.fromJson(item))
          .toList();
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  Future<ModelStatusResponse> getModelStatus(String model) async {
    try {
      final response = await _dio.get(
        '${ApiConstants.modelStatus}/$model',
        options: _defaultOptions,
      );

      return ModelStatusResponse.fromJson(response.data);
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  // Photo AI endpoints
  Future<PhotoAIGeneration> generatePhotAI({
    required PhotoAIToolType toolType,
    required String fileName,
    required String inputImageUrl,
    String? prompt,
    String? maskImageBase64,
    String? backgroundPrompt,
    ExtendDirection? extendDirection,
    UpscaleMethod? upscaleMethod,
  }) async {
    try {
      final data = {
        'toolType': _photoAIToolTypeToString(toolType),
        'fileName': fileName,
        'inputImageUrl': inputImageUrl,
      };

      if (prompt != null) data['prompt'] = prompt;
      if (maskImageBase64 != null) data['maskImageBase64'] = maskImageBase64;
      if (backgroundPrompt != null) data['backgroundPrompt'] = backgroundPrompt;
      if (extendDirection != null) data['extendDirection'] = _extendDirectionToString(extendDirection);
      if (upscaleMethod != null) data['upscaleMethod'] = _upscaleMethodToString(upscaleMethod);

      final response = await _dio.post(
        ApiConstants.photaiGenerate,
        data: data,
        options: _defaultOptions,
      );

      return PhotoAIGeneration.fromJson(response.data);
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  Future<List<PhotoAIGeneration>> getPhotAIGenerations() async {
    try {
      final response = await _dio.get(
        ApiConstants.photaiGenerations,
        options: _defaultOptions,
      );

      return (response.data as List)
          .map((item) => PhotoAIGeneration.fromJson(item))
          .toList();
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  // Credits endpoint
  Future<CreditsResponse> getCredits() async {
    try {
      final response = await _dio.get(
        ApiConstants.credits,
        options: _defaultOptions,
      );

      return CreditsResponse.fromJson(response.data);
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  // File upload
  Future<String> uploadImage(String filePath) async {
    try {
      final formData = FormData.fromMap({
        'image': await MultipartFile.fromFile(filePath),
      });

      final response = await _dio.post(
        ApiConstants.uploadImage,
        data: formData,
        options: _defaultOptions,
      );

      return response.data['imageUrl'] as String;
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  // Helper methods for enum conversion
  String _aspectRatioToString(AspectRatio ratio) {
    switch (ratio) {
      case AspectRatio.landscape:
        return '16:9';
      case AspectRatio.portrait:
        return '9:16';
      case AspectRatio.square:
        return '1:1';
    }
  }

  String _videoModelToString(VideoModel model) {
    switch (model) {
      case VideoModel.veo3:
        return 'veo3';
      case VideoModel.veo3Fast:
        return 'veo3_fast';
    }
  }

  String _photoAIToolTypeToString(PhotoAIToolType toolType) {
    switch (toolType) {
      case PhotoAIToolType.backgroundRemover:
        return 'background-remover';
      case PhotoAIToolType.backgroundReplacer:
        return 'background-replacer';
      case PhotoAIToolType.imageExtender:
        return 'image-extender';
      case PhotoAIToolType.objectRemover:
        return 'object-remover';
      case PhotoAIToolType.objectReplacer:
        return 'object-replacer';
      case PhotoAIToolType.textToArt:
        return 'text-to-art';
      case PhotoAIToolType.textToArtImage:
        return 'text-to-art-image';
      case PhotoAIToolType.upscaler:
        return 'upscaler';
      case PhotoAIToolType.aiPhotoEnhancer:
        return 'ai-photo-enhancer';
      case PhotoAIToolType.aiLightFix:
        return 'ai-light-fix';
      case PhotoAIToolType.oldPhotoRestoration:
        return 'old-photo-restoration';
      case PhotoAIToolType.colorRestoration:
        return 'color-restoration';
      case PhotoAIToolType.aiPhotoColoriser:
        return 'ai-photo-coloriser';
      case PhotoAIToolType.aiPatternGenerator:
        return 'ai-pattern-generator';
    }
  }

  String _extendDirectionToString(ExtendDirection direction) {
    switch (direction) {
      case ExtendDirection.up:
        return 'up';
      case ExtendDirection.down:
        return 'down';
      case ExtendDirection.left:
        return 'left';
      case ExtendDirection.right:
        return 'right';
      case ExtendDirection.all:
        return 'all';
    }
  }

  String _upscaleMethodToString(UpscaleMethod method) {
    switch (method) {
      case UpscaleMethod.x2:
        return 'x2';
      case UpscaleMethod.x4:
        return 'x4';
      case UpscaleMethod.x8:
        return 'x8';
    }
  }

  Exception _handleDioError(DioException e) {
    if (e.response != null) {
      final statusCode = e.response!.statusCode;
      final data = e.response!.data;
      
      String message = 'Đã xảy ra lỗi';
      if (data is Map<String, dynamic> && data['message'] != null) {
        message = data['message'];
      } else if (data is Map<String, dynamic> && data['error'] != null) {
        message = data['error'];
      }

      switch (statusCode) {
        case 400:
          return Exception('Yêu cầu không hợp lệ: $message');
        case 401:
          return Exception('Chưa đăng nhập hoặc phiên đã hết hạn');
        case 403:
          return Exception('Không có quyền truy cập');
        case 404:
          return Exception('Không tìm thấy tài nguyên');
        case 429:
          return Exception('Quá nhiều yêu cầu, vui lòng thử lại sau');
        case 500:
          return Exception('Lỗi máy chủ nội bộ');
        default:
          return Exception('Lỗi: $message');
      }
    } else if (e.type == DioExceptionType.connectionTimeout) {
      return Exception('Hết thời gian kết nối');
    } else if (e.type == DioExceptionType.receiveTimeout) {
      return Exception('Hết thời gian nhận dữ liệu');
    } else if (e.type == DioExceptionType.connectionError) {
      return Exception('Lỗi kết nối mạng');
    } else {
      return Exception('Lỗi không xác định: ${e.message}');
    }
  }
}