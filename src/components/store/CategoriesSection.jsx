import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { Pill, Heart, Activity, Stethoscope, Droplets, ShieldPlus } from "lucide-react";

const categories = [
  { name: "الأدوية والعلاجات", slug: "medication", icon: <Pill className="w-10 h-10 md:w-12 md:h-12 text-black opacity-80" /> },
  { name: "فيتامينات ومكملات", slug: "vitamins", icon: <Heart className="w-10 h-10 md:w-12 md:h-12 text-black opacity-80" /> },
  { name: "العناية الشخصية", slug: "personal-care", icon: <Activity className="w-10 h-10 md:w-12 md:h-12 text-black opacity-80" /> },
  { name: "أجهزة طبية", slug: "devices", icon: <Stethoscope className="w-10 h-10 md:w-12 md:h-12 text-black opacity-80" /> },
  { name: "العناية بالبشرة", slug: "skincare", icon: <Droplets className="w-10 h-10 md:w-12 md:h-12 text-black opacity-80" /> },
  { name: "إسعافات أولية", slug: "first-aid", icon: <ShieldPlus className="w-10 h-10 md:w-12 md:h-12 text-black opacity-80" /> },
];

export default function CategoriesSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-accent bg-accent/10 px-4 py-1.5 rounded-full">
            تسوّق حسب المشكلة
          </span>
          <h2 className="text-2xl md:text-4xl font-black mt-4">تسوّق حسب القسم</h2>
          <p className="text-muted-foreground mt-2 text-sm">أقسام صيدلية متكاملة لتلبية جميع احتياجاتك الصحية</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/categories?cat=${cat.slug}`}
                className="block text-center p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                <p className="relative text-sm font-bold text-slate-800">{cat.name}</p>
                <ArrowLeft className="relative w-4 h-4 mx-auto mt-2 text-slate-400 group-hover:text-black transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}