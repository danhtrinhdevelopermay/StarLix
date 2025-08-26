import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Sparkles, ArrowRight, Check, Star, Menu, X } from "lucide-react";
import { useState } from "react";
import logoUrl from "@/assets/logo.png";
import { OptimizedImage } from "@/components/OptimizedImage";

export default function Landing() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative z-50 border-b border-white/10 backdrop-blur-xl bg-black/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src={logoUrl} 
                alt="Starlix - AI Video Generator" 
                className="h-8 w-8 md:h-10 md:w-10" 
                width="32" 
                height="32"
                decoding="sync"
                data-testid="img-logo-header"
              />
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Starlix
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Tính năng</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Giá cả</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">Về chúng tôi</a>
              <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                  Bắt đầu ngay
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10">
              <nav className="flex flex-col space-y-4 mt-4">
                <a 
                  href="#features" 
                  className="text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tính năng
                </a>
                <a 
                  href="#pricing" 
                  className="text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Giá cả
                </a>
                <a 
                  href="#about" 
                  className="text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Về chúng tôi
                </a>
                <Link 
                  href="/blog" 
                  className="text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                  <Link href="/login">
                    <Button 
                      variant="ghost" 
                      className="w-full text-white hover:bg-white/10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Bắt đầu ngay
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by AI Tiên tiến
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Tạo Video AI Miễn Phí
            </span>
            <br />
            <span className="text-white">Từ Văn Bản & Hình Ảnh</span>
          </h1>
          
          <p className="text-xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-white">Công cụ tạo video AI #1 Việt Nam 2024</strong> - Biến văn bản thành video chuyên nghiệp chỉ 30 giây! 
            Chất lượng 4K, không cần kỹ năng chỉnh sửa. <em className="text-blue-200">Miễn phí 5 video đầu tiên</em>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Tạo Video Miễn Phí
              </Button>
            </Link>
            <Button size="lg" variant="outlined" className="border-white/60 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm px-8 py-6 text-lg">
              Xem Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          {/* Demo Video Placeholder - Optimized */}
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-white/20 aspect-video">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Play className="w-20 h-20 text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-100">Video Demo Starlix AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Tính Năng AI Video Generator Hàng Đầu
            </h2>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto">
              <strong className="text-white">Text-to-Video & Image-to-Video AI</strong> với công nghệ VEO3 tiên tiến - tạo video chất lượng 4K chỉ trong 30 giây
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Text-to-Video AI Miễn Phí</h3>
                <p className="text-gray-100 leading-relaxed">
                  <strong className="text-white">Tạo video từ văn bản</strong> chỉ bằng mô tả tiếng Việt. AI VEO3 tạo video HD/4K chất lượng cao trong 30-60 giây. <em className="text-blue-200">Hoàn toàn miễn phí!</em>
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Image-to-Video AI</h3>
                <p className="text-gray-100 leading-relaxed">
                  <strong className="text-white">Biến ảnh thành video động</strong> với hiệu ứng chuyển động tự nhiên. Upload ảnh và AI tự động tạo video sống động chất lượng cao.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Video 4K Chất Lượng Cao</h3>
                <p className="text-gray-100 leading-relaxed">
                  Xuất video <strong className="text-white">chất lượng 4K Ultra HD</strong> phù hợp YouTube, TikTok, Facebook. Không watermark với gói Pro, tải về ngay lập tức.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Bảng Giá Tạo Video AI Tốt Nhất
            </h2>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto">
              <strong className="text-white">Miễn phí vĩnh viễn</strong> hoặc nâng cấp Pro để tạo video không giới hạn với chất lượng 4K
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Miễn Phí</h3>
                  <div className="text-4xl font-bold text-white mb-2">0đ</div>
                  <p className="text-gray-700">Để thử nghiệm</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "5 video miễn phí",
                    "Độ phân giải HD",
                    "Thời lượng tối đa 30s",
                    "Watermark có sẵn"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-800">
                      <Check className="w-5 h-5 text-green-600 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button className="w-full bg-gray-800/80 hover:bg-gray-700/80 text-white border-gray-600/50">
                    Bắt Đầu Miễn Phí
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/50 backdrop-blur-sm relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                  Phổ Biến
                </Badge>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                  <div className="text-4xl font-bold text-white mb-2">199,000đ</div>
                  <p className="text-gray-200">/ tháng</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "Video không giới hạn",
                    "Độ phân giải 4K",
                    "Thời lượng tối đa 5 phút",
                    "Không watermark",
                    "Ưu tiên xử lý",
                    "Hỗ trợ 24/7"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-white">
                      <Check className="w-5 h-5 text-green-400 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                    Nâng Cấp Pro
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold text-white mb-2">Liên hệ</div>
                  <p className="text-gray-700">Cho doanh nghiệp</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "API tích hợp",
                    "Xử lý hàng loạt",
                    "Tùy chỉnh brand",
                    "SLA đảm bảo",
                    "Đào tạo nhóm",
                    "Quản lý tập trung"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-800">
                      <Check className="w-5 h-5 text-green-600 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gray-800/80 hover:bg-gray-700/80 text-white border-gray-600/50">
                  Liên Hệ Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tất cả thông tin về <strong>tạo video AI miễn phí</strong> và các tính năng của Starlix
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "Tạo video AI miễn phí có thật không?",
                answer: "Có! Starlix cung cấp hoàn toàn miễn phí 5 video đầu tiên với chất lượng HD. Bạn chỉ cần đăng ký tài khoản và có thể tạo video AI ngay lập tức mà không mất phí."
              },
              {
                question: "Làm sao để tạo video từ văn bản bằng AI?",
                answer: "Rất đơn giản: (1) Mô tả video bằng tiếng Việt trong ô text, (2) Chọn tỷ lệ khung hình, (3) Nhấn 'Tạo Video'. AI VEO3 sẽ xử lý và tạo video chất lượng cao trong 30-60 giây."
              },
              {
                question: "Chất lượng video AI có tốt không?",
                answer: "Starlix sử dụng công nghệ VEO3 tiên tiến nhất hiện tại, tạo video với chất lượng HD đến 4K. Video có chuyển động mượt mà, chi tiết sắc nét và phù hợp để đăng lên YouTube, TikTok, Facebook."
              },
              {
                question: "Tạo video từ hình ảnh có khó không?",
                answer: "Không khó! Chỉ cần upload ảnh lên Starlix và mô tả chuyển động mong muốn. AI sẽ tự động tạo video động từ ảnh tĩnh với hiệu ứng chuyên nghiệp."
              },
              {
                question: "Starlix có hỗ trợ tiếng Việt không?",
                answer: "Có! Starlix được thiết kế đặc biệt cho người Việt. Giao diện 100% tiếng Việt, hỗ trợ mô tả video bằng tiếng Việt và có đội ngũ hỗ trợ khách hàng 24/7."
              },
              {
                question: "So với các AI video generator khác thì Starlix có gì khác?",
                answer: "Starlix là công cụ AI video duy nhất tại Việt Nam có: (1) Giao diện tiếng Việt, (2) Miễn phí thực sự, (3) Chất lượng 4K, (4) Xử lý nhanh 30-60s, (5) Hỗ trợ 24/7 bằng tiếng Việt."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {faq.question}
                  </h3>
                  <p className="text-gray-100 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Sẵn Sàng Tạo Video AI Miễn Phí?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Tham gia <strong>+10,000 người sáng tạo</strong> đang sử dụng Starlix để tạo video AI chuyên nghiệp. 
            <em>100% miễn phí, không cần thẻ tín dụng!</em>
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-6 text-lg">
              Tạo Video AI Miễn Phí Ngay
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <OptimizedImage 
                  src={logoUrl} 
                  alt="Starlix - AI Video Generator" 
                  className="h-8 w-8" 
                  width={32} 
                  height={32} 
                  loading="lazy"
                  data-testid="img-logo-footer"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Starlix
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Nền tảng tạo video AI hàng đầu, giúp bạn biến ý tưởng thành hiện thực.
              </p>
              <p className="text-gray-400 mt-3 text-sm">
                Được phát triển bởi <span className="text-blue-400 font-medium">Danh Trình</span>
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Sản phẩm</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Text-to-Video</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Image-to-Video</a></li>
                <li><a href="https://docs.veo3api.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a 
                    href="https://www.facebook.com/danhtrinh.official" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.tiktok.com/@trinz_ofc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    TikTok
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:0786831513"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.33 2h9.34c2.94 0 5.33 2.39 5.33 5.33v9.34c0 2.94-2.39 5.33-5.33 5.33H7.33C4.39 22 2 19.61 2 16.67V7.33C2 4.39 4.39 2 7.33 2zm4.67 4.67c-2.21 0-4 1.79-4 4 0 .74.2 1.43.55 2.02L7.33 14l1.31-1.22c.59.35 1.28.55 2.02.55 2.21 0 4-1.79 4-4s-1.79-4-4-4z"/>
                    </svg>
                    Zalo: 0786831513
                  </a>
                </li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Điều khoản sử dụng</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Chính sách bảo mật</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Starlix. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
              <span>
                Được hỗ trợ bởi{" "}
                <a 
                  href="https://veo3api.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  STLix API
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}