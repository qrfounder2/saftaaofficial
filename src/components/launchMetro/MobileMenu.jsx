import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

export default function MobileMenu({ open, onClose, links }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <div className="absolute inset-y-0 start-0 z-10 flex h-full w-[min(18rem,85vw)] max-w-full flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <img
            src="https://metrobrazil.com/cdn/shop/files/black-arabic_600x.png?v=1736164868"
            alt="مترو برازيل"
            className="h-8 object-contain"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-2 -me-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="إغلاق القائمة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-0 px-5 py-4">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={onClose}
              className="border-b border-gray-100 py-3.5 text-base font-bold last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-5 pb-8">
          <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-sm font-bold">
            <span>السعودية (عربي)</span>
            <span className="text-gray-400">▾</span>
          </div>
        </div>
      </div>
    </div>
  );
}
