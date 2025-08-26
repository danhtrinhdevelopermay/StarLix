import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Eye, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useEffect } from "react";

// Mock blog data - trong thực tế sẽ fetch từ API
const blogPosts = [
  {
    id: "huong-dan-tao-video-ai-mien-phi-2024",
    title: "Hướng dẫn tạo video AI từ văn bản miễn phí 2025 - Chi tiết từ A đến Z",
    excerpt: "Khám phá cách tạo video AI chuyên nghiệp từ văn bản hoàn toàn miễn phí với công nghệ VEO3 tiên tiến. Hướng dẫn chi tiết cho người mới bắt đầu.",
    content: "",
    publishedDate: new Date("2025-01-20"),
    readTime: "8 phút đọc",
    views: "2,347",
    category: "Hướng dẫn",
    tags: ["AI Video", "Text to Video", "Miễn phí", "VEO3"],
    featured: true,
    imageUrl: "/blog-images/huong-dan-tao-video-ai.jpg",
    author: {
      name: "Starlix Team",
      avatar: "/team-avatar.jpg"
    }
  },
  {
    id: "so-sanh-cong-cu-ai-video-viet-nam",
    title: "So sánh 10 công cụ AI tạo video tốt nhất Việt Nam 2025",
    excerpt: "Đánh giá chi tiết và so sánh các platform tạo video AI hàng đầu tại Việt Nam về chất lượng, giá cả và tính năng.",
    content: "",
    publishedDate: new Date("2025-01-18"),
    readTime: "12 phút đọc", 
    views: "1,892",
    category: "So sánh",
    tags: ["So sánh", "AI Tools", "Việt Nam", "Review"],
    featured: true,
    imageUrl: "/blog-images/so-sanh-ai-tools.jpg",
    author: {
      name: "Starlix Team",
      avatar: "/team-avatar.jpg"
    }
  },
  {
    id: "xu-huong-ai-video-2024",
    title: "Xu hướng AI Video Generator sẽ thống trị năm 2025",
    excerpt: "Phân tích những xu hướng công nghệ AI video mới nhất và dự đoán sự phát triển của ngành trong năm 2025.",
    content: "",
    publishedDate: new Date("2025-01-15"),
    readTime: "6 phút đọc",
    views: "3,156",
    category: "Xu hướng",
    tags: ["Xu hướng", "AI Technology", "2025", "Dự đoán"],
    featured: false,
    imageUrl: "/blog-images/xu-huong-ai-2024.jpg",
    author: {
      name: "Starlix Team", 
      avatar: "/team-avatar.jpg"
    }
  }
];

export default function Blog() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  useEffect(() => {
    // Update page title and meta tags for SEO
    document.title = "Blog AI Video - Tin tức và Hướng dẫn tạo Video AI | Starlix";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Khám phá các bài viết mới nhất về AI video generation, hướng dẫn chi tiết, tips và xu hướng công nghệ AI tại Việt Nam. Cập nhật tin tức từ Starlix.');
    }

    // Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', 'Blog AI Video - Tin tức và Hướng dẫn | Starlix');

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', 'Khám phá tin tức AI video mới nhất, hướng dẫn chi tiết và xu hướng công nghệ tại Việt Nam.');

    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', 'website');

    // Structured data for Blog
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Starlix AI Video Blog",
      "description": "Blog về AI video generation, hướng dẫn và tin tức công nghệ",
      "url": window.location.href,
      "publisher": {
        "@type": "Organization",
        "name": "Starlix",
        "logo": {
          "@type": "ImageObject",
          "url": "https://starlix.onrender.com/logo.png"
        }
      },
      "blogPost": blogPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.publishedDate.toISOString(),
        "author": {
          "@type": "Organization",
          "name": post.author.name
        },
        "publisher": {
          "@type": "Organization",
          "name": "Starlix"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://starlix.onrender.com/blog/${post.id}`
        },
        "image": post.imageUrl
      }))
    };

    let jsonLd = document.querySelector('#blog-structured-data');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.id = 'blog-structured-data';
      jsonLd.type = 'application/ld+json';
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(structuredData);

    return () => {
      // Cleanup structured data when component unmounts
      const existingScript = document.querySelector('#blog-structured-data');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

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
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Về trang chủ
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog & Tin tức AI
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Cập nhật xu hướng mới nhất về công nghệ AI, hướng dẫn chi tiết và tips thực tế cho việc tạo video AI
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Bài viết nổi bật</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="%23A855F7"/><text x="200" y="100" text-anchor="middle" dy=".3em" fill="white" font-size="24" font-family="Arial">Blog Image</text></svg>`;
                      }}
                    />
                    <Badge className="absolute top-4 left-4 bg-purple-600 text-white">
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
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
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs text-purple-300 border-purple-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                        Đọc bài viết
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8">Tất cả bài viết</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Card key={post.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="%23A855F7"/><text x="200" y="100" text-anchor="middle" dy=".3em" fill="white" font-size="20" font-family="Arial">Blog Image</text></svg>`;
                    }}
                  />
                  <Badge className="absolute top-2 left-2 bg-purple-600 text-white text-xs">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-white group-hover:text-purple-300 transition-colors text-lg line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDistanceToNow(post.publishedDate, { addSuffix: true, locale: vi })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                      Đọc tiếp
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-white text-2xl">
                Đăng ký nhận tin tức AI mới nhất
              </CardTitle>
              <p className="text-gray-300">
                Nhận thông báo về các bài viết mới, hướng dẫn và xu hướng AI video
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Nhập email của bạn"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                />
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  Đăng ký
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}