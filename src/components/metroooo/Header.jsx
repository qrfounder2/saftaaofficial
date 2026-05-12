import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'أقسام المشدات', href: '#' },
  { label: 'المجموعات', href: '#' },
  { label: 'عروض', href: '#' },
  { label: 'الأفضل مبيعاً', href: '#' },
  { label: 'دليل المنتجات', href: '#' },
];

export default function Header() {
  const [cartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Right side - Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-1 lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-6">
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-lg font-medium py-2 border-b border-border">
                  {link.label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Center - Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="https://metrobrazil.com/cdn/shop/files/black-arabic_600x.png?v=1736164868"
            alt="مترو برازيل"
            className="h-8 md:h-10 object-contain"
          />
        </Link>

        {/* Left side - Icons */}
        <div className="flex items-center gap-3">
          <button className="p-1">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-1 relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -left-1 bg-green-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center justify-center gap-8 pb-3">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className="text-sm font-medium hover:opacity-70 transition-opacity">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}