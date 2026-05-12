import React from "react";
import PaymentMethods from "@/components/metroooo/PaymentMethods";

const QUICK_LINKS = ["من نحن", "تواصل معنا", "الكتالوج"];
const INFO_LINKS = ["الوظائف", "تتبع الطلبات", "عملاء VIP"];
const POLICY_LINKS = ["الأسئلة المتكررة", "سياسة الخصوصية", "شروط الخدمة", "سياسة الشحن", "الاستبدال والاسترجاع"];

const Section = ({ title, links }) => (
  <div className="text-center">
    <h4 className="font-black text-base mb-4">{title}</h4>
    {links.map((l) => (
      <p
        key={l}
        className="text-sm text-gray-500 py-1.5 hover:text-black cursor-pointer transition-colors"
      >
        {l}
      </p>
    ))}
  </div>
);

export default function MetroLaunchFooter() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-10 sm:mt-12">
      <div className="layout-wide py-10 sm:py-12 md:py-14">
        <div className="flex justify-center mb-6">
          <img
            src="https://metrobrazil.com/cdn/shop/files/black-arabic_600x.png?v=1736164868"
            alt="مترو برازيل"
            className="h-8 w-auto max-w-[132px] object-contain sm:h-9 sm:max-w-[148px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <Section title="روابط سريعة" links={QUICK_LINKS} />
          <Section title="المعلومات" links={INFO_LINKS} />
          <Section title="السياسات" links={POLICY_LINKS} />
        </div>

        <div className="flex items-center justify-center gap-3 mb-8">
          <img
            src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred_2x.png"
            alt="App Store"
            className="h-9 object-contain"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="h-9 object-contain"
          />
        </div>

        <div className="border-t border-gray-100 pt-6 text-center">
          <p className="text-sm text-gray-400 font-medium">© 2026 مترو برازيل</p>
        </div>

        <div className="mt-6 py-2">
          <PaymentMethods />
        </div>
      </div>
    </footer>
  );
}
