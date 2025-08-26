import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

import '../../../models/video_generation.dart';
import '../../../core/services/api_service.dart';
import '../../auth/providers/auth_provider.dart';

class VideoGeneratorScreen extends ConsumerStatefulWidget {
  const VideoGeneratorScreen({super.key});

  @override
  ConsumerState<VideoGeneratorScreen> createState() => _VideoGeneratorScreenState();
}

class _VideoGeneratorScreenState extends ConsumerState<VideoGeneratorScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final _textFormKey = GlobalKey<FormState>();
  final _imageFormKey = GlobalKey<FormState>();
  
  // Text-to-video form
  final _promptController = TextEditingController();
  final _watermarkController = TextEditingController();
  AspectRatio _selectedAspectRatio = AspectRatio.landscape;
  VideoModel _selectedModel = VideoModel.veo3Fast;
  bool _hdGeneration = false;
  
  // Image-to-video form
  final _motionPromptController = TextEditingController();
  File? _selectedImage;
  String? _uploadedImageUrl;
  AspectRatio _imageAspectRatio = AspectRatio.landscape;
  VideoModel _imageModel = VideoModel.veo3Fast;
  
  bool _isGenerating = false;
  List<VideoGeneration> _generations = [];
  
  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _loadGenerations();
  }

  @override
  void dispose() {
    _tabController.dispose();
    _promptController.dispose();
    _watermarkController.dispose();
    _motionPromptController.dispose();
    super.dispose();
  }

  Future<void> _loadGenerations() async {
    try {
      final apiService = ref.read(apiServiceProvider);
      final generations = await apiService.getVideoGenerations();
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

  Future<void> _generateTextToVideo() async {
    if (!_textFormKey.currentState!.validate()) return;
    
    setState(() {
      _isGenerating = true;
    });
    
    try {
      final apiService = ref.read(apiServiceProvider);
      final generation = await apiService.generateVideo(
        prompt: _promptController.text,
        aspectRatio: _selectedAspectRatio,
        model: _selectedModel,
        watermark: _watermarkController.text.isEmpty ? null : _watermarkController.text,
        hdGeneration: _hdGeneration,
      );
      
      setState(() {
        _generations.insert(0, generation);
      });
      
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Đã bắt đầu tạo video!'),
            backgroundColor: Colors.green,
          ),
        );
      }
      
      // Clear form
      _promptController.clear();
      _watermarkController.clear();
      
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Lỗi tạo video: ${e.toString()}'),
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

  Future<void> _generateImageToVideo() async {
    if (!_imageFormKey.currentState!.validate() || _uploadedImageUrl == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Vui lòng chọn ảnh và nhập mô tả chuyển động'),
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
      final generation = await apiService.generateVideo(
        prompt: _motionPromptController.text,
        aspectRatio: _imageAspectRatio,
        model: _imageModel,
        imageUrl: _uploadedImageUrl,
      );
      
      setState(() {
        _generations.insert(0, generation);
      });
      
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Đã bắt đầu tạo video từ ảnh!'),
            backgroundColor: Colors.green,
          ),
        );
      }
      
      // Clear form
      _motionPromptController.clear();
      setState(() {
        _selectedImage = null;
        _uploadedImageUrl = null;
      });
      
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Lỗi tạo video: ${e.toString()}'),
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
        title: const Text('Tạo Video AI'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(icon: Icon(Icons.text_fields), text: 'Văn bản → Video'),
            Tab(icon: Icon(Icons.image), text: 'Ảnh → Video'),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildTextToVideoTab(),
                _buildImageToVideoTab(),
              ],
            ),
          ),
          if (_generations.isNotEmpty) ...[
            const Divider(),
            Container(
              height: 200,
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Video đã tạo',
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

  Widget _buildTextToVideoTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Form(
        key: _textFormKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Prompt field
            TextFormField(
              controller: _promptController,
              decoration: const InputDecoration(
                labelText: 'Mô tả video',
                hintText: 'Nhập mô tả chi tiết về video bạn muốn tạo...',
                border: OutlineInputBorder(),
              ),
              maxLines: 4,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Vui lòng nhập mô tả video';
                }
                if (value.length < 10) {
                  return 'Mô tả phải có ít nhất 10 ký tự';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            
            // Aspect ratio selection
            Text(
              'Tỷ lệ khung hình',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              children: AspectRatio.values.map((ratio) {
                return ChoiceChip(
                  label: Text(_getAspectRatioLabel(ratio)),
                  selected: _selectedAspectRatio == ratio,
                  onSelected: (selected) {
                    if (selected) {
                      setState(() {
                        _selectedAspectRatio = ratio;
                      });
                    }
                  },
                );
              }).toList(),
            ),
            const SizedBox(height: 16),
            
            // Model selection
            Text(
              'Chất lượng video',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              children: VideoModel.values.map((model) {
                return ChoiceChip(
                  label: Text(_getModelLabel(model)),
                  selected: _selectedModel == model,
                  onSelected: (selected) {
                    if (selected) {
                      setState(() {
                        _selectedModel = model;
                      });
                    }
                  },
                );
              }).toList(),
            ),
            const SizedBox(height: 16),
            
            // Watermark field
            TextFormField(
              controller: _watermarkController,
              decoration: const InputDecoration(
                labelText: 'Watermark (tùy chọn)',
                hintText: 'Nhập text watermark...',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            
            // HD Generation toggle
            SwitchListTile(
              title: const Text('Tạo video HD'),
              subtitle: const Text('Chất lượng cao hơn nhưng tốn nhiều credits'),
              value: _hdGeneration,
              onChanged: (value) {
                setState(() {
                  _hdGeneration = value;
                });
              },
            ),
            const SizedBox(height: 24),
            
            // Generate button
            ElevatedButton(
              onPressed: _isGenerating ? null : _generateTextToVideo,
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
                        Text('Đang tạo...'),
                      ],
                    )
                  : const Text('Tạo Video'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildImageToVideoTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Form(
        key: _imageFormKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Image picker
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
                            Text('Chọn ảnh để tạo video'),
                          ],
                        ),
                      ),
              ),
            ),
            const SizedBox(height: 16),
            
            // Motion prompt field
            TextFormField(
              controller: _motionPromptController,
              decoration: const InputDecoration(
                labelText: 'Mô tả chuyển động',
                hintText: 'Mô tả cách bạn muốn ảnh chuyển động...',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Vui lòng nhập mô tả chuyển động';
                }
                if (value.length < 10) {
                  return 'Mô tả phải có ít nhất 10 ký tự';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            
            // Aspect ratio selection for image
            Text(
              'Tỷ lệ khung hình',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              children: AspectRatio.values.map((ratio) {
                return ChoiceChip(
                  label: Text(_getAspectRatioLabel(ratio)),
                  selected: _imageAspectRatio == ratio,
                  onSelected: (selected) {
                    if (selected) {
                      setState(() {
                        _imageAspectRatio = ratio;
                      });
                    }
                  },
                );
              }).toList(),
            ),
            const SizedBox(height: 16),
            
            // Model selection for image
            Text(
              'Chất lượng video',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              children: VideoModel.values.map((model) {
                return ChoiceChip(
                  label: Text(_getModelLabel(model)),
                  selected: _imageModel == model,
                  onSelected: (selected) {
                    if (selected) {
                      setState(() {
                        _imageModel = model;
                      });
                    }
                  },
                );
              }).toList(),
            ),
            const SizedBox(height: 24),
            
            // Generate button
            ElevatedButton(
              onPressed: _isGenerating ? null : _generateImageToVideo,
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
                        Text('Đang tạo...'),
                      ],
                    )
                  : const Text('Tạo Video từ Ảnh'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildGenerationCard(VideoGeneration generation) {
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
                height: 80,
                decoration: BoxDecoration(
                  color: Colors.grey[300],
                  borderRadius: BorderRadius.circular(4),
                ),
                child: generation.thumbnailUrl != null
                    ? ClipRRect(
                        borderRadius: BorderRadius.circular(4),
                        child: Image.network(
                          generation.thumbnailUrl!,
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
                generation.prompt,
                style: const TextStyle(fontSize: 12),
                maxLines: 2,
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

  String _getAspectRatioLabel(AspectRatio ratio) {
    switch (ratio) {
      case AspectRatio.landscape:
        return '16:9 (Ngang)';
      case AspectRatio.portrait:
        return '9:16 (Dọc)';
      case AspectRatio.square:
        return '1:1 (Vuông)';
    }
  }

  String _getModelLabel(VideoModel model) {
    switch (model) {
      case VideoModel.veo3:
        return 'STLix Cao cấp';
      case VideoModel.veo3Fast:
        return 'STLix Nhanh';
    }
  }

  IconData _getStatusIcon(VideoGenerationStatus status) {
    switch (status) {
      case VideoGenerationStatus.pending:
        return Icons.hourglass_empty;
      case VideoGenerationStatus.processing:
        return Icons.autorenew;
      case VideoGenerationStatus.completed:
        return Icons.check_circle;
      case VideoGenerationStatus.failed:
        return Icons.error;
    }
  }

  Color _getStatusColor(VideoGenerationStatus status) {
    switch (status) {
      case VideoGenerationStatus.pending:
        return Colors.orange;
      case VideoGenerationStatus.processing:
        return Colors.blue;
      case VideoGenerationStatus.completed:
        return Colors.green;
      case VideoGenerationStatus.failed:
        return Colors.red;
    }
  }

  String _getStatusText(VideoGenerationStatus status) {
    switch (status) {
      case VideoGenerationStatus.pending:
        return 'Đang chờ';
      case VideoGenerationStatus.processing:
        return 'Đang xử lý';
      case VideoGenerationStatus.completed:
        return 'Hoàn thành';
      case VideoGenerationStatus.failed:
        return 'Thất bại';
    }
  }
}