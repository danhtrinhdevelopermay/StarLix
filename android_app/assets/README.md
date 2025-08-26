# Assets Directory

Thư mục này chứa các tài nguyên tĩnh cho ứng dụng Flutter.

## Cấu trúc thư mục

```
assets/
├── images/          # Hình ảnh, logo, icons
├── icons/           # Icons tùy chỉnh
└── fonts/           # Font files (nếu cần)
```

## Sử dụng assets

Để sử dụng assets trong code, import và sử dụng như sau:

```dart
// Hình ảnh
Image.asset('assets/images/logo.png')

// Icon SVG
SvgPicture.asset('assets/icons/custom_icon.svg')
```

## Lưu ý

- Tất cả assets phải được khai báo trong `pubspec.yaml`
- Sử dụng format phù hợp (PNG cho hình ảnh, SVG cho icons)
- Optimize kích thước file để giảm dung lượng app