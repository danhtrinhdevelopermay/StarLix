import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart';

@JsonSerializable()
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

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);

  User copyWith({
    String? id,
    String? username,
    bool? isAdmin,
    String? deviceId,
    DateTime? createdAt,
  }) {
    return User(
      id: id ?? this.id,
      username: username ?? this.username,
      isAdmin: isAdmin ?? this.isAdmin,
      deviceId: deviceId ?? this.deviceId,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is User &&
          runtimeType == other.runtimeType &&
          id == other.id &&
          username == other.username &&
          isAdmin == other.isAdmin &&
          deviceId == other.deviceId;

  @override
  int get hashCode =>
      id.hashCode ^
      username.hashCode ^
      isAdmin.hashCode ^
      deviceId.hashCode;

  @override
  String toString() {
    return 'User{id: $id, username: $username, isAdmin: $isAdmin, deviceId: $deviceId, createdAt: $createdAt}';
  }
}