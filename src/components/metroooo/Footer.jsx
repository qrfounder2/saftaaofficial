import React from 'react';
import { Globe } from 'lucide-react';

const quickLinks = ['المدونة', 'من نحن', 'تواصل معنا', 'الكتالوج', 'دليل المنتجات'];
const infoLinks = ['الوظائف', 'تتبع الطلبات', 'عملاء VIP', 'التسويق بالعمولة', 'برنامج سفراء مترو برازيل'];
const policyLinks = ['الأسئلة المتكررة', 'سياسة الخصوصية', 'شروط الخدمة', 'سياسة الشحن', 'الاستبدال والاسترجاع'];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-8">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="https://metrobrazil.com/cdn/shop/files/black-arabic_600x.png?v=1736164868"
            alt="مترو برازيل"
            className="h-12 object-contain"
          />
        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-5 mb-8">
          {[
            { label: 'YouTube', icon: '▶' },
            { label: 'Facebook', icon: 'f' },
            { label: 'X', icon: '𝕏' },
            { label: 'LinkedIn', icon: 'in' },
            { label: 'TikTok', icon: '♪' },
            { label: 'Instagram', icon: '📷' },
            { label: 'Snapchat', icon: '👻' },
            { label: 'Pinterest', icon: 'P' },
          ].map((s) => (
            <a key={s.label} href="#" className="text-lg font-bold hover:opacity-60 transition-opacity" title={s.label}>
              {s.icon}
            </a>
          ))}
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
          <div>
            <h3 className="font-black text-lg mb-4">روابط سريعة</h3>
            {quickLinks.map((link) => (
              <p key={link} className="py-1.5 text-sm hover:underline cursor-pointer">{link}</p>
            ))}
          </div>
          <div>
            <h3 className="font-black text-lg mb-4">المعلومات</h3>
            {infoLinks.map((link) => (
              <p key={link} className="py-1.5 text-sm hover:underline cursor-pointer">{link}</p>
            ))}
          </div>
          <div>
            <h3 className="font-black text-lg mb-4">السياسات</h3>
            {policyLinks.map((link) => (
              <p key={link} className="py-1.5 text-sm hover:underline cursor-pointer">{link}</p>
            ))}
          </div>
        </div>

        {/* App Store badges */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred_2x.png" alt="App Store" className="h-10 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10 object-contain" />
        </div>

        {/* Country selector */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Globe className="w-5 h-5" />
          <span className="font-bold">الدولة و اللغة</span>
        </div>
        <div className="flex justify-center mb-8">
          <div className="border border-border rounded-lg px-6 py-2 text-sm font-medium">
            السعودية (عربي) ▾
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 مترو برازيل
          </p>
          <p className="text-center text-xs text-muted-foreground mt-1">
            تطوير RIO TECH
          </p>
        </div>

        {/* Payment icons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {['VISA', 'Mastercard', 'Apple Pay', 'G Pay', 'mada', 'KNET', 'tabby', '●●'].map((m) => (
            <span key={m} className="px-3 py-1.5 border border-border rounded-lg text-xs font-bold">
              {m}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}