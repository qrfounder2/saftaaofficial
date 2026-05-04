import React from "react";
import HeroSlider from "../components/store/HeroSlider";
import TrustBar from "../components/store/TrustBar";
import CategoriesSection from "../components/store/CategoriesSection";
import TrendingProducts from "../components/store/TrendingProducts";
import Testimonials from "../components/store/Testimonials";
import FAQ from "../components/store/FAQ";
import { motion } from "framer-motion";
import { Shield, Truck, Headset, Banknote, Leaf, Zap, Award } from "lucide-react";
import { Link } from "react-router-dom";
function WhyUsSection() {
  const reasons = [
    {
      icon: (
        <Shield className="w-8 h-8 text-black opacity-80" />
      ),
      title: "أدوية مرخصة ومضمونة",
      desc: "جميع منتجاتنا مصرحة ومضمونة 100%",
      bg: "bg-gray-50",
    },
    {
      icon: (
        <Truck className="w-8 h-8 text-black opacity-80" />
      ),
      title: "توصيل مبرد آمن",
      desc: "نضمن وصول منتجاتك بأعلى معايير الجودة",
      bg: "bg-gray-50",
    },
    {
      icon: (
        <Headset className="w-8 h-8 text-black opacity-80" />
      ),
      title: "صيدلي متواجد ٢٤/٧",
      desc: "استشارات صيدلانية مجانية على مدار الساعة",
      bg: "bg-gray-50",
    },
    {
      icon: (
        <Award className="w-8 h-8 text-black opacity-80" />
      ),
      title: "أفضل الأسعار",
      desc: "توفير أكبر وعروض مستمرة على المنتجات",
      bg: "bg-gray-50",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-black bg-gray-100 px-4 py-1.5 rounded-full border border-gray-200">
            لماذا تتسوق من صفتا؟
          </span>
          <h2 className="text-2xl md:text-4xl font-black mt-4">
            معايير صيدلانية عالمية
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl elegant-surface hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-gray-200 text-black shadow-sm`}>
                {r.icon}
              </div>
              <h3 className="font-bold mb-1 text-black">{r.title}</h3>
              <p className="text-sm text-gray-500">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UrgencyBanner() {
  return (
    <section className="py-8 bg-gray-50 border-y border-gray-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden"
        >
          {/* Animated Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
            <motion.div 
              initial={{ width: "100%" }}
              whileInView={{ width: "15%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              className="h-full bg-black"
            />
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-3 mt-2">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </div>
            <span className="text-xs font-bold text-gray-900 tracking-wide">طلب عالي الآن</span>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-black mb-2">
            عرض خاص لفترة محدودة — خصم حصري يصل إلى ٤٠٪
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            الكمية محدودة جداً — متبقي ١٥٪ فقط من الكمية المخصصة للعرض
          </p>
          <Link
            to="/categories"
            className="inline-block bg-black text-white px-8 py-3.5 rounded-full font-black text-base hover:bg-gray-800 transition-all hover:scale-105 shadow-lg shadow-black/10"
          >
            استفد من العرض الآن
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSlider />
      <TrustBar />
      <CategoriesSection />
      <TrendingProducts />
      <WhyUsSection />
      <UrgencyBanner />
      <Testimonials />
      <div id="faq">
        <FAQ />
      </div>
    </>
  );
}