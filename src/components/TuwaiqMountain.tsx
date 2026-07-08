import React, { useState, useEffect, useRef } from "react";

export default function TuwaiqMountain() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile/touch devices for performance optimization
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle Mouse movement for 3D parallax depth effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate normalized coordinates (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-950/25 bg-[#050816] group cursor-pointer transition-all duration-500 hover:border-purple-500/30"
    >
      {/* 1. Dramatic Sunset & Nebula Ambient Glow (Deep behind) */}
      <div 
        className="absolute inset-[-10%] rounded-full blur-[100px] pointer-events-none opacity-40 mix-blend-screen transition-transform duration-700 ease-out"
        style={{
          background: "radial-gradient(circle at 60% 70%, #ff6a3d 0%, #7C5CFF 45%, transparent 70%)",
          transform: isMobile 
            ? "scale(1)" 
            : `translate(calc(${mousePos.x * 25}px), calc(${mousePos.y * 25}px)) scale(1.05)`,
        }}
      ></div>

      <div 
        className="absolute inset-[-10%] rounded-full blur-[80px] pointer-events-none opacity-25 mix-blend-screen transition-transform duration-700 ease-out"
        style={{
          background: "radial-gradient(circle at 20% 30%, #3B82F6 0%, transparent 60%)",
          transform: isMobile 
            ? "scale(1)" 
            : `translate(calc(${mousePos.x * -15}px), calc(${mousePos.y * -15}px)) scale(1.05)`,
        }}
      ></div>

      {/* 2. Shimmering Loading Skeleton State */}
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-[#070b1e] flex flex-col items-center justify-center z-20 transition-opacity duration-500"
        >
          {/* Pulsing loading design matching the branding */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 rounded-full border border-purple-500/20 animate-ping"></div>
            <div className="w-16 h-16 rounded-full border border-cyan-500/30 border-t-cyan-400 animate-spin"></div>
          </div>
          <span className="font-sans text-xs text-[#AEB7CC] mt-6 tracking-widest uppercase animate-pulse">
            جاري تحميل جبل طويق...
          </span>
        </div>
      )}

      {/* 3. The Main Beautiful Pre-rendered Image of Tuwaiq Mountain */}
      <img
        src="/images/tuwaiq_mountain.webp"
        alt="جبل طويق الشامخ - Tuwaiq Mountain"
        referrerPolicy="no-referrer"
        onLoad={() => setImageLoaded(true)}
        onError={(e) => {
          e.currentTarget.src = "https://i.ibb.co/dsbqXrRD/Chat-GPT-Image-Jul-7-2026-03-28-50-AM.png";
        }}
        className={`w-full h-full object-cover select-none pointer-events-none transition-all duration-700 ease-out group-hover:scale-[1.05] ${
          imageLoaded ? "opacity-100 scale-[1.02]" : "opacity-0 scale-[1.08]"
        }`}
        style={{
          transform: isMobile 
            ? undefined 
            : `translate(calc(${mousePos.x * -12}px), calc(${mousePos.y * -12}px)) rotateX(${mousePos.y * -2}deg) rotateY(${mousePos.x * 2}deg)`,
        }}
      />

      {/* Dark overlay to ensure beautiful visual hierarchy */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-transparent to-[#050816]/40 pointer-events-none z-10"></div>
    </div>
  );
}
