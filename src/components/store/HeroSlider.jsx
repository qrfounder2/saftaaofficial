import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "دهان المرال",
    subtitle: "المعجزة",
    desc: "الخلاص النهائي لخشونة الركبة وعرق النسا. تركيبة طبيعية متطورة لتسكين عميق وفوري بدون أثر دهني.",
    cta: "اطلب المرال الآن",
    badge: "المنتج الأكثر مبيعاً",
    image: "/images/products/almaral-premium.png",
    gradient: "from-emerald-50/80 to-gray-100",
    features: ["تسكين فوري", "امتصاص سريع"]
  },
  {
    id: 2,
    title: "ريليف آكتيف",
    subtitle: "لآلام الديسك",
    desc: "جل التبريد العلاجي لاختراق عميق لآلام أسفل الظهر وتشنجات العضلات. راحة تدوم طويلاً.",
    cta: "تخلص من ألم الظهر",
    badge: "تقنية التبريد النشط",
    image: "/images/products/lumbar-spine-premium.png",
    gradient: "from-blue-50/80 to-slate-100",
    features: ["تبريد علاجي", "يرخي العضلات"]
  },
  {
    id: 3,
    title: "سم النحل الملكي",
    subtitle: "للروماتيزم",
    desc: "مرهم متطور بخلاصة ببتيدات سم النحل للقضاء على آلام المفاصل والنقرس. الخيار الأول لكبار السن.",
    cta: "اطلب سم النحل",
    badge: "موصى به لكبار السن",
    image: "/images/products/bee-venom-premium.png",
    gradient: "from-amber-50/80 to-orange-50/50",
    features: ["مضاد للالتهاب", "آمن للبشرة"]
  },
  {
    id: 4,
    title: "جوارب التورمالين",
    subtitle: "الحرارية",
    desc: "تقنية العلاج الانعكاسي ذاتية التسخين. تنشط الدورة الدموية وتخفف آلام الأطراف وترفع الطاقة.",
    cta: "اطلب الجوارب الذكية",
    badge: "تنشيط الدورة الدموية",
    image: "/images/products/tourmaline-socks-premium.png",
    gradient: "from-rose-50/80 to-slate-100",
    features: ["ذاتية التسخين", "مساج انعكاسي"]
  }
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
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                {slide.badge}
              </motion.div>

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
                <div className="flex items-center justify-center gap-3 mt-4 sm:mt-0 sm:mr-4 border-t sm:border-t-0 sm:border-r border-slate-200/60 pt-4 sm:pt-0 sm:pr-4">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-sm" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[11px] font-black text-slate-800 leading-tight mb-0.5">الخيار الأول والموثوق</span>
                    <span className="text-[10px] font-bold text-slate-500">في المملكة العربية السعودية</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 md:order-2 relative h-[320px] md:h-[480px] rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-200/50 group">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Inner shadow/gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"></div>
              
              {/* Floating Features - Top Left */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/90 backdrop-blur-xl rounded-2xl p-2.5 md:p-3 shadow-lg border border-white/60"
              >
                <div className="flex flex-col gap-2">
                  {slide.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100/50">
                        <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-[11px] md:text-xs font-black text-slate-800 tracking-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating trust badge - Bottom Right */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white/95 backdrop-blur-xl rounded-2xl p-3 md:p-4 shadow-2xl border border-white/60"
              >
                <div className="flex items-center gap-2.5 md:gap-3">
                  {/* Highly realistic golden/green seal */}
                  <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 rounded-full shadow-[0_2px_10px_rgba(16,185,129,0.4)]"></div>
                    <div className="absolute inset-[2px] border border-white/40 rounded-full border-dashed"></div>
                    <div className="absolute inset-[4px] bg-gradient-to-tr from-emerald-400 to-emerald-500 rounded-full"></div>
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white drop-shadow-md z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] md:text-[10px] font-black text-emerald-600 tracking-wider mb-0.5 uppercase">VERIFIED & APPROVED</span>
                    <p className="text-xs md:text-sm font-black text-slate-800 leading-none mb-0.5">منتج أصلي ومصرح</p>
                    <p className="text-[9px] md:text-[10px] text-slate-500 font-bold">بأعلى معايير الجودة</p>
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