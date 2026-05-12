import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function ProductGallery({ images = [] }) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) return null;

  const goNext = () => setSelected(prev => (prev + 1) % images.length);
  const goPrev = () => setSelected(prev => (prev - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col-reverse lg:flex-row-reverse gap-3">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] pb-1 lg:pb-0">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`flex-shrink-0 w-16 h-20 lg:w-20 lg:h-24 rounded-lg overflow-hidden border-2 transition-all ${
              selected === i ? 'border-foreground' : 'border-transparent opacity-60 hover:opacity-90'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 bg-secondary rounded-2xl overflow-hidden aspect-[3/4] lg:aspect-auto lg:min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={selected}
            src={images[selected]}
            alt="Product"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={goNext}
              className="absolute top-1/2 left-2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
          {selected + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}