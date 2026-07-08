import { HTMLAttributes } from "react";

export default function Logo({ className = "w-10 h-10", showText = true, textClassName = "", ...props }: HTMLAttributes<HTMLImageElement> & { showText?: boolean; textClassName?: string }) {
  return (
    <div className="flex items-center gap-3">
      {/* Tuwaiq Custom Logo Image */}
      <img
        src="/images/logo.webp"
        alt="طويق للذكاء الاصطناعي"
        referrerPolicy="no-referrer"
        className={`${className} object-contain transition-all duration-300 hover:scale-105`}
        onError={(e) => {
          e.currentTarget.src = "https://i.ibb.co/F4C3GMcP/Chat-GPT-Image-Jun-29-2026-04-37-56-AM.png";
        }}
        {...props}
      />
      
      {showText && (
        <div className="flex flex-col text-right">
          <span className={`font-sans font-bold text-lg sm:text-xl text-white tracking-wide select-none ${textClassName}`}>
            طويق
          </span>
          <span className="font-sans text-[10px] sm:text-xs text-[#7C5CFF] font-semibold -mt-1 tracking-wider">
            لخدمات الذكاء الاصطناعي
          </span>
        </div>
      )}
    </div>
  );
}
