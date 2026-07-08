import { useState, useEffect, ChangeEvent, FormEvent, lazy, Suspense } from "react";
import { 
  Sparkles, 
  Video, 
  PenTool, 
  UserCheck, 
  FileText, 
  Cpu, 
  Workflow, 
  Bot, 
  MessageSquareText, 
  ShoppingBag, 
  Share2, 
  Tv, 
  TrendingUp, 
  Layers, 
  Terminal, 
  ShieldCheck, 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  Play, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  ArrowRight,
  Globe,
  Sparkle
} from "lucide-react";
import Navbar from "./components/Navbar";
import Logo from "./components/Logo";

const TuwaiqMountain = lazy(() => import("./components/TuwaiqMountain"));
import { INDIVIDUAL_SERVICES, COMPANY_SERVICES, INDIVIDUAL_VIDEOS, COMPANY_VIDEOS, FAQS } from "./data";
import { UserType, ContactFormData, Service, VideoCard } from "./types";

// Helper to parse and extract embeddable video links (YouTube, Vimeo, or direct video)
function getEmbedUrl(url?: string): { type: "youtube" | "vimeo" | "direct" | "none"; embedUrl: string } {
  if (!url) return { type: "none", embedUrl: "" };

  // YouTube
  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const ytMatch = url.match(ytRegex);
  if (ytMatch && ytMatch[1]) {
    return { type: "youtube", embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0` };
  }

  // Vimeo
  const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch && vimeoMatch[1]) {
    return { type: "vimeo", embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1` };
  }

  // Direct video file (or absolute URL starting with http)
  if (url.match(/\.(mp4|webm|ogg)$/i) || url.startsWith("http")) {
    return { type: "direct", embedUrl: url };
  }

  return { type: "none", embedUrl: "" };
}

