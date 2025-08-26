import 'package:json_annotation/json_annotation.dart';

part 'video_generation.g.dart';

enum VideoGenerationStatus {
  @JsonValue('pending')
  pending,
  @JsonValue('processing')
  processing,
  @JsonValue('completed')
  completed,
  @JsonValue('failed')
  failed,
}

enum AspectRatio {
  @JsonValue('16:9')
  landscape,
  @JsonValue('9:16')
  portrait,
  @JsonValue('1:1')
  square,
}

enum VideoModel {
  @JsonValue('veo3')
  veo3,
  @JsonValue('veo3_fast')
  veo3Fast,
}

@JsonSerializable()
class VideoGeneration {
  final String id;
  final String userId;
  final String prompt;
  final AspectRatio aspectRatio;
  final VideoModel model;
  final VideoGenerationStatus status;
  final String? taskId;
  final String? videoUrl;
  final String? thumbnailUrl;
  final String? imageUrl; // For image-to-video
  final String? watermark;
  final bool hdGeneration;
  final int creditsUsed;
  final String? errorMessage;
  final DateTime createdAt;
  final DateTime? completedAt;

  const VideoGeneration({
    required this.id,
    required this.userId,
    required this.prompt,
    required this.aspectRatio,
    required this.model,
    required this.status,
    this.taskId,
    this.videoUrl,
    this.thumbnailUrl,
    this.imageUrl,
    this.watermark,
    required this.hdGeneration,
    required this.creditsUsed,
    this.errorMessage,
    required this.createdAt,
    this.completedAt,
  });

  factory VideoGeneration.fromJson(Map<String, dynamic> json) =>
      _$VideoGenerationFromJson(json);
  Map<String, dynamic> toJson() => _$VideoGenerationToJson(this);

  VideoGeneration copyWith({
    String? id,
    String? userId,
    String? prompt,
    AspectRatio? aspectRatio,
    VideoModel? model,
    VideoGenerationStatus? status,
    String? taskId,
    String? videoUrl,
    String? thumbnailUrl,
    String? imageUrl,
    String? watermark,
    bool? hdGeneration,
    int? creditsUsed,
    String? errorMessage,
    DateTime? createdAt,
    DateTime? completedAt,
  }) {
    return VideoGeneration(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      prompt: prompt ?? this.prompt,
      aspectRatio: aspectRatio ?? this.aspectRatio,
      model: model ?? this.model,
      status: status ?? this.status,
      taskId: taskId ?? this.taskId,
      videoUrl: videoUrl ?? this.videoUrl,
      thumbnailUrl: thumbnailUrl ?? this.thumbnailUrl,
      imageUrl: imageUrl ?? this.imageUrl,
      watermark: watermark ?? this.watermark,
      hdGeneration: hdGeneration ?? this.hdGeneration,
      creditsUsed: creditsUsed ?? this.creditsUsed,
      errorMessage: errorMessage ?? this.errorMessage,
      createdAt: createdAt ?? this.createdAt,
      completedAt: completedAt ?? this.completedAt,
    );
  }

  bool get isCompleted => status == VideoGenerationStatus.completed;
  bool get isFailed => status == VideoGenerationStatus.failed;
  bool get isProcessing => status == VideoGenerationStatus.processing;
  bool get isPending => status == VideoGenerationStatus.pending;

  @override
  String toString() {
    return 'VideoGeneration{id: $id, prompt: $prompt, status: $status, model: $model}';
  }
}