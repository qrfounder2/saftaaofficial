import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import BrandLogo from "./BrandLogo";

// Countdown target — 48 hours from a fixed launch point so it persists across refreshes
const SALE_ENDS_KEY = "saftaa_sale_ends";
function getSaleEnd() {
  let end = parseInt(localStorage.getItem(SALE_ENDS_KEY) || "0", 10);
  if (!end || end < Date.now()) {
    end = Date.now() + 48 * 60 * 60 * 1000;
    localStorage.setItem(SALE_ENDS_KEY, String(end));
  }
  return end;
}

function useCountdown() {
  const [time, setTime] = useState({ h: "00", m: "00", s: "00" });
  useEffect(() => {
    const end = getSaleEnd();
    function tick() {
      const diff = Math.max(0, end - Date.now());
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const countdown = useCountdown();

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
    { label: "تواصل معنا", href: "https://wa.me/966501234567" },
  ];

  return (
    <>
      {/* ── Announcement bar ── */}
      <div className="bg-emerald-700 text-white" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 md:gap-6 flex-wrap">

          {/* Offer label */}
          <span className="flex items-center gap-1.5 text-[11px] md:text-xs font-bold">
            <svg className="w-3.5 h-3.5 text-yellow-300 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
            </svg>
            خصم يصل إلى ٤٠٪ على جميع المنتجات
          </span>

          {/* Divider */}
          <span className="hidden md:block text-white/30 text-sm select-none">|</span>

          {/* Countdown boxes */}
          <div className="flex items-center gap-1.5" dir="ltr">
            {[
              { v: countdown.h, l: "HRS" },
              { v: countdown.m, l: "MIN" },
              { v: countdown.s, l: "SEC" },
            ].map(({ v, l }, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <span className="text-white/50 font-black text-sm leading-none mb-2">:</span>
                )}
                <div className="flex flex-col items-center">
                  <span className="bg-white/15 border border-white/20 rounded px-1.5 py-0.5 text-sm font-black tabular-nums leading-none min-w-[28px] text-center">
                    {v}
                  </span>
                  <span className="text-[8px] text-white/60 font-bold mt-0.5 tracking-wider">{l}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Divider */}
          <span className="hidden md:block text-white/30 text-sm select-none">|</span>

          {/* CTA link */}
          <Link
            to="/categories"
            className="hidden md:inline-flex items-center gap-1 text-[11px] font-black underline underline-offset-2 hover:text-yellow-200 transition-colors"
          >
            اطلب الآن قبل انتهاء الكميات
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </Link>

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