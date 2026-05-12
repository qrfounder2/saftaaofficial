import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, Flame, Truck, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import BrandLogo from "./BrandLogo";
import { metroWhatsAppUrl } from "@/lib/metroWa";

// Counts down to tonight at midnight (KSA = UTC+3).
// Resets every day — feels like a real daily deal deadline.
function useCountdown() {
  const [time, setTime] = useState({ h: "00", m: "00", s: "00" });
  useEffect(() => {
    function getMidnight() {
      const now = new Date();
      // KSA offset: UTC+3
      const ksa = new Date(now.getTime() + 3 * 60 * 60 * 1000);
      const midnight = new Date(ksa);
      midnight.setUTCHours(21, 0, 0, 0); // 21:00 UTC = 00:00 KSA next day
      if (midnight.getTime() <= now.getTime()) {
        midnight.setUTCDate(midnight.getUTCDate() + 1);
      }
      return midnight.getTime();
    }
    function tick() {
      const diff = Math.max(0, getMidnight() - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// Rotates between messages every 3.5 s — icon + text pairs
const BAR_MESSAGES = [
  {
    icon: <Flame className="w-3.5 h-3.5 shrink-0 text-orange-400" strokeWidth={2} />,
    text: "تبقّت آخر الكميات — الطلبات تتزايد الآن",
  },
  {
    icon: <Truck className="w-3.5 h-3.5 shrink-0 text-sky-300" strokeWidth={2} />,
    text: "توصيل مجاني + الدفع عند الاستلام لجميع مناطق المملكة",
  },
  {
    icon: <Clock className="w-3.5 h-3.5 shrink-0 text-yellow-300" strokeWidth={2} />,
    text: "سعر العرض ينتهي الليلة منتصف الليل",
  },
];

function useRotatingMessage(messages, interval = 3500) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % messages.length);
        setVisible(true);
      }, 350);
    }, interval);
    return () => clearInterval(id);
  }, [messages, interval]);
  return { message: messages[idx], visible };
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const countdown = useCountdown();
  const { message, visible } = useRotatingMessage(BAR_MESSAGES);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "الرئيسية", href: "/" },
    { label: "المنتجات", href: "/categories" },
    { label: "آلام الظهر", href: "/categories?cat=back" },
    { label: "آلام الركبة", href: "/categories?cat=knee" },
    { label: "تواصل معنا", href: metroWhatsAppUrl() },
  ];

  return (
    <>
      {/* ── Announcement bar ── */}
      <div className="bg-black text-white py-2.5 px-4" dir="rtl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* Left spacer (desktop only) — keeps message centered */}
          <div className="hidden md:flex items-center gap-1.5 shrink-0" dir="ltr">
            <span className="text-white/40 text-[10px] font-bold tracking-wider">ينتهي الليلة</span>
            <span className="text-[11px] font-black tabular-nums text-white/80">
              {countdown.h}:{countdown.m}:{countdown.s}
            </span>
          </div>

          {/* Rotating message — center */}
          <div className="flex-1 flex justify-center overflow-hidden h-5">
            <div
              className="flex items-center gap-2 transition-all duration-300 whitespace-nowrap"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(6px)" }}
            >
              {message.icon}
              <span className="text-[11px] md:text-xs font-bold">{message.text}</span>
            </div>
          </div>

          {/* Right — countdown on mobile, CTA on desktop */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile: compact countdown only */}
            <span className="md:hidden text-[11px] font-black tabular-nums text-white/80">
              {countdown.h}:{countdown.m}:{countdown.s}
            </span>
            {/* Desktop: shop link */}
            <Link
              to="/categories"
              className="hidden md:inline-flex items-center gap-1 bg-white text-black text-[10px] font-black px-3 py-1 rounded-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              اطلب الآن
            </Link>
          </div>

        </div>
      </div>

      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/85 backdrop-blur-md shadow-sm border-b border-border/60"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <BrandLogo className="text-black" />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                link.href.startsWith("http") ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                  </Link>
                )
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/categories"
                className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold hover:bg-primary/90 transition-all hover:scale-105"
              >
                <ShoppingBag className="w-4 h-4" />
                تسوق الآن
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-white border-t"
            >
              <div className="px-4 py-4 space-y-1">
                {links.map((link) => (
                  link.href.startsWith("http") ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="block py-3 px-4 text-sm font-medium rounded-xl hover:bg-muted transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-3 px-4 text-sm font-medium rounded-xl hover:bg-muted transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                ))}
                <Link
                  to="/categories"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-primary text-primary-foreground py-3 px-4 rounded-xl text-sm font-bold mt-3"
                >
                  تسوق الآن
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}