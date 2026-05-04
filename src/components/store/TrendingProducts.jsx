import React from "react";
import { useQuery } from "@tanstack/react-query";
import { storeClient } from "@/api/storeClient";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function TrendingProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => storeClient.entities.Product.filter({ is_featured: true, is_active: true }),
    initialData: [],
  });

  // Fallback to all products if no featured
  const { data: allProducts } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => storeClient.entities.Product.filter({ is_active: true }, "-created_date", 8),
    initialData: [],
    enabled: products.length === 0 && !isLoading,
  });

  const displayProducts = products.length > 0 ? products : allProducts;

  return (
    <section className="py-12 md:py-16 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-slate-800 bg-slate-200/50 px-4 py-1.5 rounded-full border border-slate-200">
            ⭐ الأكثر مبيعاً في المملكة
          </span>
          <h2 className="text-2xl md:text-4xl font-black mt-4 text-slate-900">أكثر المنتجات طلباً الآن</h2>
          <p className="text-slate-500 font-medium mt-2 text-sm max-w-2xl mx-auto">
            منتجات موثوقة ومجربة أثبتت فعاليتها مع آلاف العملاء. اطلبها الآن قبل نفاذ الكمية من المستودع المركزي.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
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
        ) : displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayProducts.slice(0, 8).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            جاري تحديث المخزون — نعتذر، نفدت الكمية حالياً
          </p>
        )}
      </div>
    </section>
  );
}