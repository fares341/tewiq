import React, { useState, useEffect, useRef } from "react";

export default function TuwaiqMountain() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768 || (navigator && navigator.maxTouchPoints > 0);
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile/touch devices to completely skip heavy GPU animations & calculations
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || (navigator && navigator.maxTouchPoints > 0));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle Mouse movement for 3D parallax depth effect (Desktop Only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // STRICT PERFORMANCE FIX: Instantly render a basic static optimized WebP image block on mobile/tablets
  if (isMobile) {
    return (
      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 bg-[#050816]">
        <img
          src="/images/tuwaiq_mountain.webp"
          alt="جبل طويق الشامخ - Tuwaiq Mountain"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none pointer-events-none"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://i.ibb.co/dsbqXrRD/Chat-GPT-Image-Jul-7-2026-03-28-50-AM.png";
          }}
        />
        {/* Simple dark gradient overlay for visual contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/95 via-transparent to-[#050816]/30 pointer-events-none z-10"></div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-950/25 bg-[#050816] group cursor-pointer transition-all duration-500 lg:hover:border-purple-500/30"
    >
      {/* 1. Dramatic Sunset & Nebula Ambient Glow (Deep behind) - Completely Disabled on Mobile */}
      <div 
        className="absolute inset-[-10%] rounded-full lg:blur-[100px] md:blur-[60px] blur-[35px] pointer-events-none opacity-40 mix-blend-screen transition-transform duration-700 ease-out"
        style={{
          background: "radial-gradient(circle at 60% 70%, #ff6a3d 0%, #7C5CFF 45%, transparent 70%)",
          transform: `translate(calc(${mousePos.x * 25}px), calc(${mousePos.y * 25}px)) scale(1.05)`,
        }}
      ></div>

      <div 
        className="absolute inset-[-10%] rounded-full lg:blur-[80px] md:blur-[50px] blur-[25px] pointer-events-none opacity-25 mix-blend-screen transition-transform duration-700 ease-out"
        style={{
          background: "radial-gradient(circle at 20% 30%, #3B82F6 0%, transparent 60%)",
          transform: `translate(calc(${mousePos.x * -15}px), calc(${mousePos.y * -15}px)) scale(1.05)`,
        }}
      ></div>

      {/* 2. Shimmering Loading Skeleton State */}
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-[#070b1e] flex flex-col items-center justify-center z-20 transition-opacity duration-300"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 rounded-full border border-purple-500/20 animate-ping"></div>
            <div className="w-16 h-16 rounded-full border border-cyan-500/30 border-t-cyan-400 animate-spin"></div>
          </div>
        </div>
      )}

      {/* 3. The Main Beautiful Pre-rendered Image of Tuwaiq Mountain */}
      <img
        src="/images/tuwaiq_mountain.webp"
        alt="جبل طويق الشامخ - Tuwaiq Mountain"
        referrerPolicy="no-referrer"
        onLoad={() => setImageLoaded(true)}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "https://i.ibb.co/dsbqXrRD/Chat-GPT-Image-Jul-7-2026-03-28-50-AM.png";
        }}
        className={`w-full h-full object-cover select-none pointer-events-none transition-all duration-500 ${
          imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
        }`}
        style={{
          transform: `translate(calc(${mousePos.x * -12}px), calc(${mousePos.y * -12}px)) rotateX(${mousePos.y * -2}deg) rotateY(${mousePos.x * 2}deg)`,
        }}
      />

      {/* Dark overlay to ensure beautiful visual hierarchy */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-transparent to-[#050816]/40 pointer-events-none z-10"></div>
    </div>
  );
}
