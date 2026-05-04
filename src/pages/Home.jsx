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
      title: "منتجات مصرحة وآمنة",
      desc: "تخضع لأعلى معايير الجودة والسلامة",
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
      title: "دعم فني مستمر",
      desc: "فريق سعودي مختص لخدمتك بعد البيع",
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
    <section className="py-8 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] relative overflow-hidden"
        >
          {/* Subtle Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
          
          <div className="flex items-center justify-center gap-2 mb-4 mt-1">
            <div className="bg-orange-50 border border-orange-100 rounded-md px-2.5 py-1 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path>
              </svg>
              <span className="text-[11px] font-bold text-orange-700 tracking-wide">المنتج الأكثر طلباً لهذا الأسبوع</span>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-3">
            عرض خاص لفترة محدودة — خصم حصري يصل إلى ٤٠٪
          </h3>
          <p className="text-sm text-slate-500 mb-6 font-medium">
            يتم توفير الكميات بشكل دوري من المستودع المركزي. اطلب الآن لضمان السعر الحالي.
          </p>
          <Link
            to="/categories"
            className="inline-block bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-md hover:shadow-lg"
          >
            تصفح المنتجات المتاحة
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