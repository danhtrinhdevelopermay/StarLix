class ApiConstants {
  static const String baseUrl = 'https://your-domain.replit.app';
  
  // Auth endpoints
  static const String login = '/api/login';
  static const String register = '/api/register';
  static const String logout = '/api/logout';
  static const String authUser = '/api/auth/user';
  static const String checkDevice = '/api/check-device';
  
  // Video generation endpoints
  static const String generateVideo = '/api/generate';
  static const String checkGeneration = '/api/check-generation';
  static const String generations = '/api/generations';
  static const String modelStatus = '/api/model-status';
  
  // Photo AI endpoints
  static const String photaiGenerate = '/api/photai/generate';
  static const String photaiGenerations = '/api/photai/generations';
  static const String photaiCheckGeneration = '/api/photai/check-generation';
  
  // Credits endpoints
  static const String credits = '/api/credits';
  
  // Upload endpoints
  static const String uploadImage = '/api/upload';
  
  // Admin endpoints
  static const String adminSettings = '/api/admin/settings';
  static const String adminApiKeys = '/api/admin/api-keys';
  static const String adminApiKeysSummary = '/api/admin/api-keys-summary';
  static const String adminExternalApiKeys = '/api/admin/external-api-keys';
  static const String adminPhotaiApiKeys = '/api/admin/photai-api-keys';
}