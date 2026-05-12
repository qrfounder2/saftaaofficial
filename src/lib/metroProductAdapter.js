import { toShapeCardProduct } from "@/lib/shapeProductAdapter";

/** Maps catalog product → metro `ProductCard` / `RecommendedProducts` shape. */
export function toMetroCardProduct(p) {
  const s = toShapeCardProduct(p);
  const priceNum = Number(s.price);
  const price = Number.isFinite(priceNum) ? priceNum.toFixed(2) : String(s.price ?? "0");
  const cmpRaw = s.compare_price ?? s.original_price;
  const cmp = cmpRaw != null ? Number(cmpRaw) : null;
  const oldPrice =
    cmp != null && Number.isFinite(cmp) && Number.isFinite(priceNum) && cmp > priceNum
      ? cmp.toFixed(2)
      : undefined;
  const discountPct =
    oldPrice != null && cmp ? Math.round((1 - priceNum / cmp) * 100) : null;
  const slug = s.slug || s.id;
  const colors = (s.colors || []).map((c) => c.hex).filter(Boolean);
  const reviewCount = s.review_count ?? s.reviews_count ?? 0;
  const ratingRounded = Math.min(5, Math.max(1, Math.round(Number(s.rating) || 5)));

  let discount = false;
  if (discountPct != null && discountPct > 0) discount = discountPct;
  else if (s.badge === "sale") discount = true;

  const mu = p?.metro_ui || {};
  const bundle = !!mu.bundle;
  const bundleDiscountPct =
    mu.bundle_discount_pct != null ? Number(mu.bundle_discount_pct) : undefined;

  return {
    name: s.name_ar || s.name,
    image: Array.isArray(s.images) && s.images[0] ? s.images[0] : "/images/products/product-default.svg",
    price,
    priceLabel: price,
    oldPrice,
    rating: ratingRounded,
    reviewCount,
    bestSeller: s.badge === "bestseller" || !!s.is_featured || !!p?.catalog_best_seller,
    discount,
    freeShipping: !!s.free_shipping,
    fastSelling: s.badge === "selling_fast",
    compression: s.compression || mu.compression || "عالي",
    colors: colors.length ? colors : ["#D4B896", "#000000"],
    link: `/product/${String(slug).replace(/^\//, "")}`,
    bundle,
    bundleDiscountPct: Number.isFinite(bundleDiscountPct) ? bundleDiscountPct : undefined,
  };
}
