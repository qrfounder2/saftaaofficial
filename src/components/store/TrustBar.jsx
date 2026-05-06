import React from "react";
import { motion } from "framer-motion";

import { ShieldCheck, Truck, Banknote, HeadphonesIcon } from "lucide-react";

const features = [
  { 
    icon: <ShieldCheck className="w-6 h-6 text-emerald-600 group-hover:text-emerald-700 transition-colors" />,  
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    label: "منتجات أصلية ومضمونة",          
    desc: "مصرحة ومطابقة للمواصفات السعودية" 
  },
  { 
    icon: <Truck className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />,    
    bg: "bg-blue-50",
    border: "border-blue-100",
    label: "شحن سريع وموثوق",  
    desc: "لجميع مدن ومناطق المملكة" 
  },
  { 
    icon: <Banknote className="w-6 h-6 text-purple-600 group-hover:text-purple-700 transition-colors" />, 
    bg: "bg-purple-50",
    border: "border-purple-100",
    label: "الدفع عند الاستلام متاح",         
    desc: "تسوق بكل ثقة، وادفع فقط عند استلام طلبك" 
  },
  { 
    icon: <HeadphonesIcon className="w-6 h-6 text-orange-600 group-hover:text-orange-700 transition-colors" />,  
    bg: "bg-orange-50",
    border: "border-orange-100",
    label: "خدمة عملاء متميزة",        
    desc: "دعم فني جاهز لخدمتك والرد على استفساراتك" 
  },
];

export default function TrustBar() {
  return (
    <section className="py-8 relative overflow-hidden bg-gradient-to-b from-white to-slate-50/80 border-y border-slate-200/60">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-x-reverse divide-slate-200/60">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center text-center lg:items-start lg:text-right gap-4 lg:px-8 first:lg:pl-0 last:lg:pr-0 group cursor-default"
            >
              <div className="relative">
                <div className={`absolute inset-0 rounded-full blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-500 ${f.bg}`}></div>
                <div className={`relative w-14 h-14 rounded-full ${f.bg} flex items-center justify-center shrink-0 shadow-sm border ${f.border} group-hover:scale-110 group-hover:shadow-md transition-all duration-300 ease-out`}>
                  {f.icon}
                </div>
              </div>
              <div>
                <p className="text-[15px] font-extrabold text-slate-800 leading-tight mb-1.5 group-hover:text-emerald-700 transition-colors">{f.label}</p>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}