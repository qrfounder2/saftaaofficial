import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";
import { storeClient } from "@/api/storeClient";
import { toMetroCardProduct } from "@/lib/metroProductAdapter";
import ProductCard from "@/components/metroooo/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  METRO_CATEGORY_TILES,
  productMatchesCollectionSlug,
} from "@/data/metroLaunchNav";

const COMPRESSION_FILTERS = ["الكل", "عالي", "متوسط"];

export default function Collections({ title: titleProp, guideMode }) {
  const { slug } = useParams();
  const [filter, setFilter] = useState("الكل");

  const { data: rawProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => storeClient.entities.Product.filter({ is_active: true }, "-created_date", 80),
  });

  const metroRows = useMemo(
    () => rawProducts.map((p, i) => ({ raw: p, card: toMetroCardProduct(p), i })),
    [rawProducts],
  );

  const bundleMode = slug === "bundles";
  const bestSellersMode = slug === "best-sellers";

  const categoryMeta = METRO_CATEGORY_TILES.find((c) => c.slug === slug);

  let title = titleProp ?? "الأفضل مبيعاً";
  let poolRows = metroRows;

  if (guideMode) {
    title = "دليل المنتجات";
    poolRows = metroRows;
  } else if (bundleMode) {
    title = "مجموعات التوفير";
    poolRows = metroRows.filter(
      ({ raw }) => raw.metro_ui?.bundle || raw.three_pack_price != null,
    );
    if (!poolRows.length) poolRows = metroRows;
  } else if (bestSellersMode) {
    title = "الأفضل مبيعاً";
    poolRows = metroRows.filter(
      ({ raw, card }) => raw.is_featured || card.bestSeller || card.reviewCount > 0,
    );
    if (!poolRows.length) poolRows = metroRows;
  } else if (categoryMeta) {
    title = categoryMeta.label;
    poolRows = metroRows.filter(({ raw }) => productMatchesCollectionSlug(raw, slug));
    if (!poolRows.length) poolRows = metroRows;
  }

  const displayed = useMemo(() => {
    const base = poolRows.map((r) => r.card);
    if (bundleMode || guideMode) return base;
    if (filter === "الكل") return base;
    return poolRows.filter(({ card }) => card.compression === filter).map((r) => r.card);
  }, [poolRows, filter, bundleMode, guideMode]);

  const showCompressionFilters = !bundleMode && !guideMode;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <main className="layout-wide section-stack">
        <h1 className="heading-section">{title}</h1>
        <div className="heading-rule" />

        {showCompressionFilters && (
          <div className="flex items-center justify-between mb-6 gap-3 flex-wrap sm:flex-nowrap">
            <div className="flex gap-2 flex-wrap">
              {COMPRESSION_FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-xs font-black border transition-all ${
                    filter === f
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-200 hover:border-black"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="flex items-center gap-2 text-xs font-bold border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              تصفية
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-[3/4] rounded-2xl" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {displayed.map((p) => (
              <ProductCard key={p.link} product={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
