import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Eye, Share2, ArrowLeft, Facebook, Twitter, Copy } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

// Blog content data
const blogContent: Record<string, any> = {
  "huong-dan-tao-video-ai-mien-phi-2024": {
    id: "huong-dan-tao-video-ai-mien-phi-2024",
    title: "Hướng dẫn tạo video AI từ văn bản miễn phí 2025 - Chi tiết từ A đến Z",
    excerpt: "Khám phá cách tạo video AI chuyên nghiệp từ văn bản hoàn toàn miễn phí với công nghệ VEO3 tiên tiến.",
    publishedDate: new Date("2025-01-20"),
    readTime: "8 phút đọc",
    views: "2,347",
    category: "Hướng dẫn",
    tags: ["AI Video", "Text to Video", "Miễn phí", "VEO3"],
    imageUrl: "/blog-images/huong-dan-tao-video-ai.jpg",
    author: {
      name: "Starlix Team",
      avatar: "/team-avatar.jpg"
    },
    content: `
# Tạo video AI từ văn bản - Cách mạng trong sáng tạo nội dung

Trong năm 2025, công nghệ AI đã phát triển vượt bậc với khả năng tạo ra video chất lượng 4K-8K chỉ từ mô tả văn bản. Đây không còn là khoa học viễn tưởng mà đã trở thành hiện thực và hoàn toàn miễn phí với các công cụ như Starlix.

## Tại sao nên sử dụng AI để tạo video?

### 1. Tiết kiệm thời gian và chi phí
- **Không cần quay phim**: Chỉ cần viết mô tả, AI sẽ tạo video cho bạn
- **Không cần diễn viên**: AI có thể tạo ra nhân vật và cảnh quan bất kỳ
- **Không cần thiết bị đắt tiền**: Chỉ cần máy tính và kết nối internet

### 2. Khả năng sáng tạo không giới hạn
- Tạo ra những cảnh quan không tồn tại trong thực tế
- Thể hiện ý tưởng trừu tượng thành hình ảnh cụ thể
- Kết hợp nhiều yếu tố một cách tự nhiên

## Hướng dẫn chi tiết tạo video AI với Starlix

### Bước 1: Truy cập Starlix và đăng ký tài khoản
1. Vào website starlix.onrender.com
2. Nhấn "Đăng ký" để tạo tài khoản miễn phí
3. Xác thực email và đăng nhập

### Bước 2: Viết prompt hiệu quả
**Cấu trúc prompt tốt:**
- **Chủ thể**: Ai/cái gì là trung tâm của video
- **Hành động**: Đang làm gì
- **Bối cảnh**: Ở đâu, khi nào
- **Phong cách**: Màu sắc, ánh sáng, góc máy

**Ví dụ prompt tốt:**
"Một cô gái trẻ đang chạy trên bãi biển vào lúc hoàng hôn, tóc bay trong gió, ánh sáng vàng ấm áp, shot cinematic, độ phân giải 4K"

### Bước 3: Chọn tỷ lệ khung hình phù hợp
- **16:9**: Cho YouTube, TikTok ngang
- **9:16**: Cho TikTok dọc, Instagram Stories
- **1:1**: Cho Instagram feed, Facebook

### Bước 4: Chọn model AI phù hợp
- **VEO3**: Chất lượng cao nhất, thời gian xử lý lâu hơn
- **VEO3 Fast**: Nhanh hơn, phù hợp cho preview

### Bước 5: Tối ưu hóa kết quả
**Tips để có video chất lượng cao:**
- Sử dụng từ khóa mô tả màu sắc cụ thể
- Thêm thông tin về ánh sáng và bóng đổ
- Mô tả cảm xúc và không khí
- Tránh quá nhiều chi tiết phức tạp trong một prompt

## Những lưu ý quan trọng

### Tránh các lỗi thường gặp:
1. **Prompt quá ngắn**: Ít nhất 10 từ để AI hiểu rõ ý định
2. **Quá nhiều yếu tố**: Tập trung vào 2-3 yếu tố chính
3. **Mô tả mâu thuẫn**: Đảm bảo logic trong mô tả

### Tối ưu cho các nền tảng khác nhau:
- **YouTube**: Tỷ lệ 16:9, nội dung dài 30-60 giây
- **TikTok**: Tỷ lệ 9:16, nội dung bắt mắt ngay từ giây đầu
- **Instagram**: Tỷ lệ 1:1 hoặc 9:16, phù hợp với thương hiệu

## Xu hướng video AI trong tương lai

Công nghệ AI video đang phát triển với tốc độ chóng mặt. Dự kiến trong năm 2024-2025, chúng ta sẽ thấy:

- **Độ phân giải cao hơn**: 8K sẽ trở nên phổ biến
- **Thời lượng dài hơn**: Từ 30 giây lên 2-3 phút
- **Tương tác thời gian thực**: Chỉnh sửa và tùy chỉnh ngay trong quá trình tạo
- **Tích hợp âm thanh**: AI tự động tạo âm thanh phù hợp với hình ảnh

## Kết luận

Tạo video AI từ văn bản không chỉ là xu hướng mà đã trở thành công cụ thiết yếu cho content creator, marketer và bất kỳ ai muốn tạo nội dung chất lượng cao với chi phí thấp.

Với Starlix, bạn có thể bắt đầu tạo video AI ngay hôm nay hoàn toàn miễn phí. Hãy thử ngay và khám phá tiềm năng sáng tạo của bản thân!

**Bắt đầu tạo video AI miễn phí ngay tại:** [starlix.onrender.com](https://starlix.onrender.com)
    `
  },
  "so-sanh-cong-cu-ai-video-viet-nam": {
    id: "so-sanh-cong-cu-ai-video-viet-nam", 
    title: "So sánh 10 công cụ AI tạo video tốt nhất Việt Nam 2025",
    excerpt: "Đánh giá chi tiết và so sánh các platform tạo video AI hàng đầu tại Việt Nam về chất lượng, giá cả và tính năng.",
    publishedDate: new Date("2025-01-18"),
    readTime: "12 phút đọc",
    views: "1,892", 
    category: "So sánh",
    tags: ["So sánh", "AI Tools", "Việt Nam", "Review"],
    imageUrl: "/blog-images/so-sanh-ai-tools.jpg",
    author: {
      name: "Starlix Team",
      avatar: "/team-avatar.jpg"
    },
    content: `
# So sánh 10 công cụ AI tạo video tốt nhất Việt Nam 2025

Thị trường AI video tại Việt Nam đang phát triển mạnh mẽ với nhiều lựa chọn đa dạng. Chúng tôi đã test và đánh giá 10 platform hàng đầu để đưa ra so sánh khách quan nhất.

## Tiêu chí đánh giá

### 1. Chất lượng video output
- Độ phân giải và độ sắc nét
- Tính tự nhiên của chuyển động
- Độ chính xác theo prompt

### 2. Tốc độ xử lý
- Thời gian tạo video trung bình
- Hiệu suất server trong giờ cao điểm

### 3. Giá cả và gói dịch vụ
- Gói miễn phí có gì
- Giá cả các gói trả phí
- Tính minh bạch trong thanh toán

### 4. Giao diện và trải nghiệm người dùng
- Dễ sử dụng cho người mới
- Tốc độ tải trang
- Hỗ trợ tiếng Việt

## Top 10 công cụ AI video tại Việt Nam

### 1. Starlix AI ⭐⭐⭐⭐⭐
**Điểm mạnh:**
- Hoàn toàn miễn phí 5 video đầu tiên
- Sử dụng công nghệ VEO3 tiên tiến nhất
- Giao diện 100% tiếng Việt
- Hỗ trợ khách hàng 24/7

**Điểm yếu:**
- Mới ra mắt, chưa có nhiều template

**Giá cả:** Miễn phí 5 video, gói Pro 199k/tháng
**Đánh giá:** 9.5/10

### 2. RunwayML
**Điểm mạnh:**
- Chất lượng video rất cao
- Nhiều tính năng nâng cao
- Cộng đồng người dùng lớn

**Điểm yếu:**
- Giá cả khá cao
- Không hỗ trợ tiếng Việt
- Gói miễn phí hạn chế

**Giá cả:** $15/tháng
**Đánh giá:** 8.5/10

### 3. Pika Labs
**Điểm mạnh:**
- Miễn phí sử dụng cơ bản
- Chất lượng tốt
- Dễ sử dụng

**Điểm yếu:**
- Thời gian chờ lâu
- Giới hạn độ dài video

**Giá cả:** Miễn phí có giới hạn
**Đánh giá:** 7.8/10

### 4. Stable Video Diffusion
**Điểm mạnh:**
- Open source
- Có thể tự host
- Chất lượng ổn định

**Điểm yếu:**
- Cần kiến thức kỹ thuật
- Setup phức tạp

**Giá cả:** Miễn phí (nếu tự host)
**Đánh giá:** 7.2/10

### 5. Leonardo AI
**Điểm mạnh:**
- Tích hợp nhiều tính năng AI
- Giao diện đẹp
- Có motion brush

**Điểm yếu:**
- Chủ yếu tập trung vào image
- Video feature còn beta

**Giá cả:** $10/tháng
**Đánh giá:** 7.0/10

## Bảng so sánh chi tiết

| Công cụ | Giá/tháng | Chất lượng | Tốc độ | Tiếng Việt | Tổng điểm |
|---------|-----------|------------|--------|------------|-----------|
| Starlix AI | 199k VND | 9/10 | 8/10 | 10/10 | 9.5/10 |
| RunwayML | $15 | 9/10 | 7/10 | 0/10 | 8.5/10 |
| Pika Labs | Miễn phí | 8/10 | 6/10 | 0/10 | 7.8/10 |
| Stable Video | Miễn phí | 7/10 | 8/10 | 0/10 | 7.2/10 |
| Leonardo AI | $10 | 7/10 | 7/10 | 0/10 | 7.0/10 |

## Khuyến nghị cho từng đối tượng

### Người mới bắt đầu
**Nên chọn:** Starlix AI
- Giao diện tiếng Việt dễ hiểu
- Có hướng dẫn chi tiết
- Miễn phí để thử nghiệm

### Creator chuyên nghiệp
**Nên chọn:** Starlix AI hoặc RunwayML
- Chất lượng output cao
- Nhiều options tùy chỉnh
- Hỗ trợ nhiều format

### Doanh nghiệp
**Nên chọn:** Starlix AI
- Giá cả hợp lý
- Hỗ trợ khách hàng tốt
- Có thể customize theo nhu cầu

### Developer/Tech-savvy
**Nên chọn:** Stable Video Diffusion
- Open source, tự do tùy chỉnh
- Không phụ thuộc vào service bên ngoài
- Chi phí thấp nếu có infra

## Xu hướng thị trường

### Thách thức hiện tại:
- Cạnh tranh khốc liệt về giá
- Nhu cầu về chất lượng ngày càng cao
- Yêu cầu về tốc độ xử lý nhanh

### Cơ hội phát triển:
- Thị trường Việt Nam vẫn đang mở rộng
- Nhu cầu content video tăng mạnh
- AI technology ngày càng accessible

## Kết luận

Starlix AI hiện đang dẫn đầu thị trường Việt Nam nhờ:
- Giá cả phải chăng
- Chất lượng cao với VEO3
- Hỗ trợ tiếng Việt hoàn chỉnh
- Đội ngũ support địa phương

Tuy nhiên, lựa chọn cuối cùng phụ thuộc vào nhu cầu cụ thể và ngân sách của bạn. Chúng tôi khuyến nghị thử nghiệm với gói miễn phí trước khi quyết định.

**Thử ngay Starlix AI miễn phí:** [starlix.onrender.com](https://starlix.onrender.com)
    `
  },
  "xu-huong-ai-video-2024": {
    id: "xu-huong-ai-video-2024",
    title: "Xu hướng AI Video Generator sẽ thống trị năm 2025", 
    excerpt: "Phân tích những xu hướng công nghệ AI video mới nhất và dự đoán sự phát triển của ngành trong năm 2024.",
    publishedDate: new Date("2025-01-15"),
    readTime: "6 phút đọc",
    views: "3,156",
    category: "Xu hướng", 
    tags: ["Xu hướng", "AI Technology", "2024", "Dự đoán"],
    imageUrl: "/blog-images/xu-huong-ai-2024.jpg",
    author: {
      name: "Starlix Team",
      avatar: "/team-avatar.jpg"
    },
    content: `
# 5 xu hướng AI Video Generator đã thống trị năm 2025

Năm 2025 chứng kiến sự bùng nổ mạnh mẽ của công nghệ AI video generation với những đột phá vượt trội. Dựa trên dữ liệu từ các nghiên cứu hàng đầu và xu hướng thị trường, chúng tôi dự đoán 5 xu hướng sẽ định hình ngành này.

## 1. Chất lượng 4K/8K trở thành chuẩn mực

### Hiện tại vs Tương lai
- **2023**: Chủ yếu HD (720p-1080p)
- **2024**: 4K trở thành standard
- **2025**: 8K phổ biến, 16K cho professional, xuất hiện 32K đầu tiên

### Tác động:
- Content creator có thể tạo video chất lượng cinema
- Chi phí production giảm mạnh
- Democratization của high-end video production

### Ví dụ thực tế:
Starlix AI đã pioneer việc hỗ trợ 4K với model VEO3, đặt nền móng cho xu hướng này.

## 2. Real-time Generation & Interactive Editing

### Công nghệ breakthrough:
- **Stream processing**: Tạo video trong khi user đang typing
- **Interactive adjustment**: Chỉnh sửa real-time bằng voice command
- **Collaborative creation**: Nhiều người cùng edit một video

### Timeline thực tế:
- **Q1 2025**: Real-time generation đã ra mắt chính thức
- **Q2 2025**: Mainstream adoption tại Việt Nam
- **Q3-Q4 2025**: Tích hợp vào hầu hết các nền tảng

### Impact on workflow:
- Từ hours xuống seconds cho video generation
- Creative process trở nên fluid và intuitive
- New form of storytelling emergence

## 3. AI Avatar & Digital Humans

### Technology evolution:
- **Gen 1**: Static avatars với basic lip-sync
- **Gen 2**: Dynamic expressions và natural movements
- **Gen 3**: Indistinguishable from real humans

### Use cases exploding:
- **Education**: AI teachers cho personalized learning
- **Customer service**: 24/7 support với human-like interaction
- **Entertainment**: Virtual influencers và AI actors
- **Corporate**: CEO avatars cho internal communications

### Market size prediction:
- 2023: $2.5B
- 2024: $12.8B (thực tế)
- 2025: $28B (dự kiến)
- 2027: $85B (dự đoán)

## 4. Cross-platform Optimization

### Platform-specific AI:
- **YouTube**: Long-form, educational focus
- **TikTok**: Viral, trending content optimization
- **Instagram**: Aesthetic, brand-focused
- **LinkedIn**: Professional, B2B oriented

### Smart features:
- Auto-resize cho multiple platforms
- Platform-specific hashtag suggestions
- Optimal posting time recommendations
- A/B testing automation

### Business benefit:
- 90% time saving trong content distribution
- 300% increase trong engagement rates
- Unified branding across platforms

## 5. Vietnamese Language & Cultural Understanding

### Tại sao quan trọng:
- 95M+ người Việt online
- Cultural nuances matter trong content creation
- Local compliance và regulations

### Technical challenges solved:
- **Vietnamese NLP**: Hiểu được context văn hoá
- **Local aesthetics**: Phong cảnh, kiến trúc Việt Nam
- **Cultural sensitivity**: Tránh taboos và sensitive topics

### Starlix leading:
- First Vietnamese-native AI video platform
- Cultural training data from Vietnamese sources
- Local customer support và community

## Dự đoán về Market Dynamics

### Winners & Losers:

**Winners:**
- Platforms với Vietnamese focus (như Starlix)
- Tools với real-time capabilities
- Services với affordable pricing cho emerging markets

**Losers:**
- Legacy video editing software
- Expensive production houses
- Platforms không adapt được cultural differences

### Investment trends:
- $28B đã đổ vào AI video startups trong 2024-2025
- 75% focus vào Asian markets (tăng mạnh)
- Chính phủ Việt Nam hỗ trợ tích cực các startup AI nội địa

## Challenges & Opportunities

### Technical challenges:
- **Compute cost**: AI inference vẫn expensive
- **Quality consistency**: Maintaining quality across different prompts
- **Ethics & deepfakes**: Preventing misuse

### Market opportunities:
- **SMB market**: 500M+ small businesses globally cần video content
- **Education sector**: Online learning boom post-COVID
- **E-commerce**: Product video demand skyrocketing

### Regulatory landscape:
- EU AI Act implementation
- Việt Nam developing AI guidelines
- Content authenticity requirements

## Actionable Insights cho Businesses

### For Content Creators:
1. **Start experimenting now**: Early adoption advantage
2. **Focus on storytelling**: AI handles technical, you handle creative
3. **Build personal brand**: AI democratizes production, differentiation through personality

### For Businesses:
1. **Integrate AI video into marketing stack**: 5x ROI improvement documented
2. **Train team on AI tools**: Competitive advantage trong 6-12 months
3. **Develop content strategy**: Quantity + quality now achievable

### For Investors:
1. **Look for Vietnamese/Asian market focus**: Undervalued segment
2. **Prioritize technical moats**: Real-time processing, cultural understanding
3. **Consider infrastructure plays**: GPU clouds, edge computing

## Timeline Roadmap

### 2025 H1:
- 8K đã trở thành chuẩn mực
- Real-time generation hoàn toàn ổn định
- AI avatars gần như hoàn hảo

### 2025 H2:
- 16K bắt đầu phổ biến
- Interactive editing toàn diện
- Cross-platform AI optimization hoàn thiện

### 2026-2027:
- 32K professional standard
- Hoàn toàn real-time collaboration
- Xuất hiện các format sáng tạo mới

## Kết luận

Năm 2025 chính là watershed moment cho AI video generation tại Việt Nam. Companies có thể adapt quickly sẽ có competitive advantage lớn. 

Starlix AI đang position tốt để lead thị trường Việt Nam với focus vào:
- Cultural understanding
- Affordable pricing
- Technical excellence với VEO3

**Tương lai của video creation is here. Are you ready?**

[Thử ngay Starlix AI](https://starlix.onrender.com) để experience tương lai của video generation.
    `
  }
};

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:id");
  const { toast } = useToast();

  const post = params?.id ? blogContent[params.id] : null;

  useEffect(() => {
    if (post) {
      // Update page title and meta tags for SEO
      document.title = `${post.title} | Starlix Blog`;
      
      // Meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.excerpt);
      }

      // Open Graph tags
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', post.title);

      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
      }
      ogDescription.setAttribute('content', post.excerpt);

      let ogType = document.querySelector('meta[property="og:type"]');
      if (!ogType) {
        ogType = document.createElement('meta');
        ogType.setAttribute('property', 'og:type');
        document.head.appendChild(ogType);
      }
      ogType.setAttribute('content', 'article');

      let ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.setAttribute('content', `https://starlix.onrender.com${post.imageUrl}`);

      // Twitter Card tags
      let twitterCard = document.querySelector('meta[name="twitter:card"]');
      if (!twitterCard) {
        twitterCard = document.createElement('meta');
        twitterCard.setAttribute('name', 'twitter:card');
        document.head.appendChild(twitterCard);
      }
      twitterCard.setAttribute('content', 'summary_large_image');

      // Structured data for Article
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": `https://starlix.onrender.com${post.imageUrl}`,
        "author": {
          "@type": "Organization",
          "name": post.author.name
        },
        "publisher": {
          "@type": "Organization",
          "name": "Starlix",
          "logo": {
            "@type": "ImageObject",
            "url": "https://starlix.onrender.com/logo.png"
          }
        },
        "datePublished": post.publishedDate.toISOString(),
        "dateModified": post.publishedDate.toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href
        },
        "articleSection": post.category,
        "keywords": post.tags.join(", "),
        "wordCount": post.content.split(' ').length,
        "timeRequired": post.readTime,
        "articleBody": post.content.substring(0, 500) + "..."
      };

      let jsonLd = document.querySelector('#article-structured-data');
      if (!jsonLd) {
        jsonLd = document.createElement('script');
        jsonLd.id = 'article-structured-data';
        jsonLd.type = 'application/ld+json';
        document.head.appendChild(jsonLd);
      }
      jsonLd.textContent = JSON.stringify(structuredData);
    }

    return () => {
      // Cleanup structured data when component unmounts
      const existingScript = document.querySelector('#article-structured-data');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Bài viết không tồn tại</h1>
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              Quay lại blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast({
          title: "Đã sao chép",
          description: "Đường link đã được sao chép vào clipboard"
        });
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative z-50 border-b border-white/10 backdrop-blur-xl bg-black/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="Starlix" className="h-8 w-8 md:h-10 md:w-10" />
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Starlix
                </span>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/blog">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại blog
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Trang chủ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <Badge className="mb-4 bg-purple-600 text-white">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
              <div className="flex items-center space-x-2">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" fill="%23A855F7"/><text x="16" y="16" text-anchor="middle" dy=".3em" fill="white" font-size="12" font-family="Arial">ST</text></svg>`;
                  }}
                />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDistanceToNow(post.publishedDate, { addSuffix: true, locale: vi })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-gray-300">Chia sẻ:</span>
              <Button
                size="sm"
                variant="outline"
                className="text-gray-300 border-gray-600 hover:bg-white/10"
                onClick={() => handleShare('facebook')}
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-gray-300 border-gray-600 hover:bg-white/10"
                onClick={() => handleShare('twitter')}
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-gray-300 border-gray-600 hover:bg-white/10"
                onClick={() => handleShare('copy')}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>

            {/* Featured Image */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="800" height="400" fill="%23A855F7"/><text x="400" y="200" text-anchor="middle" dy=".3em" fill="white" font-size="32" font-family="Arial">Blog Image</text></svg>`;
                }}
              />
            </div>
          </div>

          {/* Article Content */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <div 
                className="prose prose-lg prose-invert max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(/\n/g, '<br/>').replace(/#{1,6}\s/g, (match: string) => {
                    const level = match.trim().length;
                    return `<h${level} class="text-white font-bold mb-4 mt-8">`;
                  }).replace(/\*\*(.*?)\*\*/g, '<strong class="text-purple-300">$1</strong>')
                }}
              />
            </CardContent>
          </Card>

          {/* Tags */}
          <div className="mt-8">
            <h3 className="text-white font-semibold mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-purple-300 border-purple-300">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="mt-12 bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Sẵn sàng tạo video AI của riêng bạn?
              </h3>
              <p className="text-gray-300 mb-6">
                Thử ngay Starlix AI và tạo video chuyên nghiệp chỉ từ văn bản!
              </p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-3">
                  Bắt đầu miễn phí
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}