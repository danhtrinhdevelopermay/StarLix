import 'package:json_annotation/json_annotation.dart';

part 'photai_generation.g.dart';

enum PhotoAIToolType {
  @JsonValue('background-remover')
  backgroundRemover,
  @JsonValue('background-replacer')
  backgroundReplacer,
  @JsonValue('image-extender')
  imageExtender,
  @JsonValue('object-remover')
  objectRemover,
  @JsonValue('object-replacer')
  objectReplacer,
  @JsonValue('text-to-art')
  textToArt,
  @JsonValue('text-to-art-image')
  textToArtImage,
  @JsonValue('upscaler')
  upscaler,
  @JsonValue('ai-photo-enhancer')
  aiPhotoEnhancer,
  @JsonValue('ai-light-fix')
  aiLightFix,
  @JsonValue('old-photo-restoration')
  oldPhotoRestoration,
  @JsonValue('color-restoration')
  colorRestoration,
  @JsonValue('ai-photo-coloriser')
  aiPhotoColoriser,
  @JsonValue('ai-pattern-generator')
  aiPatternGenerator,
}

enum PhotoAIGenerationStatus {
  @JsonValue('pending')
  pending,
  @JsonValue('processing')
  processing,
  @JsonValue('completed')
  completed,
  @JsonValue('failed')
  failed,
}

enum ExtendDirection {
  @JsonValue('up')
  up,
  @JsonValue('down')
  down,
  @JsonValue('left')
  left,
  @JsonValue('right')
  right,
  @JsonValue('all')
  all,
}

enum UpscaleMethod {
  @JsonValue('x2')
  x2,
  @JsonValue('x4')
  x4,
  @JsonValue('x8')
  x8,
}

@JsonSerializable()
class PhotoAIGeneration {
  final String id;
  final String userId;
  final PhotoAIToolType toolType;
  final String fileName;
  final String inputImageUrl;
  final PhotoAIGenerationStatus status;
  final String? taskId;
  final String? resultImageUrl;
  final String? prompt;
  final String? maskImageBase64;
  final String? backgroundPrompt;
  final ExtendDirection? extendDirection;
  final UpscaleMethod? upscaleMethod;
  final int creditsUsed;
  final String? errorMessage;
  final DateTime createdAt;
  final DateTime? completedAt;

  const PhotoAIGeneration({
    required this.id,
    required this.userId,
    required this.toolType,
    required this.fileName,
    required this.inputImageUrl,
    required this.status,
    this.taskId,
    this.resultImageUrl,
    this.prompt,
    this.maskImageBase64,
    this.backgroundPrompt,
    this.extendDirection,
    this.upscaleMethod,
    required this.creditsUsed,
    this.errorMessage,
    required this.createdAt,
    this.completedAt,
  });

  factory PhotoAIGeneration.fromJson(Map<String, dynamic> json) =>
      _$PhotoAIGenerationFromJson(json);
  Map<String, dynamic> toJson() => _$PhotoAIGenerationToJson(this);

  PhotoAIGeneration copyWith({
    String? id,
    String? userId,
    PhotoAIToolType? toolType,
    String? fileName,
    String? inputImageUrl,
    PhotoAIGenerationStatus? status,
    String? taskId,
    String? resultImageUrl,
    String? prompt,
    String? maskImageBase64,
    String? backgroundPrompt,
    ExtendDirection? extendDirection,
    UpscaleMethod? upscaleMethod,
    int? creditsUsed,
    String? errorMessage,
    DateTime? createdAt,
    DateTime? completedAt,
  }) {
    return PhotoAIGeneration(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      toolType: toolType ?? this.toolType,
      fileName: fileName ?? this.fileName,
      inputImageUrl: inputImageUrl ?? this.inputImageUrl,
      status: status ?? this.status,
      taskId: taskId ?? this.taskId,
      resultImageUrl: resultImageUrl ?? this.resultImageUrl,
      prompt: prompt ?? this.prompt,
      maskImageBase64: maskImageBase64 ?? this.maskImageBase64,
      backgroundPrompt: backgroundPrompt ?? this.backgroundPrompt,
      extendDirection: extendDirection ?? this.extendDirection,
      upscaleMethod: upscaleMethod ?? this.upscaleMethod,
      creditsUsed: creditsUsed ?? this.creditsUsed,
      errorMessage: errorMessage ?? this.errorMessage,
      createdAt: createdAt ?? this.createdAt,
      completedAt: completedAt ?? this.completedAt,
    );
  }

  bool get isCompleted => status == PhotoAIGenerationStatus.completed;
  bool get isFailed => status == PhotoAIGenerationStatus.failed;
  bool get isProcessing => status == PhotoAIGenerationStatus.processing;
  bool get isPending => status == PhotoAIGenerationStatus.pending;

  @override
  String toString() {
    return 'PhotoAIGeneration{id: $id, toolType: $toolType, status: $status, fileName: $fileName}';
  }
}