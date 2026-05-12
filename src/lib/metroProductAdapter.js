import { toShapeCardProduct } from "@/lib/shapeProductAdapter";
import { resolveMetroPackOffers, unitPriceForCheckout } from "@/lib/metroPackOffers";

const defaultSizesQuick = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];
const defaultColorsQuick = [
  { id: "Natural", label: "طبيعي", swatch: "#D4B896" },
  { id: "Black", label: "أسود", swatch: "#000000" },
];

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
  const normalizedSlug = String(slug).replace(/^\//, "");
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

  const sizesQuick =
    Array.isArray(mu.sizes) && mu.sizes.length ? [...mu.sizes] : [...defaultSizesQuick];
  const colorOptionsQuick =
    Array.isArray(mu.colors) && mu.colors.length
      ? mu.colors.map((c) => ({ id: c.id, label: c.label, swatch: c.swatch || "#ccc" }))
      : [...defaultColorsQuick];

  const offers = resolveMetroPackOffers({
    price: priceNum,
    compare_price: p?.compare_price,
    metro_ui: mu,
  });
  const tier1 = offers.find((o) => o.tier === 1);
  const checkoutUnitPrice = tier1
    ? unitPriceForCheckout(tier1)
    : Number.isFinite(priceNum)
      ? Math.round(priceNum * 100) / 100
      : 0;
  const tier1Compare = tier1?.compare ?? null;

  return {
    name: s.name_ar || s.name,
    image: Array.isArray(s.images) && s.images[0] ? s.images[0] : "/images/products/product-default.svg",
    price,
    priceLabel: price,
    oldPrice,
    rating: ratingRounded,
    reviewCount,
    bestSeller: s.badge === "bestseller" || !!p?.catalog_best_seller,
    discount,
    freeShipping: !!s.free_shipping,
    fastSelling: s.badge === "selling_fast",
    compression: s.compression || mu.compression || "عالي",
    colors: colors.length ? colors : ["#D4B896", "#000000"],
    link:
      normalizedSlug === "freeza" || p?.sku === "7Xo9uQDDdN"
        ? "/poduct/freeza"
        : `/product/${normalizedSlug}`,
    bundle,
    bundleDiscountPct: Number.isFinite(bundleDiscountPct) ? bundleDiscountPct : undefined,
    productId: p.id,
    pd_layout: p.pd_layout,
    sizesQuick,
    colorOptionsQuick,
    checkoutUnitPrice,
    tier1Compare,
    savingsVsListPct:
      tier1Compare != null && tier1?.total != null && tier1Compare > tier1.total
        ? Math.round((1 - tier1.total / tier1Compare) * 100)
        : discountPct,
  };
}
