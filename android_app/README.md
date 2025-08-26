# STLixAI Android App

Ứng dụng Android cho nền tảng tạo video AI STLix.

## Tính năng chính

- 🎥 **Tạo video AI**: Tạo video từ văn bản và hình ảnh
- 🖼️ **Công cụ PhotoAI**: Xử lý ảnh với AI (xóa phông, thay đổi background, nâng cấp chất lượng, v.v.)
- 👤 **Xác thực người dùng**: Đăng ký/đăng nhập bảo mật với device fingerprinting
- ⚙️ **Quản trị hệ thống**: Panel admin cho việc quản lý API keys và thống kê
- 💳 **Hệ thống Credits**: Theo dõi và quản lý credits sử dụng

## Yêu cầu hệ thống

- Android 5.0+ (API level 21+)
- Kết nối internet
- Ít nhất 2GB RAM
- 100MB dung lượng trống

## Cài đặt

### Từ GitHub Releases
1. Truy cập [Releases](../../releases)
2. Tải file APK mới nhất
3. Bật "Cài đặt từ nguồn không xác định" trên thiết bị Android
4. Cài đặt APK

### Build từ source code

#### Yêu cầu
- Flutter SDK 3.16.5+
- Dart SDK 3.2.0+
- Android Studio hoặc VS Code
- JDK 17+

#### Các bước build

1. Clone repository:
```bash
git clone <repository-url>
cd <repository-name>/android_app
```

2. Cài đặt dependencies:
```bash
flutter pub get
```

3. Generate code:
```bash
flutter packages pub run build_runner build
```

4. Build APK:
```bash
# Debug APK
flutter build apk --debug

# Release APK
flutter build apk --release

# App Bundle (để upload lên Play Store)
flutter build appbundle --release
```

## Cấu hình

### API Configuration
Cập nhật `baseUrl` trong `lib/core/constants/api_constants.dart`:

```dart
static const String baseUrl = 'https://your-stlix-backend.replit.app';
```

### Firebase (tùy chọn)
Nếu muốn sử dụng Firebase Analytics hoặc Crashlytics:

1. Tạo project Firebase
2. Tải file `google-services.json` 
3. Đặt vào `android/app/`
4. Thêm dependencies Firebase vào `pubspec.yaml`

## Kiến trúc ứng dụng

```
lib/
├── core/                 # Core utilities, themes, constants
│   ├── constants/        # API constants, app constants
│   ├── router/          # Navigation routing
│   ├── services/        # API services
│   └── theme/           # App theming
├── features/            # Feature modules
│   ├── auth/            # Authentication
│   ├── video/           # Video generation
│   ├── photai/          # PhotoAI tools
│   ├── admin/           # Admin panel
│   └── common/          # Shared UI components
├── models/              # Data models
└── main.dart           # App entry point
```

## State Management
Sử dụng Riverpod cho state management:
- `StateNotifier` cho complex state
- `Provider` cho dependency injection
- `Consumer` widgets cho UI updates

## API Integration
- Sử dụng Dio cho HTTP requests
- Automatic session management
- Error handling và retry logic
- Request/response interceptors

## Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Mở Pull Request

## Giấy phép

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## Hỗ trợ

- Tạo issue trên GitHub cho bug reports
- Kiểm tra documentation trước khi tạo issue
- Cung cấp thông tin chi tiết về device và version khi report bug
