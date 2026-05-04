import React from "react";

export default function BrandLogo({ className = "" }) {
  // Automatically fallback to our signature deep emerald if no text color is provided
  const colorClass = className.includes('text-') ? className : `text-[#064E3B] ${className}`;

  return (
    <div className={`flex items-center justify-center gap-2.5 md:gap-3 ${colorClass}`}>
      {/* 
        Expert Brand Mark: The "Exploded Care Hub" 
        A highly distinctive, authoritative, and minimalist cross 
        where 4 pillars converge into a bright emerald center. 
      */}
      <div className="relative flex items-center justify-center shrink-0 w-7 h-7 md:w-8 md:h-8 transition-transform hover:scale-105">
        <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer converging pillars */}
          <rect x="16" y="2" width="8" height="10" rx="1.5" fill="currentColor" />
          <rect x="16" y="28" width="8" height="10" rx="1.5" fill="currentColor" />
          <rect x="2" y="16" width="10" height="8" rx="1.5" fill="currentColor" />
          <rect x="28" y="16" width="10" height="8" rx="1.5" fill="currentColor" />
          {/* The glowing "Hub" core */}
          <rect x="14.5" y="14.5" width="11" height="11" rx="2.5" fill="#10B981" />
        </svg>
      </div>

      <div className="flex flex-col justify-center">
        {/* Strong, blocky, highly trusted typography */}
        <span 
          className="text-[26px] md:text-[32px] font-black leading-none pt-1" 
          style={{ fontFamily: '"Cairo", sans-serif', letterSpacing: '-0.02em' }}
        >
          صفتا
        </span>
      </div>
    </div>
  );
}