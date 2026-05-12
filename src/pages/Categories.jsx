import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { storeClient } from "@/api/storeClient";
import ProductCard from "@/components/metroooo/ProductCard";
import { toMetroCardProduct } from "@/lib/metroProductAdapter";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter } from "lucide-react";

const categoryOptions = [
  { value: "all", label: "الكل" },
  { value: "medication", label: "العناية والمسكنات" },
  { value: "wellness", label: "العافية والدعم" },
  { value: "lifestyle", label: "أدوات وترند" },
  { value: "back", label: "آلام الظهر" },
  { value: "knee", label: "آلام الركبة" },
  { value: "sciatica", label: "عرق النسا" },
  { value: "arthritis", label: "الخشونة" },
  { value: "neck", label: "آلام الرقبة" },
  { value: "joints", label: "آلام المفاصل" },
];

export default function Categories() {
  const params = new URLSearchParams(window.location.search);
  const initialCat = params.get("cat") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCat);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => storeClient.entities.Product.filter({ is_active: true }),
    initialData: [],
  });

  const filtered = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const cards = useMemo(() => filtered.map(toMetroCardProduct), [filtered]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <main className="layout-wide section-stack">
        <h1 className="heading-section">المنتجات</h1>
        <div className="heading-rule" />

        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          {categoryOptions.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-black border transition-all ${
                activeCategory === cat.value
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-200 hover:border-black"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-[3/4] rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : cards.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {cards.map((product) => (
              <ProductCard key={product.link} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-4xl mb-4 block">📦</span>
            <p className="text-gray-500 font-medium">لا توجد منتجات في هذا التصنيف حالياً</p>
          </div>
        )}
      </main>
    </div>
  );
}
