import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { storeClient } from "@/api/storeClient";
import { Skeleton } from "@/components/ui/skeleton";
import { toMetroCardProduct } from "@/lib/metroProductAdapter";
import HeroBanner from "@/components/metroooo/HeroBanner";
import CountdownBanner from "@/components/metroooo/CountdownBanner";
import ProductCard from "@/components/metroooo/ProductCard";
import FeatureIcons from "@/components/metroooo/FeatureIcons";
import { ROUTES, METRO_CATEGORY_TILES } from "@/data/metroLaunchNav";

export default function Home() {
  const { data: rawProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => storeClient.entities.Product.filter({ is_active: true }, "-created_date", 50),
  });

  const metroCards = useMemo(() => rawProducts.map(toMetroCardProduct), [rawProducts]);

  const bestSellers = useMemo(() => {
    const featured = metroCards.filter((_, i) => rawProducts[i]?.is_featured);
    const withSales = metroCards.filter((c) => c.bestSeller || c.reviewCount > 0);
    const pick = featured.length >= 4 ? featured : withSales.length >= 4 ? withSales : metroCards;
    return pick.slice(0, 8);
  }, [metroCards, rawProducts]);

  const bundleDeals = useMemo(() => {
    const bundled = metroCards.filter((_, i) => rawProducts[i]?.metro_ui?.bundle);
    if (bundled.length) return bundled.slice(0, 8);
    const packs = metroCards.filter((_, i) => rawProducts[i]?.three_pack_price != null);
    return (packs.length ? packs : metroCards).slice(0, 8);
  }, [metroCards, rawProducts]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <HeroBanner />
      <CountdownBanner />

      <section className="layout-wide section-stack">
        <h2 className="heading-section">الأفضل مبيعاً</h2>
        <div className="heading-rule" />

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[3/4] rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {bestSellers.map((product, i) => (
              <ProductCard key={product.link || i} product={product} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-6 sm:mt-8">
          <Link to={ROUTES.bestSellers} className="cta-outline-pill">
            عرض الكل
          </Link>
        </div>
      </section>

      <section className="layout-wide section-stack-sm border-t border-gray-100/80">
        <h2 className="heading-section">أقسام المشدات</h2>
        <div className="heading-rule" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {METRO_CATEGORY_TILES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/collections/${cat.slug}`}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group"
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 end-3 sm:bottom-4 sm:end-4 text-white font-black text-xs sm:text-sm leading-snug max-w-[calc(100%-1.5rem)] text-end">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="layout-wide section-stack-sm border-t border-gray-100/80">
        <h2 className="heading-section">مجموعات التوفير</h2>
        <div className="heading-rule" />

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {bundleDeals.map((product, i) => (
              <ProductCard key={`b-${product.link || i}`} product={product} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-6 sm:mt-8">
          <Link to={ROUTES.bundles} className="cta-outline-pill">
            عرض الكل
          </Link>
        </div>
      </section>

      <section className="layout-wide section-stack-sm pb-10 sm:pb-12">
        <FeatureIcons />
      </section>
    </div>
  );
}
