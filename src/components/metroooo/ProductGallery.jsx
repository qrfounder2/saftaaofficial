import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRef = useRef(null);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="w-full">
      {/* Main image */}
      <div className="relative aspect-[3/4] bg-white overflow-hidden">
        <img
          src={images[activeIndex]}
          alt="صورة المنتج"
          className="w-full h-full object-contain"
        />
        {/* Navigation arrows */}
        <button
          onClick={goNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={goPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails row */}
      <div ref={thumbRef} className="flex gap-2 mt-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex-shrink-0 w-[60px] h-[60px] rounded-md overflow-hidden border-2 transition-all ${
              index === activeIndex ? 'border-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}