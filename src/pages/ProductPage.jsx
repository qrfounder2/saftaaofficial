import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Award, ChevronDown, Layers2, Sparkles } from "lucide-react";
import { storeClient } from "@/api/storeClient";
import { normalizeProductImages, toShapeCardProduct, toShapePdpProduct } from "@/lib/shapeProductAdapter";
import { toMetroCardProduct } from "@/lib/metroProductAdapter";
import ProductGallery from "@/components/metroooo/ProductGallery";
import ProductOptions from "@/components/metroooo/ProductOptions";
import ProductSizingBlock from "@/components/metroooo/ProductSizingBlock";
import ProductFeatures from "@/components/metroooo/ProductFeatures";
import RecommendedProducts from "@/components/metroooo/RecommendedProducts";
import GuideBanner from "@/components/metroooo/GuideBanner";
import FeatureIcons from "@/components/metroooo/FeatureIcons";
import ReviewsSection from "@/components/metroooo/ReviewsSection";
import MetroReviewStarRow from "@/components/metroooo/MetroReviewStarRow";
import { resolveMetroReviewsHeaderRating } from "@/lib/metroReviewHeaderRating";
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

  const { data: rawProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => storeClient.entities.Product.filter({ is_active: true }, "-created_date", 80),
  });

  const product = useMemo(
    () =>
      rawProducts.find(
        (p) => p.slug === slug || p.id === slug || (p.sku && p.sku === slug),
      ),
    [rawProducts, slug],
  );

  const metroReviews = product?.metro_ui?.reviews;
  const metroReviewChipRating = useMemo(
    () => resolveMetroReviewsHeaderRating(metroReviews),
    [metroReviews],
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

  const recommended = useMemo(() => {
    if (!product) return [];
    const pool = rawProducts.filter((p) => p.id !== product.id && p.is_active).slice(0, 24);
    const cards = pool.map(toMetroCardProduct);
    const addonRank = (name) => {
      const n = String(name || "");
      if (/مشد\s*خصر|مشد خصر|خصر/.test(n)) return 0;
      return 1;
    };
    return [...cards].sort((a, b) => addonRank(a.name) - addonRank(b.name)).slice(0, 8);
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
  const reviewCount = product.reviews_count ?? card.review_count ?? 0;
  const isBundle = !!product.metro_ui?.bundle;
  const titleSlug =
    isBundle ? "مجموعة" : String(product.name || "").split(" ").slice(0, 3).join(" ");
  const showFreeShipping = card.free_shipping !== false;

  const trustPill =
    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold leading-none tracking-tight shadow-sm ring-1 ring-slate-950/[0.04] backdrop-blur-[2px]";

  const showFeaturedPill =
    product.is_featured && card.badge !== "bestseller" && !isBundle;
  const showTrustRow =
    card.badge === "bestseller" || isBundle || showFeaturedPill || showFreeShipping;

  const showReviewsJump = true;

  const scrollToReviews = () => {
    document.getElementById("product-reviews")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white pb-20 sm:pb-24 overflow-x-hidden">
      <main dir="rtl" className="layout-narrow pt-1 overflow-x-hidden text-right">
        <p className="py-3 text-xs font-medium text-gray-400">
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

        {showTrustRow || showReviewsJump ? (
          <div className="mb-3 space-y-2">
            {showTrustRow ? (
              <div className="flex flex-wrap items-center gap-1.5">
                {card.badge === "bestseller" && (
                  <span className={`${trustPill} border-amber-200/85 bg-amber-50/95 text-amber-950`}>
                    <Award className="h-3.5 w-3.5 shrink-0 text-amber-600" aria-hidden />
                    الأكثر مبيعاً
                  </span>
                )}
                {isBundle && (
                  <span className={`${trustPill} border-emerald-200/80 bg-emerald-50/95 text-emerald-950`}>
                    <Layers2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
                    مجموعة توفير
                  </span>
                )}
                {showFeaturedPill && (
                  <span className={`${trustPill} border-slate-200/90 bg-white text-slate-800`}>
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-violet-600" aria-hidden />
                    مميز
                  </span>
                )}
                {showFreeShipping && <StoreBadge variant="freeShipping" size="md" />}
              </div>
            ) : null}
            {showReviewsJump ? (
              <button
                type="button"
                onClick={scrollToReviews}
                className="group flex max-w-full flex-wrap items-center gap-2.5 rounded-2xl border border-amber-200/90 bg-gradient-to-l from-amber-50/95 via-white to-white px-3.5 py-2 text-start shadow-sm ring-1 ring-amber-100/60 transition-all hover:border-amber-300 hover:shadow-md hover:ring-amber-200/80 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
                aria-label={`عرض تقييمات المشترين${reviewCount > 0 ? `، العدد ${reviewCount.toLocaleString("ar-SA")}` : ""}`}
              >
                <div className="flex items-center gap-1.5 shrink-0">
                  <MetroReviewStarRow value={metroReviewChipRating} />
                  <span className="text-sm font-black tabular-nums text-neutral-900" dir="ltr">
                    {metroReviewChipRating.toLocaleString("ar-SA", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                  </span>
                </div>
                <span className="hidden h-5 w-px shrink-0 bg-neutral-200/90 sm:block" aria-hidden />
                <div className="min-w-0 flex flex-col items-start gap-0.5">
                  <span className="text-[11px] font-black leading-tight text-neutral-900 sm:text-xs">
                    {reviewCount > 0
                      ? `${reviewCount.toLocaleString("ar-SA")} تقييم من مشتريات السعودية`
                      : "تقييمات المشترين مع صور وفيديو"}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                    اضغط للاطلاع على التقييمات
                    <ChevronDown
                      className="h-3.5 w-3.5 shrink-0 text-emerald-600 transition-transform group-hover:translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </button>
            ) : null}
          </div>
        ) : null}

        <h1 className="text-2xl md:text-3xl font-black leading-tight mb-5">{product.name}</h1>

        <ProductGallery images={images} />

        <div className="mt-7">
          <ProductOptions product={product} sizes={sizes} colors={colorOptions} />
        </div>

        <ProductSizingBlock sizeChart={pdp.size_chart} sizes={sizes} />

        <div className="border-t border-gray-100 my-4" />

        <ProductFeatures />

        <div className="my-4 border-t border-gray-100" />

        <ReviewsSection reviews={metroReviews} totalCount={reviewCount} />

        <RecommendedProducts products={recommended} />

        <GuideBanner />
        <FeatureIcons />
      </main>
    </div>
  );
}
