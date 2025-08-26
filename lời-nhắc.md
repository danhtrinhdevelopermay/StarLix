# Lời Nhắc - Tình Trạng Dự Án STLix Android

## 📋 Tổng Quan Dự Án
- **Tên dự án**: STLix Android App
- **Công nghệ**: Flutter 3.16.5+ 
- **Ngôn ngữ**: Dart, Kotlin (Android native)
- **Backend**: Express.js API (đã có sẵn)
- **Thư mục chính**: `android_app/` - chứa toàn bộ Flutter code

## 🎯 Tính Năng Đã Hoàn Thành
✅ **Hoàn tất 100%**:
- Hệ thống đăng nhập/đăng ký với device fingerprinting
- Tạo video AI từ text và image (2 tabs)
- Công cụ PhotoAI (8+ tools: xóa phông, thay background, upscale, etc.)
- Admin panel với quản lý API keys, thống kê
- Navigation routing với GoRouter
- State management với Riverpod
- UI/UX hoàn chỉnh với Material Design 3
- API integration với backend hiện tại

## ⚠️ Vấn Đề Hiện Tại & Giải Pháp

### 1. **GitHub Actions Workflow**
**Vấn đề**: Không thể push file `.github/workflows/build-android.yml` từ shell vì thiếu quyền `workflow` scope trong GitHub token.

**Trạng thái**: File workflow đã bị xóa khỏi repository local.

**Giải pháp**: 
- Phải tạo workflow **thủ công trên GitHub web interface**
- Vào GitHub repo → Actions → New workflow → set up a workflow yourself
- Copy code workflow đã chuẩn bị (xem mục "Code Workflow" bên dưới)

### 2. **GitHub Token**
**Token hiện tại**: `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`
**Quyền**: Chỉ có `repo`, thiếu `workflow` scope
**Secret name trên GitHub**: `PERSONAL_ACCESS_TOKEN` (không được dùng tên bắt đầu với `GITHUB_`)

### 3. **API URL Configuration**
**Cần sửa**: File `android_app/lib/core/constants/api_constants.dart`
```dart
static const String baseUrl = 'https://your-domain.replit.app'; // Cần thay thế URL thật
```

## 🔧 Code Workflow GitHub Actions (Đã Cập Nhật v4)

```yaml
name: Build Android APK

on:
  push:
    branches: [ main, develop ]
    paths:
      - 'android_app/**'
  pull_request:
    branches: [ main ]
    paths:
      - 'android_app/**'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Repository
      uses: actions/checkout@v4

    - name: Setup Java
      uses: actions/setup-java@v4
      with:
        distribution: 'zulu'
        java-version: '17'

    - name: Setup Flutter
      uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.16.5'
        channel: 'stable'

    - name: Get Flutter Dependencies
      working-directory: android_app
      run: flutter pub get

    - name: Generate Code
      working-directory: android_app
      run: flutter packages pub run build_runner build --delete-conflicting-outputs

    - name: Analyze Flutter Code
      working-directory: android_app
      run: flutter analyze

    - name: Build APK (Debug)
      working-directory: android_app
      run: flutter build apk --debug

    - name: Build APK (Release)
      working-directory: android_app
      run: flutter build apk --release

    - name: Upload Debug APK
      uses: actions/upload-artifact@v4
      with:
        name: stlix-debug-apk
        path: android_app/build/app/outputs/flutter-apk/app-debug.apk

    - name: Upload Release APK
      uses: actions/upload-artifact@v4
      with:
        name: stlix-release-apk
        path: android_app/build/app/outputs/flutter-apk/app-release.apk
```

## 📂 Cấu Trúc Dự Án

```
android_app/
├── lib/
│   ├── core/
│   │   ├── constants/api_constants.dart   # ⚠️ Cần sửa baseUrl
│   │   ├── router/app_router.dart         # Navigation routing
│   │   ├── services/api_service.dart      # API integration
│   │   └── theme/app_theme.dart           # UI theming
│   ├── features/
│   │   ├── auth/                          # Login/Register
│   │   ├── video/                         # Video generation
│   │   ├── photai/                        # PhotoAI tools
│   │   ├── admin/                         # Admin panel
│   │   ├── home/                          # Home screen
│   │   └── common/                        # Shared components
│   ├── models/                            # Data models
│   └── main.dart                          # Entry point
├── android/                               # Android native config
├── pubspec.yaml                           # Dependencies
└── README.md                              # Documentation
```

## 🚀 Các Bước Tiếp Theo

### Để Hoàn Tất Deployment:

1. **Tạo GitHub Workflow** (thủ công trên web)
   - Copy code workflow từ mục trên
   - Đặt tên file: `build-android.yml`

2. **Cập nhật API URL**
   ```dart
   // Trong android_app/lib/core/constants/api_constants.dart
   static const String baseUrl = 'https://your-actual-domain.replit.app';
   ```

3. **Test Local Build**
   ```bash
   cd android_app
   flutter pub get
   flutter build apk --release
   ```

4. **Push Code lên GitHub**
   ```bash
   git add .
   git commit -m "STLix Android app ready for deployment"
   git push origin main
   ```

## 🔍 Commands Cần Thiết

### Flutter Development:
```bash
cd android_app
flutter pub get                    # Install dependencies
flutter packages pub run build_runner build # Generate code
flutter analyze                    # Code analysis
flutter build apk --debug         # Build debug APK
flutter build apk --release       # Build release APK
```

### Git Commands:
```bash
git add .
git commit -m "message"
git push origin main
```

## 📱 Tính Năng App

1. **Authentication**: Login/Register với device fingerprinting
2. **Video Generation**: Text-to-video và Image-to-video
3. **PhotoAI Tools**: 8+ công cụ xử lý ảnh AI
4. **Admin Panel**: Quản lý system cho admin users
5. **Credits System**: Theo dõi usage và credits
6. **Responsive UI**: Material Design 3, support dark/light mode

## 🐛 Lưu Ý Debug

- Nếu gặp lỗi "workflow scope": Phải tạo workflow trên GitHub web
- Nếu artifact upload lỗi: Đảm bảo dùng `@v4` không phải `@v3`
- Nếu build lỗi: Kiểm tra Flutter version (cần 3.16.5+)
- Nếu API lỗi: Kiểm tra baseUrl trong `api_constants.dart`

## 📅 Ngày Cập Nhật: 25/08/2025

---
**Ghi chú**: File này giúp AI agents khác hiểu được tình trạng hiện tại và tiếp tục công việc một cách chính xác.