import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

import '../../../models/photai_generation.dart';
import '../../../core/services/api_service.dart';

class PhotoAIToolsScreen extends ConsumerStatefulWidget {
  const PhotoAIToolsScreen({super.key});

  @override
  ConsumerState<PhotoAIToolsScreen> createState() => _PhotoAIToolsScreenState();
}

class _PhotoAIToolsScreenState extends ConsumerState<PhotoAIToolsScreen> {
  final _formKey = GlobalKey<FormState>();
  final _promptController = TextEditingController();
  final _backgroundPromptController = TextEditingController();
  
  PhotoAIToolType? _selectedTool;
  File? _selectedImage;
  String? _uploadedImageUrl;
  ExtendDirection _extendDirection = ExtendDirection.all;
  UpscaleMethod _upscaleMethod = UpscaleMethod.x2;
  
  bool _isGenerating = false;
  List<PhotoAIGeneration> _generations = [];

  final List<PhotoAIToolInfo> _tools = [
    PhotoAIToolInfo(
      type: PhotoAIToolType.backgroundRemover,
      name: 'Xóa Phông',
      description: 'Tự động xóa phông nền khỏi ảnh',
      icon: Icons.layers_clear,
      needsPrompt: false,
      needsBackground: false,
      needsDirection: false,
      needsUpscale: false,
    ),
    PhotoAIToolInfo(
      type: PhotoAIToolType.backgroundReplacer,
      name: 'Thay Phông',
      description: 'Thay đổi phông nền với prompt mô tả',
      icon: Icons.wallpaper,
      needsPrompt: false,
      needsBackground: true,
      needsDirection: false,
      needsUpscale: false,
    ),
    PhotoAIToolInfo(
      type: PhotoAIToolType.imageExtender,
      name: 'Mở Rộng Ảnh',
      description: 'Mở rộng ảnh theo hướng mong muốn',
      icon: Icons.open_in_full,
      needsPrompt: false,
      needsBackground: false,
      needsDirection: true,
      needsUpscale: false,
    ),
    PhotoAIToolInfo(
      type: PhotoAIToolType.objectRemover,
      name: 'Xóa Đối Tượng',
      description: 'Xóa đối tượng khỏi ảnh',
      icon: Icons.auto_fix_high,
      needsPrompt: false,
      needsBackground: false,
      needsDirection: false,
      needsUpscale: false,
    ),
    PhotoAIToolInfo(
      type: PhotoAIToolType.objectReplacer,
      name: 'Thay Thế Đối Tượng',
      description: 'Thay thế đối tượng trong ảnh bằng AI',
      icon: Icons.transform,
      needsPrompt: true,
      needsBackground: false,
      needsDirection: false,
      needsUpscale: false,
    ),
    PhotoAIToolInfo(
      type: PhotoAIToolType.upscaler,
      name: 'Nâng Cấp Độ Phân Giải',
      description: 'Tăng độ phân giải và chất lượng ảnh',
      icon: Icons.high_quality,
      needsPrompt: false,
      needsBackground: false,
      needsDirection: false,
      needsUpscale: true,
    ),
    PhotoAIToolInfo(
      type: PhotoAIToolType.aiPhotoEnhancer,
      name: 'Tăng Cường Ảnh AI',
      description: 'Cải thiện chất lượng ảnh tổng thể',
      icon: Icons.auto_awesome,
      needsPrompt: false,
      needsBackground: false,
      needsDirection: false,
      needsUpscale: false,
    ),
    PhotoAIToolInfo(
      type: PhotoAIToolType.oldPhotoRestoration,
      name: 'Phục Hồi Ảnh Cũ',
      description: 'Khôi phục và làm mới ảnh cũ',
      icon: Icons.restore,
      needsPrompt: false,
      needsBackground: false,
      needsDirection: false,
      needsUpscale: false,
    ),
  ];

  @override
  void initState() {
    super.initState();
    _loadGenerations();
  }

  @override
  void dispose() {
    _promptController.dispose();
    _backgroundPromptController.dispose();
    super.dispose();
  }

