import React from "react";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";

// Inline SVG social icons — always render, no broken images
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const SnapchatIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#000">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.878 4.791-4.014l.015-.015c.182-.344.211-.644.12-.868-.195-.434-.884-.658-1.332-.809-.121-.045-.24-.09-.345-.135-1.214-.39-1.333-.93-1.154-1.34.211-.42.76-.643 1.289-.643.18 0 .345.029.479.09.375.165.765.27 1.034.27.218 0 .363-.06.423-.09l-.029-.51c-.104-1.638-.225-3.679.3-4.857C7.85 1.13 11.206.793 12.206.793z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.72a8.18 8.18 0 004.78 1.52V6.79a4.85 4.85 0 01-1.01-.1z"/>
  </svg>
);

import { paymentIcons } from "../../lib/payments";

const PaymentLogos = () => {
  const methods = [
    { id: 'mada', icon: paymentIcons.mada },
    { id: 'visa', icon: paymentIcons.visa },
    { id: 'mastercard', icon: paymentIcons.mastercard },
    { id: 'applepay', icon: paymentIcons.applepay },
    { id: 'tabby', icon: paymentIcons.tabby },
    { id: 'tamara', icon: paymentIcons.tamara }
  ];

  return (
    <div className="flex items-center gap-1.5 md:gap-2 flex-nowrap justify-center md:justify-end mt-4 md:mt-0 p-1.5 sm:p-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl overflow-x-auto scrollbar-hide max-w-full">
      {methods.map(method => (
        <div key={method.id} className="shrink-0 bg-white rounded-lg flex items-center justify-center h-7 w-11 sm:h-9 sm:w-14 p-1 sm:p-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:shadow-[0_8px_15px_rgba(255,255,255,0.15)] transition-all duration-300">
          <img src={method.icon} alt={method.id} className="max-h-full max-w-full object-contain" />
        </div>
      ))}
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-background mt-10">
      {/* CTA Banner */}
      <div className="bg-gradient-to-l from-primary to-accent py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl md:text-2xl font-black text-primary-foreground mb-2">
            جاهز تتخلص من الألم؟
          </h3>
          <p className="text-primary-foreground/80 text-sm mb-4">
            اطلب الآن واستلم منتجك خلال ١-٣ أيام عمل
          </p>
          <Link
            to="/categories"
            className="inline-block bg-white text-primary px-8 py-3 rounded-full font-bold text-sm hover:bg-white/90 transition-all hover:scale-105"
          >
            تسوق الآن
          </Link>
        </div>
      </div>

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <BrandLogo className="text-white" />
            </div>
            <p className="text-sm text-background/60 leading-relaxed max-w-sm mt-3">
              الوكيل الحصري والمعتمد في المملكة العربية السعودية. منتجات صحية أصلية 100٪ مسجلة ومعتمدة من هيئة الغذاء والدواء (SFDA).
            </p>
            
            {/* Saudi Business Trust Badge */}
            <div className="mt-5 mb-8 relative group w-fit">
              {/* Animated glowing border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-300 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              <div className="relative inline-flex items-center gap-3.5 bg-white rounded-xl p-3 pr-5 shadow-xl border border-emerald-100 cursor-default overflow-hidden">
                
                {/* Ribbon/Sash decoration */}
                <div className="absolute top-0 right-4 w-4 h-5 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-b-md shadow-sm"></div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center shrink-0 border border-emerald-100 shadow-inner">
                    <svg className="w-6 h-6 text-emerald-600 drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  {/* Ping animation on the checkmark badge */}
                  <div className="absolute -bottom-1 -left-1">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                    <div className="relative w-5 h-5 bg-gradient-to-tr from-emerald-500 to-emerald-400 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="text-right z-10">
                  <div className="flex items-center gap-1.5 justify-end mb-0.5">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <p className="text-[16px] font-black text-transparent bg-clip-text bg-gradient-to-l from-slate-800 to-slate-600 tracking-tight">متجر موثق</p>
                  </div>
                  <div className="flex items-center justify-end gap-1.5 text-[11px] text-slate-500 font-bold">
                    <span>المركز السعودي للأعمال</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="font-mono">س.ت 1010654321</span>
                  </div>
                </div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite] transform skew-x-[-20deg]"></div>
              </div>
            </div>

            {/* Official KSA Numbers */}
            <div className="text-[11px] text-background/50 space-y-2 mb-5">
              <p>السجل التجاري: 1010654321</p>
              <p>الرقم الضريبي: 310123456700003</p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              <a href="https://wa.me/966501234567" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center hover:opacity-90 transition-opacity">
                <WhatsAppIcon />
              </a>
              <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#FFFC00] flex items-center justify-center hover:opacity-90 transition-opacity">
                <SnapchatIcon />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-black flex items-center justify-center hover:opacity-80 transition-opacity">
                <TikTokIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm">روابط سريعة</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-background/60 hover:text-background transition-colors">الرئيسية</Link></li>
              <li><Link to="/categories" className="text-sm text-background/60 hover:text-background transition-colors">المنتجات</Link></li>
              <li><a href="#faq" className="text-sm text-background/60 hover:text-background transition-colors">أسئلة شائعة</a></li>
            </ul>
          </div>

          <div id="contact">
            <h4 className="font-bold mb-4 text-sm">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-background/60">
                <WhatsAppIcon />
                <span dir="ltr">+966 50 123 4567</span>
              </li>
              <li className="text-sm text-background/60">المملكة العربية السعودية</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-xs text-background/40">
              © {new Date().getFullYear()} صفتا — جميع الحقوق محفوظة
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-background/30 font-medium">
              <span>صنع بحب في السعودية</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                مشغل بواسطة <img src="https://cdn.salla.network/images/logo/logo-light.svg" alt="Salla" className="h-3 opacity-50 hover:opacity-100 transition-opacity" onError={(e) => { e.target.outerHTML = '<span class="font-bold text-[#bdf2cb]">سلة</span>' }} />
              </span>
            </div>
          </div>
          <PaymentLogos />
        </div>
      </div>
    </footer>
  );
}