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
      {/* ── Announcement bar with countdown ── */}
      <div className="bg-black text-white py-2 px-4 flex items-center justify-center gap-4 md:gap-8">
        <span className="text-[10px] md:text-xs font-black tracking-widest uppercase">
          عرض محدود
        </span>
        {/* Countdown */}
        <div className="flex items-center gap-1 md:gap-2">
          {[{ v: countdown.h, l: "سا" }, { v: countdown.m, l: "د" }, { v: countdown.s, l: "ث" }].map(({ v, l }, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="text-white/40 font-black text-sm">:</span>}
              <div className="flex flex-col items-center">
                <span className="text-sm md:text-base font-black tabular-nums leading-none">{v}</span>
                <span className="text-[8px] text-white/50 leading-none mt-0.5">{l}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <span className="hidden md:block text-[10px] font-bold tracking-wider text-white/60 uppercase">
          ينتهي العرض قريباً
        </span>
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