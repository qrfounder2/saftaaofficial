import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { storeClient } from "@/api/storeClient";
import { normalizeProductImages, toShapeCardProduct, toShapePdpProduct } from "@/lib/shapeProductAdapter";
import { toMetroCardProduct } from "@/lib/metroProductAdapter";
import ProductGallery from "@/components/metroooo/ProductGallery";
import ProductOptions from "@/components/metroooo/ProductOptions";
import PaymentMethods from "@/components/metroooo/PaymentMethods";
import TrustBadges from "@/components/metroooo/TrustBadges";
import ProductFeatures from "@/components/metroooo/ProductFeatures";
import ReviewsSection from "@/components/metroooo/ReviewsSection";
import RecommendedProducts from "@/components/metroooo/RecommendedProducts";
import GuideBanner from "@/components/metroooo/GuideBanner";
import FeatureIcons from "@/components/metroooo/FeatureIcons";
import StoreBadge from "@/components/launchMetro/StoreBadge";
import { Skeleton } from "@/components/ui/skeleton";

function galleryUrls(p) {
  const base = normalizeProductImages(p);
  const extra = Array.isArray(p?.metro_ui?.story_images) ? p.metro_ui.story_images : [];
  const seen = new Set(base);
  const out = [...base];
  for (const u of extra) {
    const s = String(u).trim();
    if (!s || seen.has(s)) continue;
    seen.add(s);
    out.push(s);
  }
  return out;
}

export default function ProductPage() {
  const { slug } = useParams();
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { data: rawProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => storeClient.entities.Product.filter({ is_active: true }, "-created_date", 80),
  });

  const product = useMemo(
    () => rawProducts.find((p) => p.slug === slug || p.id === slug),
    [rawProducts, slug],
  );

  const pdp = useMemo(() => (product ? toShapePdpProduct(product) : null), [product]);
  const card = useMemo(() => (product ? toShapeCardProduct(product) : null), [product]);

  const colorOptions = useMemo(() => {
    const mu = product?.metro_ui;
    if (mu?.colors?.length) {
      return mu.colors.map((c) => ({
        name: c.id,
        label_ar: c.label,
        value: c.swatch,
        border: c.swatch || "#333",
      }));
    }
    return undefined;
  }, [product]);

  React.useEffect(() => {
    if (colorOptions?.length) {
      setSelectedColor((prev) => {
        if (prev && colorOptions.some((c) => c.name === prev)) return prev;
        return colorOptions[0].name;
      });
    }
  }, [colorOptions]);

  const recommended = useMemo(() => {
    if (!product) return [];
    return rawProducts
      .filter((p) => p.id !== product.id && p.is_active)
      .slice(0, 4)
      .map(toMetroCardProduct);
  }, [rawProducts, product]);

  if (!isLoading && !product) {
    return (
      <div className="layout-narrow py-16 text-center space-y-4">
        <p className="text-lg font-bold">المنتج غير موجود</p>
        <Link to="/" className="text-black font-black underline">
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  if (isLoading || !product || !pdp || !card) {
    return (
      <div className="layout-narrow py-6 space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    );
  }

  const images = galleryUrls(product);
  const sizes = pdp.sizes?.length ? pdp.sizes : undefined;
  const unitPrice = Number(product.price) || 0;
  const comparePrice = product.compare_price != null ? Number(product.compare_price) : null;
  const metroReviews = product.metro_ui?.reviews;
  const reviewCount = product.reviews_count ?? card.review_count ?? 0;
  const isBundle = !!product.metro_ui?.bundle;
  const titleSlug =
    isBundle ? "مجموعة" : String(product.name || "").split(" ").slice(0, 3).join(" ");
  const showFreeShipping = card.free_shipping !== false;

  return (
    <div className="min-h-screen bg-white pb-20 sm:pb-24 overflow-x-hidden">
      <main className="layout-narrow pt-1 overflow-x-hidden">
        <p className="text-xs text-gray-400 font-medium py-3">
          <Link to="/" className="hover:text-black">
            الرئيسية
          </Link>
          {" "}
          &rsaquo;{" "}
          <Link to="/collections/best-sellers" className="hover:text-black">
            الأفضل مبيعاً
          </Link>
          {" "}
          &rsaquo; <span className="text-black font-bold">{titleSlug}</span>
        </p>

        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {card.badge === "bestseller" && (
            <span className="bg-pink-100 text-pink-800 text-xs font-black px-3 py-1 rounded-full">
              الأكثر مبيعاً
            </span>
          )}
          {isBundle && (
            <span className="bg-emerald-100 text-emerald-900 text-xs font-black px-3 py-1 rounded-full">
              مجموعة توفير
            </span>
          )}
          {product.is_featured && card.badge !== "bestseller" && !isBundle && (
            <span className="bg-pink-100 text-pink-800 text-xs font-black px-3 py-1 rounded-full">
              مميز
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mb-3 flex-wrap">
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(Number(product.rating) || 5) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-black">({reviewCount.toLocaleString("ar-SA")})</span>
            </div>
          )}
          {showFreeShipping && <StoreBadge variant="freeShipping" size="md" />}
        </div>

        <h1 className="text-2xl md:text-3xl font-black leading-tight mb-5">{product.name}</h1>

        <ProductGallery images={images} />

        <div className="mt-7">
          <ProductOptions
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            quantity={quantity}
            setQuantity={setQuantity}
            sizes={sizes}
            colors={colorOptions}
            unitPrice={unitPrice}
            comparePrice={comparePrice}
            productId={product.id}
          />
        </div>

        <PaymentMethods />
        <TrustBadges />

        <div className="border-t border-gray-100 my-4" />

        <ProductFeatures />

        <div className="border-t border-gray-100 my-4" />

        <ReviewsSection reviews={metroReviews} totalCount={reviewCount} />

        <RecommendedProducts products={recommended} />

        <GuideBanner />
        <FeatureIcons />
      </main>
    </div>
  );
}
