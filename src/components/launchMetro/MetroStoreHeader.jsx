import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingBag, Globe } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { storeClient } from "@/api/storeClient";
import { toMetroCardProduct } from "@/lib/metroProductAdapter";
import { ROUTES, HEADER_NAV } from "@/data/metroLaunchNav";
import SearchDrawer from "./SearchDrawer";
import MobileMenu from "./MobileMenu";

function toSearchProducts(raw) {
  return raw.map((p) => {
    const c = toMetroCardProduct(p);
    return {
      id: p.id,
      name: c.name,
      image: c.image,
      link: c.link,
      price: c.price,
      priceLabel: c.priceLabel ?? c.price,
      oldPrice: c.oldPrice,
    };
  });
}

export default function MetroStoreHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { data: rawProducts = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => storeClient.entities.Product.filter({ is_active: true }, "-created_date", 80),
  });

  const searchProducts = useMemo(() => toSearchProducts(rawProducts), [rawProducts]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="layout-wide flex items-center justify-between h-14 sm:h-16">
          <button
            type="button"
            className="lg:hidden p-2 -me-2"
            onClick={() => setMenuOpen(true)}
            aria-label="القائمة"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link to={ROUTES.home} className="absolute left-1/2 -translate-x-1/2">
            <img
              src="https://metrobrazil.com/cdn/shop/files/black-arabic_600x.png?v=1736164868"
              alt="مترو برازيل"
              className="h-7 w-auto max-w-[120px] object-contain sm:h-8 sm:max-w-[138px]"
            />
          </Link>

          <div className="flex items-center gap-2">
            <button type="button" className="p-2" onClick={() => setSearchOpen(true)} aria-label="البحث">
              <Search className="w-5 h-5" />
            </button>
            <Link to={ROUTES.categories} className="p-2 relative" aria-label="تصفح المنتجات">
              <ShoppingBag className="w-5 h-5" />
            </Link>
            <button
              type="button"
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition"
            >
              <Globe className="w-3.5 h-3.5" />
              السعودية
            </button>
          </div>
        </div>

        <nav className="hidden lg:block pb-3">
          <div className="layout-wide flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-bold">
            {HEADER_NAV.map((link) => (
              <Link key={link.label} to={link.href} className="hover:text-gray-500 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={HEADER_NAV} />
      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} products={searchProducts} />
    </>
  );
}
