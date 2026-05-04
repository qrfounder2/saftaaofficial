import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "الوكيل الحصري",
    subtitle: "في السعودية 🇸🇦",
    desc: "احذروا التقليد! نحن الموزع المعتمد والوحيد لمنتجاتنا الأصلية المسجلة في هيئة الغذاء والدواء (SFDA).",
    cta: "اطلب المنتج الأصلي",
    badge: "توثيق المركز السعودي للأعمال",
    image: "/images/hero/hero-1.svg",
    gradient: "from-emerald-50/80 to-gray-100",
  },
  {
    id: 2,
    title: "منتجات أصلية",
    subtitle: "مضمونة 100%",
    desc: "نضمن لك استرجاع نقودك بالكامل إذا ثبت أن المنتج غير أصلي. تسوق بأمان من المتجر الرسمي.",
    cta: "تصفح المنتجات الموثقة",
    badge: "شحن مبرد ومعتمد",
    image: "/images/hero/hero-2.svg",
    gradient: "from-gray-100 to-emerald-50/80",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            {/* Text Content */}
            <div className="order-2 md:order-1 text-center md:text-right">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block bg-accent/15 text-accent-foreground px-4 py-1.5 rounded-full text-xs font-bold mb-4 glow-ring"
              >
                {slide.badge}
              </motion.span>

              <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight mb-2">
                {slide.title}
                <span className="block text-primary">{slide.subtitle}</span>
              </h1>

              <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0">
                {slide.desc}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link
                  to="/categories"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl text-base font-black hover:bg-slate-800 transition-all hover:-translate-y-1 shadow-lg shadow-slate-900/20"
                >
                  {slide.cta}
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span className="flex -space-x-2 -space-x-reverse">
                    {[
                      "/images/reviews/saudi-man-1.webp",
                      "/images/reviews/saudi-woman-1.webp",
                      "/images/reviews/saudi-man-2.webp",
                      "/images/reviews/saudi-woman-2.webp",
                    ].map((src, i) => (
                      <img key={i} src={src} alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                    ))}
                  </span>
                  <span className="font-medium">+٥٠ ألف عميل راضي</span>
                  <div className="flex">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className="text-yellow-400 text-xs">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 md:order-2 relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} rounded-3xl`} />
              <img
                src={slide.image}
                alt={slide.title}
                className="relative w-full h-[280px] md:h-[450px] object-cover rounded-3xl elegant-surface"
              />
              {/* Floating trust badge - Hyper Realistic Official Style */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/50 elegant-surface"
              >
                <div className="flex items-center gap-3">
                  {/* Highly realistic green seal */}
                  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)]"></div>
                    <div className="absolute inset-[2px] border border-white/40 rounded-full border-dashed"></div>
                    <svg className="w-6 h-6 text-white drop-shadow-md z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-emerald-600 tracking-wider mb-0.5">موثق ومعتمد</span>
                    <p className="text-sm font-black text-slate-800 leading-tight">هيئة الغذاء والدواء</p>
                    <p className="text-[10px] text-slate-500 font-medium">المملكة العربية السعودية</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-primary" : "w-2 bg-primary/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}