  Future<void> _loadGenerations() async {
    try {
      final apiService = ref.read(apiServiceProvider);
      final generations = await apiService.getPhotAIGenerations();
      setState(() {
        _generations = generations;
      });
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Lỗi tải danh sách: ${e.toString()}'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);
    
    if (pickedFile != null) {
      setState(() {
        _selectedImage = File(pickedFile.path);
      });
      
      // Upload image
      try {
        final apiService = ref.read(apiServiceProvider);
        final imageUrl = await apiService.uploadImage(pickedFile.path);
        setState(() {
          _uploadedImageUrl = imageUrl;
        });
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Lỗi tải ảnh: ${e.toString()}'),
              backgroundColor: Colors.red,
            ),
          );
        }
      }
    }
  }

  Future<void> _generatePhoto() async {
    if (_selectedTool == null || _uploadedImageUrl == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Vui lòng chọn công cụ và ảnh'),
          backgroundColor: Colors.orange,
        ),
      );
      return;
    }

    final toolInfo = _tools.firstWhere((tool) => tool.type == _selectedTool);
    
    if (toolInfo.needsPrompt && _promptController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Vui lòng nhập mô tả cho công cụ này'),
          backgroundColor: Colors.orange,
        ),
      );
      return;
    }

    if (toolInfo.needsBackground && _backgroundPromptController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Vui lòng nhập mô tả phông nền'),
          backgroundColor: Colors.orange,
        ),
      );
      return;
    }
    
    setState(() {
      _isGenerating = true;
    });
    
    try {
      final apiService = ref.read(apiServiceProvider);
      final generation = await apiService.generatePhotAI(
        toolType: _selectedTool!,
        fileName: 'photo_${DateTime.now().millisecondsSinceEpoch}.jpg',
        inputImageUrl: _uploadedImageUrl!,
        prompt: toolInfo.needsPrompt ? _promptController.text : null,
        backgroundPrompt: toolInfo.needsBackground ? _backgroundPromptController.text : null,
        extendDirection: toolInfo.needsDirection ? _extendDirection : null,
        upscaleMethod: toolInfo.needsUpscale ? _upscaleMethod : null,
      );
      
      setState(() {
        _generations.insert(0, generation);
      });
      
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Đã bắt đầu xử lý ảnh!'),
            backgroundColor: Colors.green,
          ),
        );
      }
      
      // Clear form
      _promptController.clear();
      _backgroundPromptController.clear();
      setState(() {
        _selectedImage = null;
        _uploadedImageUrl = null;
        _selectedTool = null;
      });
      
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Lỗi xử lý ảnh: ${e.toString()}'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      setState(() {
        _isGenerating = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Công Cụ PhotoAI'),
      ),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // Tool selection
                    Text(
                      'Chọn công cụ AI',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 16),
                    
                    GridView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        crossAxisSpacing: 12,
                        mainAxisSpacing: 12,
                        childAspectRatio: 1.2,
                      ),
                      itemCount: _tools.length,
                      itemBuilder: (context, index) {
                        final tool = _tools[index];
                        final isSelected = _selectedTool == tool.type;
                        
                        return GestureDetector(
                          onTap: () {
                            setState(() {
                              _selectedTool = tool.type;
                            });
                          },
                          child: Container(
                            decoration: BoxDecoration(
                              border: Border.all(
                                color: isSelected 
                                    ? Theme.of(context).colorScheme.primary
                                    : Colors.grey.withOpacity(0.3),
                                width: isSelected ? 2 : 1,
                              ),
                              borderRadius: BorderRadius.circular(12),
                              color: isSelected 
                                  ? Theme.of(context).colorScheme.primary.withOpacity(0.1)
                                  : null,
                            ),
                            padding: const EdgeInsets.all(12),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  tool.icon,
                                  size: 32,
                                  color: isSelected 
                                      ? Theme.of(context).colorScheme.primary
                                      : Colors.grey[600],
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  tool.name,
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 12,
                                    color: isSelected 
                                        ? Theme.of(context).colorScheme.primary
                                        : null,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  tool.description,
                                  style: const TextStyle(fontSize: 10),
                                  textAlign: TextAlign.center,
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                    const SizedBox(height: 24),
                    
                    // Image picker
                    Text(
                      'Chọn ảnh để xử lý',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    
                    GestureDetector(
                      onTap: _pickImage,
                      child: Container(
                        height: 200,
                        decoration: BoxDecoration(
                          border: Border.all(color: Colors.grey),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: _selectedImage != null
                            ? ClipRRect(
                                borderRadius: BorderRadius.circular(8),
                                child: Image.file(
                                  _selectedImage!,
                                  fit: BoxFit.cover,
                                ),
                              )
                            : const Center(
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(Icons.add_photo_alternate, size: 48),
                                    SizedBox(height: 8),
                                    Text('Chọn ảnh để xử lý'),
                                  ],
                                ),
                              ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    
                    // Dynamic form fields based on selected tool
                    if (_selectedTool != null) ...[
                      _buildToolSpecificFields(),
                      const SizedBox(height: 24),
                    ],
                    
                    // Generate button
                    ElevatedButton(
                      onPressed: _isGenerating ? null : _generatePhoto,
                      child: _isGenerating
                          ? const Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                SizedBox(
                                  width: 20,
                                  height: 20,
                                  child: CircularProgressIndicator(strokeWidth: 2),
                                ),
                                SizedBox(width: 8),
                                Text('Đang xử lý...'),
                              ],
                            )
                          : const Text('Bắt Đầu Xử Lý'),
                    ),
                  ],
                ),
              ),
            ),
          ),
          
          // Results section
          if (_generations.isNotEmpty) ...[
            const Divider(),
            Container(
              height: 200,
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Ảnh đã xử lý',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Expanded(
                    child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: _generations.length,
                      itemBuilder: (context, index) {
                        final generation = _generations[index];
                        return _buildGenerationCard(generation);
                      },
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildToolSpecificFields() {
    final toolInfo = _tools.firstWhere((tool) => tool.type == _selectedTool);
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        if (toolInfo.needsPrompt) ...[
          TextFormField(
            controller: _promptController,
            decoration: const InputDecoration(
              labelText: 'Mô tả',
              hintText: 'Nhập mô tả chi tiết...',
              border: OutlineInputBorder(),
            ),
            maxLines: 2,
          ),
          const SizedBox(height: 16),
        ],
        
        if (toolInfo.needsBackground) ...[
          TextFormField(
            controller: _backgroundPromptController,
            decoration: const InputDecoration(
              labelText: 'Mô tả phông nền',
              hintText: 'Mô tả phông nền mới...',
              border: OutlineInputBorder(),
            ),
            maxLines: 2,
          ),
          const SizedBox(height: 16),
        ],
        
        if (toolInfo.needsDirection) ...[
          Text(
            'Hướng mở rộng',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            children: ExtendDirection.values.map((direction) {
              return ChoiceChip(
                label: Text(_getDirectionLabel(direction)),
                selected: _extendDirection == direction,
                onSelected: (selected) {
                  if (selected) {
                    setState(() {
                      _extendDirection = direction;
                    });
                  }
                },
              );
            }).toList(),
          ),
          const SizedBox(height: 16),
        ],
        
        if (toolInfo.needsUpscale) ...[
          Text(
            'Mức độ nâng cấp',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            children: UpscaleMethod.values.map((method) {
              return ChoiceChip(
                label: Text(_getUpscaleLabel(method)),
                selected: _upscaleMethod == method,
                onSelected: (selected) {
                  if (selected) {
                    setState(() {
                      _upscaleMethod = method;
                    });
                  }
                },
              );
            }).toList(),
          ),
        ],
      ],
    );
  }

  Widget _buildGenerationCard(PhotoAIGeneration generation) {
    return Container(
      width: 150,
      margin: const EdgeInsets.only(right: 12),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(8),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                height: 100,
                decoration: BoxDecoration(
                  color: Colors.grey[300],
                  borderRadius: BorderRadius.circular(4),
                ),
                child: generation.resultImageUrl != null
                    ? ClipRRect(
                        borderRadius: BorderRadius.circular(4),
                        child: Image.network(
                          generation.resultImageUrl!,
                          fit: BoxFit.cover,
                        ),
                      )
                    : Center(
                        child: Icon(
                          _getStatusIcon(generation.status),
                          color: _getStatusColor(generation.status),
                        ),
                      ),
              ),
              const SizedBox(height: 8),
              Text(
                _getToolName(generation.toolType),
                style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 4),
              Text(
                _getStatusText(generation.status),
                style: TextStyle(
                  fontSize: 10,
                  color: _getStatusColor(generation.status),
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _getDirectionLabel(ExtendDirection direction) {
    switch (direction) {
      case ExtendDirection.up:
        return 'Lên';
      case ExtendDirection.down:
        return 'Xuống';
      case ExtendDirection.left:
        return 'Trái';
      case ExtendDirection.right:
        return 'Phải';
      case ExtendDirection.all:
        return 'Tất cả';
    }
  }

  String _getUpscaleLabel(UpscaleMethod method) {
    switch (method) {
      case UpscaleMethod.x2:
        return '2x';
      case UpscaleMethod.x4:
        return '4x';
      case UpscaleMethod.x8:
        return '8x';
    }
  }

  String _getToolName(PhotoAIToolType toolType) {
    final tool = _tools.firstWhere((tool) => tool.type == toolType);
    return tool.name;
  }

  IconData _getStatusIcon(PhotoAIGenerationStatus status) {
    switch (status) {
      case PhotoAIGenerationStatus.pending:
        return Icons.hourglass_empty;
      case PhotoAIGenerationStatus.processing:
        return Icons.autorenew;
      case PhotoAIGenerationStatus.completed:
        return Icons.check_circle;
      case PhotoAIGenerationStatus.failed:
        return Icons.error;
    }
  }

  Color _getStatusColor(PhotoAIGenerationStatus status) {
    switch (status) {
      case PhotoAIGenerationStatus.pending:
        return Colors.orange;
      case PhotoAIGenerationStatus.processing:
        return Colors.blue;
      case PhotoAIGenerationStatus.completed:
        return Colors.green;
      case PhotoAIGenerationStatus.failed:
        return Colors.red;
    }
  }

  String _getStatusText(PhotoAIGenerationStatus status) {
    switch (status) {
      case PhotoAIGenerationStatus.pending:
        return 'Đang chờ';
      case PhotoAIGenerationStatus.processing:
        return 'Đang xử lý';
      case PhotoAIGenerationStatus.completed:
        return 'Hoàn thành';
      case PhotoAIGenerationStatus.failed:
        return 'Thất bại';
    }
  }
}

class PhotoAIToolInfo {
  final PhotoAIToolType type;
  final String name;
  final String description;
  final IconData icon;
  final bool needsPrompt;
  final bool needsBackground;
  final bool needsDirection;
  final bool needsUpscale;

  const PhotoAIToolInfo({
    required this.type,
    required this.name,
    required this.description,
    required this.icon,
    this.needsPrompt = false,
    this.needsBackground = false,
    this.needsDirection = false,
    this.needsUpscale = false,
  });
}