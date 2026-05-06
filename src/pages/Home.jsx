import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ticker = [
  "شحن مجاني لجميع مناطق المملكة",
  "الدفع عند الاستلام متاح",
  "منتجات أصلية ومضمونة",
  "خصم حصري لفترة محدودة",
  "شحن سريع خلال ٢٤ ساعة",
  "ضمان استرداد كامل",
  "شحن مجاني لجميع مناطق المملكة",
  "الدفع عند الاستلام متاح",
  "منتجات أصلية ومضمونة",
  "خصم حصري لفترة محدودة",
  "شحن سريع خلال ٢٤ ساعة",
  "ضمان استرداد كامل",
];

export default function Home() {
  return (
    <div dir="rtl">
      {/* ── Hero ── */}
      <section className="relative h-[88vh] md:h-screen overflow-hidden bg-gray-900">
        {/* Background */}
        <img
          src="/images/products/almaral-miracle-hero.png"
          alt="صفتا كير"
          fetchpriority="high"
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/products/almaral-premium.png";
          }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient overlay — dark at bottom, lighter at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Content — bottom-center on mobile, center on desktop */}
        <div className="absolute inset-0 flex items-end md:items-center justify-center pb-16 md:pb-0">
          <div className="text-center text-white px-6 max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/60 mb-3"
            >
              عروض حصرية · صفتا كير
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black leading-[1.05] mb-4 tracking-tight"
            >
              تخلص من
              <br />
              الألم نهائياً
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-sm md:text-base text-white/70 font-medium mb-8"
            >
              خصم يصل إلى ٤٠٪ على جميع المنتجات لفترة محدودة
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Link
                to="/categories"
                className="inline-block bg-white text-black px-12 py-4 text-sm font-black tracking-[0.2em] uppercase hover:bg-gray-100 active:scale-95 transition-all duration-150"
              >
                تسوق الآن
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Scrolling ticker ── */}
      <div className="bg-black text-white py-3 overflow-hidden select-none">
        {/* Duplicate the list so the loop is visually seamless */}
        <div className="flex animate-ticker whitespace-nowrap">
          {[...ticker, ...ticker].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 px-4 text-[11px] md:text-xs font-bold tracking-wider"
            >
              {item}
              <span className="text-white/25 text-base font-thin">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