export default function App() {
  const [activeTab, setActiveTab] = useState<UserType>("individuals");
  const [transitioning, setTransitioning] = useState(false);
  const [visibleTab, setVisibleTab] = useState<UserType>("individuals");
  const [selectedService, setSelectedService] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");
  const [selectedVideo, setSelectedVideo] = useState<VideoCard | null>(null);

  // Contact Form States
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    userType: "individuals",
    serviceNeeded: "",
    message: ""
  });
  const [formFocused, setFormFocused] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sync Form UserType with selected tab
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      userType: activeTab,
      // Reset selected service so it matches the correct tab's list
      serviceNeeded: activeTab === "individuals" ? INDIVIDUAL_SERVICES[0].title : COMPANY_SERVICES[0].title
    }));
  }, [activeTab]);

  // Tab change handler with premium fade transition (450ms)
  const handleTabChange = (tab: UserType) => {
    if (tab === activeTab) return;
    setTransitioning(true);
    setActiveTab(tab);
    setTimeout(() => {
      setVisibleTab(tab);
      setTransitioning(false);
    }, 450);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        // Reset form (except userType)
        setTimeout(() => {
          setSubmitSuccess(false);
          setFormData({
            fullName: "",
            companyName: "",
            phone: "",
            email: "",
            userType: activeTab,
            serviceNeeded: activeTab === "individuals" ? INDIVIDUAL_SERVICES[0].title : COMPANY_SERVICES[0].title,
            message: ""
          });
        }, 6000);
      } else {
        setErrorMessage(data.error || "حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("عذراً، فشل الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة مجدداً.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to dynamically render corresponding Lucide Icons for Services
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Sparkles": return <Sparkles className="w-5 h-5 text-[#5B5CFF]" />;
      case "Video": return <Video className="w-5 h-5 text-[#3B82F6]" />;
      case "PenTool": return <PenTool className="w-5 h-5 text-[#7C5CFF]" />;
      case "UserCheck": return <UserCheck className="w-5 h-5 text-[#5B5CFF]" />;
      case "FileText": return <FileText className="w-5 h-5 text-[#3B82F6]" />;
      case "Cpu": return <Cpu className="w-5 h-5 text-[#7C5CFF]" />;
      case "Workflow": return <Workflow className="w-5 h-5 text-[#5B5CFF]" />;
      case "Bot": return <Bot className="w-5 h-5 text-[#3B82F6]" />;
      case "MessageSquareText": return <MessageSquareText className="w-5 h-5 text-[#7C5CFF]" />;
      case "ShoppingBag": return <ShoppingBag className="w-5 h-5 text-[#5B5CFF]" />;
      case "Share2": return <Share2 className="w-5 h-5 text-[#3B82F6]" />;
      case "Tv": return <Tv className="w-5 h-5 text-[#7C5CFF]" />;
      case "TrendingUp": return <TrendingUp className="w-5 h-5 text-[#5B5CFF]" />;
      case "Layers": return <Layers className="w-5 h-5 text-[#3B82F6]" />;
      case "Terminal": return <Terminal className="w-5 h-5 text-[#7C5CFF]" />;
      case "ShieldCheck": return <ShieldCheck className="w-5 h-5 text-[#5B5CFF]" />;
      default: return <Cpu className="w-5 h-5 text-[#5B5CFF]" />;
    }
  };

  const currentServices = visibleTab === "individuals" ? INDIVIDUAL_SERVICES : COMPANY_SERVICES;
  const currentVideos = visibleTab === "individuals" ? INDIVIDUAL_VIDEOS : COMPANY_VIDEOS;

  return (
    <div className="relative min-h-screen bg-[#050816] text-white selection:bg-[#7C5CFF]/30 selection:text-white overflow-x-hidden">
      
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#7C5CFF]/10 blur-[150px] pointer-events-none"></div>
      <div className="absolute top-[30%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-[#5B5CFF]/5 blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#3B82F6]/5 blur-[160px] pointer-events-none"></div>

      {/* Global Interactive Elements: Video Preview Modal */}
      {selectedVideo && (() => {
        const videoInfo = getEmbedUrl(selectedVideo.videoUrl);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/95 backdrop-blur-2xl transition-opacity duration-300">
            <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden glass-panel border border-[#7C5CFF]/30 shadow-2xl shadow-purple-950/40">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#050816]/75 border border-white/15 flex items-center justify-center hover:bg-white/10 hover:border-[#7C5CFF] text-white transition-all cursor-pointer text-lg font-bold"
              >
                ✕
              </button>

              {/* Player Stage */}
              <div className="aspect-video w-full bg-[#03050c] relative flex items-center justify-center overflow-hidden">
                
                {videoInfo.type === "youtube" || videoInfo.type === "vimeo" ? (
                  <iframe
                    src={videoInfo.embedUrl}
                    title={selectedVideo.title}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : videoInfo.type === "direct" ? (
                  <video
                    src={videoInfo.embedUrl}
                    controls
                    autoPlay
                    className="absolute inset-0 w-full h-full"
                  ></video>
                ) : (
                  // Fallback: Mock Sandbox Player
                  <>
                    <img 
                      src={selectedVideo.thumbnailUrl} 
                      alt={selectedVideo.title} 
                      onError={(e) => {
                        const fallbacks: Record<string, string> = {
                          "/images/ind-vid-1.webp": "https://i.ibb.co/nvK2snn/Chat-GPT-Image-Jul-7-2026-07-18-28-AM.png",
                          "/images/ind-vid-2.webp": "https://i.ibb.co/4Z99qYNP/Chat-GPT-Image-Jul-7-2026-07-20-28-AM.png",
                          "/images/ind-vid-3.webp": "https://i.ibb.co/1jmtV7r/Chat-GPT-Image-Jul-7-2026-07-22-02-AM.png",
                          "/images/com-vid-1.webp": "https://i.ibb.co/7trMY9G0/Chat-GPT-Image-Jul-7-2026-07-24-12-AM.png",
                          "/images/com-vid-2.webp": "https://i.ibb.co/Z61Kd2t5/Chat-GPT-Image-Jul-7-2026-07-25-39-AM.png",
                          "/images/com-vid-3.webp": "https://i.ibb.co/8gmMj0GN/Chat-GPT-Image-Jul-7-2026-07-27-19-AM.png"
                        };
                        const target = selectedVideo.thumbnailUrl || "";
                        if (fallbacks[target]) {
                          e.currentTarget.src = fallbacks[target];
                        }
                      }}
                      className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm" 
                    />
                    
                    <div className="relative z-10 text-center px-6 max-w-xl">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#5B5CFF] to-[#7C5CFF] flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(124,92,255,0.5)] animate-bounce">
                        <Play className="w-8 h-8 text-white fill-white translate-x-[-1px]" />
                      </div>
                      
                      <h4 className="text-xl sm:text-2xl font-bold font-sans mb-3 text-white">
                        {selectedVideo.title}
                      </h4>
                      
                      <p className="text-xs sm:text-sm text-[#AEB7CC] font-sans leading-relaxed">
                        هذا العرض التوضيحي محاكي حالياً لخدمة الأتمتة والذكاء الاصطناعي. نملك حلولاً تقنية متكاملة تدعم احتياجات الأتمتة والربط الذكي في السوق السعودي.
                      </p>
                    </div>
                  </>
                )}

                {/* Glowing decorative ambient strip */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5B5CFF] via-[#7C5CFF] to-[#3B82F6]"></div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Sticky Premium Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main Container */}
      <main className="pt-24 md:pt-32 pb-24">
        
        {/* HERO SECTION */}
        <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Content & Tabs Toggle */}
            <div className="lg:col-span-7 flex flex-col justify-center text-right">
              {/* Vision Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-l from-[#121828]/80 to-[#0B1120]/50 border border-white/5 py-1.5 px-4 rounded-full w-fit mb-6 self-start md:self-auto hover:border-[#7C5CFF]/30 transition-all">
                <Sparkles className="w-4 h-4 text-[#7C5CFF]" />
                <span className="font-sans text-xs font-semibold tracking-wider text-[#AEB7CC]">
                  مستقبل الأتمتة الذكية للرؤية السعودية الواعدة
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.2] mb-6">
                ذكاء اصطناعي يصنع
                <span className="relative inline-block px-3 py-1 mx-2">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#5B5CFF]/15 via-[#7C5CFF]/20 to-[#3B82F6]/15 blur-md rounded-2xl"></span>
                  <span className="relative bg-gradient-to-r from-[#5B5CFF] via-[#7C5CFF] to-[#3B82F6] bg-clip-text text-transparent">
                    مستقبل
                  </span>
                </span>
                أعمالك
              </h1>

              {/* Description */}
              <p className="font-sans text-base sm:text-lg text-[#AEB7CC] leading-relaxed mb-10 max-w-2xl">
                نبني حلول ذكاء اصطناعي وأتمتة متقدمة للأفراد والشركات لزيادة الإنتاجية وتسريع النمو وتقليل التكاليف الإجمالية بأرقى المقاييس العالمية.
              </p>

              {/* Double Large Premium Glass Tabs Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                
                {/* Tab Individual */}
                <div
                  id="tab-individuals-btn"
                  onClick={() => handleTabChange("individuals")}
                  className={`relative p-6 rounded-2xl glass-panel cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
                    activeTab === "individuals"
                      ? "border-[#5B5CFF]/60 bg-gradient-to-b from-[#121828]/95 to-[#0B1120]/95 shadow-[0_0_30px_rgba(91,92,255,0.25)] scale-[1.02]"
                      : "opacity-75 hover:opacity-100 hover:border-white/10 hover:translate-y-[-2px]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${activeTab === "individuals" ? "bg-[#5B5CFF]/10 text-[#5B5CFF]" : "bg-white/5 text-[#AEB7CC]"} group-hover:scale-110 transition-transform`}>
                      <User className="w-6 h-6" />
                    </div>
                    {activeTab === "individuals" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#5B5CFF] animate-ping"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-sans text-xl font-bold text-white mb-2">أفراد</h3>
                    <p className="font-sans text-xs sm:text-sm text-[#AEB7CC]">
                      حلول ذكية للأفراد وصناع المحتوى ورواد الأعمال المستقلين في السعودية.
                    </p>
                  </div>
                  
                  {/* Selected neon line indicator at the bottom */}
                  {activeTab === "individuals" && (
                    <span className="absolute bottom-0 left-1/4 right-1/4 h-[3px] rounded-t-full bg-gradient-to-r from-[#5B5CFF] to-[#7C5CFF]"></span>
                  )}
                </div>

                {/* Tab Companies */}
                <div
                  id="tab-companies-btn"
                  onClick={() => handleTabChange("companies")}
                  className={`relative p-6 rounded-2xl glass-panel cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
                    activeTab === "companies"
                      ? "border-[#7C5CFF]/60 bg-gradient-to-b from-[#121828]/95 to-[#0B1120]/95 shadow-[0_0_30px_rgba(124,92,255,0.25)] scale-[1.02]"
                      : "opacity-75 hover:opacity-100 hover:border-white/10 hover:translate-y-[-2px]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${activeTab === "companies" ? "bg-[#7C5CFF]/10 text-[#7C5CFF]" : "bg-white/5 text-[#AEB7CC]"} group-hover:scale-110 transition-transform`}>
                      <Building2 className="w-6 h-6" />
                    </div>
                    {activeTab === "companies" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFF] animate-ping"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-sans text-xl font-bold text-white mb-2">شركات</h3>
                    <p className="font-sans text-xs sm:text-sm text-[#AEB7CC]">
                      حلول متقدمة وشاملة للشركات، المتاجر والمؤسسات والجهات الحكومية.
                    </p>
                  </div>
                  
                  {/* Selected neon line indicator at the bottom */}
                  {activeTab === "companies" && (
                    <span className="absolute bottom-0 left-1/4 right-1/4 h-[3px] rounded-t-full bg-gradient-to-r from-[#7C5CFF] to-[#3B82F6]"></span>
                  )}
                </div>

              </div>
            </div>

            {/* Right Side: Iconic 3D Tuwaiq Mountain */}
            <div className="lg:col-span-5 relative w-full flex justify-center items-center">
              <Suspense fallback={
                <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#050816] border border-white/10 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-cyan-500/30 border-t-cyan-400 animate-spin"></div>
                </div>
              }>
                <TuwaiqMountain />
              </Suspense>
            </div>

          </div>
        </section>

        {/* SERVICES SECTION WITH TAB TRANSITION FADE (450ms) */}
        <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
          
          <div className={`transition-all duration-500 transform ${transitioning ? "opacity-0 translate-y-6 scale-95 pointer-events-none" : "opacity-100 translate-y-0 scale-100"}`}>
            
            {/* Header Content */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-8">
              <div className="text-right">
                <span className="font-mono text-xs font-semibold tracking-wider text-[#7C5CFF] uppercase mb-2 block">
                  {visibleTab === "individuals" ? "باقة حلول الأفراد" : "باقة حلول الشركات والأعمال"}
                </span>
                <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-white mb-3">
                  {visibleTab === "individuals" ? "خدمات الأفراد وصنّاع المحتوى" : "أتمتة وحلول الشركات المتقدمة"}
                </h2>
                <p className="font-sans text-[#AEB7CC] max-w-2xl text-sm sm:text-base leading-relaxed">
                  {visibleTab === "individuals"
                    ? "نساعد الأفراد المستقلين وصناع المحتوى على الاستفادة من قوى الذكاء الاصطناعي لتصميم المحتوى، بناء علامتهم الشخصية، ورفع معدلات الإنتاج بمقدار 10 أضعاف."
                    : "نبني أنظمة ووكلاء ذكاء اصطناعي مخصصة تساعد شركتك ومؤسستك على أتمتة الإجراءات اليومية، وتخفيض تكاليف الدعم وخدمة العملاء، وزيادة فاعلية التشغيل."}
                </p>
              </div>

              {/* Dynamic Tech Counter */}
              <div className="bg-[#0B1120] border border-white/5 py-3 px-5 rounded-2xl text-right flex flex-col justify-center min-w-[150px] self-end">
                <span className="font-mono text-xl font-bold text-[#5B5CFF]">{visibleTab === "individuals" ? "6 أدوات جاهزة" : "10 حلول معتمدة"}</span>
                <span className="font-sans text-xs text-[#AEB7CC]">جاهزة للدمج الفوري</span>
              </div>
            </div>

            {/* Split layout: Services list grid on Left (60%), Videos showcase on Right (40%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Interactive grid of services */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {currentServices.map((service, idx) => {
                  const isServiceSelected = selectedService === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(isServiceSelected ? "" : service.id)}
                      className={`p-6 rounded-2xl glass-panel cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between group ${
                        isServiceSelected 
                          ? "border-[#5B5CFF] shadow-[0_0_20px_rgba(91,92,255,0.15)] bg-gradient-to-b from-[#121828] to-[#0B1120]" 
                          : "hover:border-[#7C5CFF]/40 hover:bg-[#121828]/45 hover:translate-y-[-2px]"
                      }`}
                    >
                      <div>
                        {/* Upper line indicator for active status */}
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-xl transition-all duration-300 ${
                            isServiceSelected ? "bg-[#5B5CFF]/15 text-[#5B5CFF]" : "bg-white/5 text-[#AEB7CC] group-hover:text-[#7C5CFF]"
                          }`}>
                            {getIconComponent(service.iconName)}
                          </div>
                          
                          {service.badge && (
                            <span className="font-sans text-[10px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-[#5B5CFF]/20 to-[#7C5CFF]/20 border border-[#7C5CFF]/30 text-[#AEB7CC]">
                              {service.badge}
                            </span>
                          )}
                        </div>

                        <h3 className="font-sans text-lg font-bold text-white mb-2 flex items-center gap-2">
                          {service.title}
                        </h3>

                        <p className="font-sans text-xs sm:text-sm text-[#AEB7CC] leading-relaxed mb-4">
                          {service.description}
                        </p>
                      </div>

                      {/* Expanded interactive Tech Stack details */}
                      <div className={`overflow-hidden transition-all duration-500 ${
                        isServiceSelected ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"
                      }`}>
                        <div className="pt-3 border-t border-white/5">
                          <span className="font-mono text-[10px] text-[#7C5CFF] font-bold block mb-1.5">التقنيات المستخدمة:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {service.techStack?.map((tech, tIdx) => (
                              <span key={tIdx} className="font-mono text-[9px] bg-[#050816] text-[#AEB7CC] px-2 py-0.5 rounded border border-white/5">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Small arrow indicator */}
                      <div className="flex justify-end mt-2">
                        <span className={`text-xs font-sans font-medium flex items-center gap-1 transition-colors ${
                          isServiceSelected ? "text-[#5B5CFF]" : "text-[#AEB7CC] group-hover:text-white"
                        }`}>
                          {isServiceSelected ? "إغلاق التفاصيل" : "عرض التفاصيل والتقنيات"}
                          <ArrowLeft className={`w-3 h-3 transform transition-transform ${
                            isServiceSelected ? "rotate-90 text-[#5B5CFF]" : "group-hover:-translate-x-1"
                          }`} />
                        </span>
                      </div>

                      {/* Ambient background accent when active */}
                      {isServiceSelected && (
                        <div className="absolute inset-0 bg-radial-gradient(circle at 100% 0%, rgba(91,92,255,0.03) 0%, transparent 80%) pointer-events-none"></div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Three beautiful 16:9 Video Cards */}
              <div id="videos" className="lg:col-span-5 flex flex-col gap-6">
                <div className="text-right mb-2">
                  <h3 className="font-sans text-xl font-bold text-white mb-1 flex items-center gap-2 justify-start">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
                    العروض التوضيحية الحية
                  </h3>
                  <p className="font-sans text-xs text-[#AEB7CC]">
                    شاهد كيف تعمل وكلاؤنا وأنظمتنا في الوقت الفعلي لتحقيق الكفاءة المبتغاة.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {currentVideos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => {
                        setSelectedVideo(video);
                      }}
                      className="group relative aspect-video rounded-2xl overflow-hidden glass-panel border border-white/5 cursor-pointer shadow-lg hover:border-[#3B82F6]/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-all duration-300"
                    >
                      {/* Background Thumbnail Image with deep shadows overlay */}
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const fallbacks: Record<string, string> = {
                            "/images/ind-vid-1.webp": "https://i.ibb.co/nvK2snn/Chat-GPT-Image-Jul-7-2026-07-18-28-AM.png",
                            "/images/ind-vid-2.webp": "https://i.ibb.co/4Z99qYNP/Chat-GPT-Image-Jul-7-2026-07-20-28-AM.png",
                            "/images/ind-vid-3.webp": "https://i.ibb.co/1jmtV7r/Chat-GPT-Image-Jul-7-2026-07-22-02-AM.png",
                            "/images/com-vid-1.webp": "https://i.ibb.co/7trMY9G0/Chat-GPT-Image-Jul-7-2026-07-24-12-AM.png",
                            "/images/com-vid-2.webp": "https://i.ibb.co/Z61Kd2t5/Chat-GPT-Image-Jul-7-2026-07-25-39-AM.png",
                            "/images/com-vid-3.webp": "https://i.ibb.co/8gmMj0GN/Chat-GPT-Image-Jul-7-2026-07-27-19-AM.png"
                          };
                          const target = video.thumbnailUrl || "";
                          if (fallbacks[target]) {
                            e.currentTarget.src = fallbacks[target];
                          }
                        }}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-90"></div>

                      {/* Video tag badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-[#050816]/75 backdrop-blur-md text-xs font-sans text-white border border-white/10 px-2.5 py-1 rounded-lg">
                          {video.tag}
                        </span>
                      </div>

                      {/* Custom Play button overlay with glow */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#050816]/80 border border-white/25 flex items-center justify-center text-white shadow-xl group-hover:bg-[#3B82F6] group-hover:border-[#3B82F6] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all">
                          <Play className="w-5 h-5 translate-x-[-1px] fill-white" />
                        </div>
                      </div>

                      {/* Video duration watermark */}
                      <div className="absolute bottom-4 left-4">
                        <span className="font-mono text-xs text-[#AEB7CC] bg-[#050816]/70 px-2 py-0.5 rounded border border-white/5">
                          {video.duration}
                        </span>
                      </div>

                      {/* Video Title */}
                      <div className="absolute bottom-4 right-4 left-16 text-right">
                        <h4 className="font-sans text-sm sm:text-base font-bold text-white leading-snug group-hover:text-[#3B82F6] transition-colors">
                          {video.title}
                        </h4>
                      </div>

                      {/* 16:9 Watermark */}
                      <div className="absolute top-4 left-4">
                        <span className="font-mono text-[9px] text-white/30 tracking-widest font-bold">16:9</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CUSTOM CONTACT FORM SECTION */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
          
          {/* Glass layout box resembling Stripe premium forms */}
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/5 p-8 md:p-12 shadow-2xl shadow-purple-950/20 bg-gradient-to-br from-[#0B1120]/90 to-[#121828]/60">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7C5CFF]/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3B82F6]/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Left Column (Form header info) */}
              <div className="lg:col-span-5 text-right">
                <span className="font-mono text-xs font-semibold text-[#5B5CFF] tracking-wider uppercase mb-3 block">هل أنت مستعد للأتمتة؟</span>
                <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                  {activeTab === "individuals" ? "ابدأ رحلتك مع الذكاء الاصطناعي كفرد" : "دعنا نبني نظامك الذكي المخصص لمؤسستك"}
                </h2>
                <p className="font-sans text-[#AEB7CC] text-sm sm:text-base leading-relaxed mb-6">
                  املأ النموذج بالخدمات أو التطلعات التي تسعى لأتمتتها، وسيتواصل معك فريق مستشاري طويق لخدمات الذكاء الاصطناعي خلال أقل من 24 ساعة لبدء التخطيط والتحليل التام لمشروعك.
                </p>

                {/* Micro indicators of high-quality service */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 justify-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      ✓
                    </div>
                    <span className="font-sans text-xs text-[#AEB7CC]">تحليل تقني شامل ومجاني لمشروعك</span>
                  </div>
                  <div className="flex items-center gap-3 justify-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      ✓
                    </div>
                    <span className="font-sans text-xs text-[#AEB7CC]">التزام كامل بضوابط الهيئات التنظيمية في السعودية</span>
                  </div>
                  <div className="flex items-center gap-3 justify-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      ✓
                    </div>
                    <span className="font-sans text-xs text-[#AEB7CC]">تطوير سريع وتكامل آمن مع الأنظمة الحالية</span>
                  </div>
                </div>
              </div>

              {/* Right Column (The Form itself) */}
              <div className="lg:col-span-7">
                {submitSuccess ? (
                  <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-fade-in flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-sans text-2xl font-bold text-white mb-2">تم استلام طلبك بنجاح!</h3>
                    <p className="font-sans text-[#AEB7CC] text-sm sm:text-base mb-4 max-w-md">
                      شكراً لتواصلك مع منصة طويق لخدمات الذكاء الاصطناعي. قمنا بتوجيه طلبك وتفاصيله للبريد الإلكتروني بنجاح، وسيتواصل معك أحد مهندسينا ومستشارينا في غضون 24 ساعة.
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-[#AEB7CC] bg-[#050816]/50 px-4 py-2 rounded-xl border border-white/5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      رقم تذكرة الطلب: #{Math.floor(100000 + Math.random() * 900000)}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name Field */}
                      <div className="relative">
                        <label className={`absolute right-4 transition-all duration-300 pointer-events-none font-sans text-sm ${
                          formFocused["fullName"] || formData.fullName ? "top-[-10px] text-xs bg-[#0B1120] px-2 text-[#5B5CFF]" : "top-3.5 text-[#AEB7CC]"
                        }`}>
                          الاسم الكامل
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onFocus={() => setFormFocused(prev => ({ ...prev, fullName: true }))}
                          onBlur={() => setFormFocused(prev => ({ ...prev, fullName: false }))}
                          onChange={handleInputChange}
                          className="w-full bg-[#050816]/40 border border-white/5 focus:border-[#5B5CFF] focus:ring-1 focus:ring-[#5B5CFF] rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-all font-sans text-right"
                        />
                      </div>

                      {/* Company Name Field (Optional) */}
                      <div className="relative">
                        <label className={`absolute right-4 transition-all duration-300 pointer-events-none font-sans text-sm ${
                          formFocused["companyName"] || formData.companyName ? "top-[-10px] text-xs bg-[#0B1120] px-2 text-[#5B5CFF]" : "top-3.5 text-[#AEB7CC]"
                        }`}>
                          اسم الشركة / المؤسسة (اختياري)
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onFocus={() => setFormFocused(prev => ({ ...prev, companyName: true }))}
                          onBlur={() => setFormFocused(prev => ({ ...prev, companyName: false }))}
                          onChange={handleInputChange}
                          className="w-full bg-[#050816]/40 border border-white/5 focus:border-[#5B5CFF] focus:ring-1 focus:ring-[#5B5CFF] rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-all font-sans text-right"
                        />
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Phone Field */}
                      <div className="relative">
                        <label className={`absolute right-4 transition-all duration-300 pointer-events-none font-sans text-sm ${
                          formFocused["phone"] || formData.phone ? "top-[-10px] text-xs bg-[#0B1120] px-2 text-[#5B5CFF]" : "top-3.5 text-[#AEB7CC]"
                        }`}>
                          رقم الجوال
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          placeholder="+966"
                          onFocus={() => setFormFocused(prev => ({ ...prev, phone: true }))}
                          onBlur={() => setFormFocused(prev => ({ ...prev, phone: false }))}
                          onChange={handleInputChange}
                          className="w-full bg-[#050816]/40 border border-white/5 focus:border-[#5B5CFF] focus:ring-1 focus:ring-[#5B5CFF] rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-all font-sans text-left"
                          dir="ltr"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="relative">
                        <label className={`absolute right-4 transition-all duration-300 pointer-events-none font-sans text-sm ${
                          formFocused["email"] || formData.email ? "top-[-10px] text-xs bg-[#0B1120] px-2 text-[#5B5CFF]" : "top-3.5 text-[#AEB7CC]"
                        }`}>
                          البريد الإلكتروني
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onFocus={() => setFormFocused(prev => ({ ...prev, email: true }))}
                          onBlur={() => setFormFocused(prev => ({ ...prev, email: false }))}
                          onChange={handleInputChange}
                          className="w-full bg-[#050816]/40 border border-white/5 focus:border-[#5B5CFF] focus:ring-1 focus:ring-[#5B5CFF] rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-all font-sans text-left"
                          dir="ltr"
                        />
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Client Type Dropdown */}
                      <div className="relative">
                        <label className="absolute right-4 top-[-10px] text-xs bg-[#0B1120] px-2 text-[#5B5CFF] font-sans">
                          نوع العميل
                        </label>
                        <select
                          name="userType"
                          value={formData.userType}
                          onChange={(e) => {
                            handleInputChange(e);
                            handleTabChange(e.target.value as UserType);
                          }}
                          className="w-full bg-[#050816]/40 border border-white/5 focus:border-[#5B5CFF] focus:ring-1 focus:ring-[#5B5CFF] rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-all font-sans text-right appearance-none cursor-pointer"
                        >
                          <option value="individuals" className="bg-[#0B1120]">فرد (صانع محتوى / مستقل)</option>
                          <option value="companies" className="bg-[#0B1120]">شركة / متجر / مؤسسة</option>
                        </select>
                        <div className="absolute left-4 top-4 text-[#AEB7CC] pointer-events-none">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Required Service Dropdown */}
                      <div className="relative">
                        <label className="absolute right-4 top-[-10px] text-xs bg-[#0B1120] px-2 text-[#5B5CFF] font-sans">
                          الخدمة المطلوبة
                        </label>
                        <select
                          name="serviceNeeded"
                          value={formData.serviceNeeded}
                          onChange={handleInputChange}
                          className="w-full bg-[#050816]/40 border border-white/5 focus:border-[#5B5CFF] focus:ring-1 focus:ring-[#5B5CFF] rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-all font-sans text-right appearance-none cursor-pointer"
                        >
                          {currentServices.map((service) => (
                            <option key={service.id} value={service.title} className="bg-[#0B1120]">
                              {service.title}
                            </option>
                          ))}
                          <option value="طلب مخصص" className="bg-[#0B1120]">طلب مخصص / خدمة أخرى</option>
                        </select>
                        <div className="absolute left-4 top-4 text-[#AEB7CC] pointer-events-none">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>

                    </div>

                    {/* Message Box */}
                    <div className="relative">
                      <label className={`absolute right-4 transition-all duration-300 pointer-events-none font-sans text-sm ${
                        formFocused["message"] || formData.message ? "top-[-10px] text-xs bg-[#0B1120] px-2 text-[#5B5CFF]" : "top-3.5 text-[#AEB7CC]"
                      }`}>
                        رسالتك وتفاصيل الأتمتة التي تطمح بها
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onFocus={() => setFormFocused(prev => ({ ...prev, message: true }))}
                        onBlur={() => setFormFocused(prev => ({ ...prev, message: false }))}
                        onChange={handleInputChange}
                        className="w-full bg-[#050816]/40 border border-white/5 focus:border-[#5B5CFF] focus:ring-1 focus:ring-[#5B5CFF] rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-all font-sans text-right resize-none"
                      />
                    </div>

                    {errorMessage && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-sans text-right animate-fade-in">
                        {errorMessage}
                      </div>
                    )}

                    {/* Premium Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative group py-4 px-6 rounded-xl font-sans text-base font-bold text-white overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(91,92,255,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {/* Button gradient background */}
                      <span className="absolute inset-0 bg-gradient-to-r from-[#5B5CFF] via-[#7C5CFF] to-[#3B82F6] rounded-xl"></span>
                      
                      <span className="relative flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            جاري فحص وتأمين مسار الإرسال...
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </>
                        ) : (
                          <>
                            إرسال طلب الاستشارة والربط
                            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>

                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* FAQS ACCORDION SECTION */}
        <section id="faqs" className="max-w-4xl mx-auto px-4 sm:px-6 mb-24 md:mb-32 text-right">
          <div className="text-center mb-12">
            <span className="font-mono text-xs font-semibold text-[#7C5CFF] uppercase tracking-wider mb-2 block">هل لديك أسئلة؟</span>
            <h2 className="font-sans text-3xl font-extrabold text-white">الأسئلة الشائعة حول الأتمتة والذكاء الاصطناعي</h2>
            <p className="font-sans text-[#AEB7CC] text-sm sm:text-base mt-2 max-w-xl mx-auto">
              إليك إجابات لأبرز الاستفسارات التي يطرحها شركاؤنا حول الجوانب التنظيمية والامتثال وميكانيكية العمل معنا.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? "bg-[#121828]/80 border-[#7C5CFF]/40 shadow-lg" 
                      : "bg-[#121828]/40 border-white/5 hover:border-white/10"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-6 text-right outline-none cursor-pointer"
                  >
                    <span className="font-sans font-bold text-white text-base sm:text-lg">
                      {faq.question}
                    </span>
                    <span className={`p-1.5 rounded-lg bg-white/5 text-[#AEB7CC] transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-white bg-[#7C5CFF]/15" : ""
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </button>

                  <div className={`transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-96 border-t border-white/5" : "max-h-0 pointer-events-none"
                  }`}>
                    <div className="p-6 text-sm sm:text-base text-[#AEB7CC] leading-relaxed font-sans bg-[#050816]/20">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* PREMIUM FOOTER */}
      <footer className="bg-[#050816] border-t border-white/5 relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
            
            {/* Branding Column */}
            <div className="md:col-span-5 text-right">
              <div className="flex items-center mb-4 justify-start">
                <Logo className="w-12 h-12 text-[#7C5CFF]" />
              </div>
              <p className="font-sans text-sm text-[#AEB7CC] leading-relaxed mb-6 max-w-sm">
                المستشار والذراع التقني الموثوق لبناء مسارات الأتمتة المتقدمة لجميع رواد الأعمال وصنّاع المحتوى والشركات داخل المملكة العربية السعودية وفق رؤية طموحة.
              </p>
              
              {/* Vision alignment seal */}
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl w-fit self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-sans text-[10px] text-emerald-400 font-bold">ملتزمون برفع الإنتاجية وتحقيق مستهدفات التحول الرقمي 2030</span>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 text-right">
              <h4 className="font-sans text-sm font-bold tracking-wider text-white mb-4 uppercase">الوصول السريع</h4>
              <ul className="space-y-3 font-sans text-sm text-[#AEB7CC]">
                <li><a href="#hero" className="hover:text-white transition-colors">الرئيسية</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">حلول الأفراد</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">حلول الشركات</a></li>
                <li><a href="#videos" className="hover:text-white transition-colors">العروض التوضيحية</a></li>
                <li><a href="#faqs" className="hover:text-white transition-colors">الأسئلة الشائعة</a></li>
              </ul>
            </div>

            {/* Contact Details Column */}
            <div className="md:col-span-4 text-right flex flex-col justify-start">
              <h4 className="font-sans text-sm font-bold tracking-wider text-white mb-4 uppercase">قنوات التواصل المباشر</h4>
              <div className="space-y-4">
                
                <div className="flex items-center gap-3 justify-start font-sans text-sm text-[#AEB7CC]">
                  <div className="p-2.5 rounded-lg bg-white/5 text-[#5B5CFF]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#AEB7CC]/70">هاتف الاستشارات الموحد</span>
                    <a href="tel:+966000000000" className="text-white hover:text-[#5B5CFF] transition-colors font-mono" dir="ltr">+966 00 000 0000</a>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-start font-sans text-sm text-[#AEB7CC]">
                  <div className="p-2.5 rounded-lg bg-white/5 text-[#7C5CFF]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#AEB7CC]/70">البريد الإلكتروني الرسمي</span>
                    <a href="mailto:support@tawiq.site" className="text-white hover:text-[#7C5CFF] transition-colors font-mono">support@tawiq.site</a>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-start font-sans text-sm text-[#AEB7CC]">
                  <div className="p-2.5 rounded-lg bg-white/5 text-[#3B82F6]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#AEB7CC]/70">المقر الرئيسي</span>
                    <span className="text-white">الرياض، المملكة العربية السعودية - واجهة الرياض</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <span className="font-sans text-xs text-[#AEB7CC] text-center sm:text-right">
              جميع الحقوق محفوظة © {new Date().getFullYear()} لمنصة طويق لخدمات الذكاء الاصطناعي.
            </span>

            {/* Micro Tag */}
            <div className="flex items-center gap-1 font-mono text-[9px] text-[#AEB7CC]/50 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
              <Sparkle className="w-3 h-3 text-[#7C5CFF] animate-spin" style={{ animationDuration: '4s' }} />
              Premium Saudi Tech Craftsmanship
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
}
