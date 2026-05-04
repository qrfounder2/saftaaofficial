import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { storeClient } from "@/api/storeClient";
import ProductCard from "../components/store/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter } from "lucide-react";

const categoryOptions = [
  { value: "all", label: "الكل" },
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-emerald-900 text-white py-10 md:py-16 relative overflow-hidden">
        {/* Subtle grid pattern for medical look */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block bg-emerald-800 text-emerald-100 px-3 py-1 rounded-full text-xs font-bold mb-4 border border-emerald-700/50">
            الوكيل الحصري والموزع المعتمد 🇸🇦
          </span>
          <h1 className="text-3xl md:text-5xl font-black mb-3">الحلول الطبية المتكاملة</h1>
          <p className="text-emerald-100 text-sm max-w-lg mx-auto">
            نوفر لك خيارات علاجية موثوقة ومصرحة، مطابقة لاعتمادات هيئة الغذاء والدواء السعودية (SFDA) مع ضمان الفعالية والأمان.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
          {categoryOptions.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden">
                <Skeleton className="aspect-square" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-6 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-4xl mb-4 block">📦</span>
            <p className="text-muted-foreground">لا توجد منتجات في هذا التصنيف حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
}