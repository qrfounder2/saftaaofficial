import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRef = useRef(null);
  const list = Array.isArray(images) ? images : [];
  const hasMultiple = list.length > 1;

  useEffect(() => {
    setActiveIndex((i) => (list.length ? Math.min(i, list.length - 1) : 0));
  }, [list.length]);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % list.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + list.length) % list.length);

  if (!list.length) {
    return (
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted" dir="rtl" aria-hidden />
    );
  }

  return (
    <div className="w-full" dir="rtl">
      {/* Main image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-white">
        <img
          src={list[activeIndex]}
          alt="صورة المنتج"
          className="h-full w-full object-contain"
        />
        {hasMultiple ? (
          <>
            <button
              type="button"
              onClick={goNext}
              className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goPrev}
              className="absolute start-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </div>

      {hasMultiple ? (
        <div ref={thumbRef} className="mt-3 flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {list.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`flex-shrink-0 w-[60px] h-[60px] rounded-md overflow-hidden border-2 transition-all ${
                index === activeIndex ? "border-primary opacity-100" : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}