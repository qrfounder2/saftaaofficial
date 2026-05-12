/** Maps صفتا `products.js` records to the shape-brazil-hub PDP / card field names. */

const DEFAULT_PRODUCT_IMAGE = "/images/products/product-default.svg";

/** Dedupe, trim, and guarantee at least one URL for gallery / cards (avoids broken empty `src`). */
export function normalizeProductImages(p) {
  const raw = [];
  if (Array.isArray(p?.images)) raw.push(...p.images);
  else if (typeof p?.images === "string" && p.images) raw.push(p.images);
  const seen = new Set();
  const out = [];
  for (const u of raw) {
    if (u == null) continue;
    const s = String(u).trim();
    if (!s || seen.has(s)) continue;
    seen.add(s);
    out.push(s);
  }
  return out.length > 0 ? out : [DEFAULT_PRODUCT_IMAGE];
}

function inferBadgeKey(p) {
  const b = String(p.badge || "");
  if (b.includes("مبيع") || b.includes("بائع") || p.is_featured) return "bestseller";
  if (p.compare_price && p.compare_price > p.price) return "sale";
  if (b.includes("جديد") || b.includes("new")) return "new";
  if (b.includes("سرعة") || b.includes("بسرعة")) return "selling_fast";
  return null;
}

/** Matches shape-brazil-hub PDP: only `bestseller` | `sale` | `new` are shown as top badges. */
function pdpBadgeKey(p) {
  const b = inferBadgeKey(p);
  if (b === "selling_fast") return null;
  return b;
}

export function toShapeCardProduct(p) {
  const badge = inferBadgeKey(p);
  const colors =
    p.metro_ui?.colors?.map((c) => ({
      name: c.id,
      name_ar: c.label,
      hex: c.swatch,
    })) || [];

  return {
    ...p,
    images: normalizeProductImages(p),
    original_price: p.compare_price ?? null,
    review_count: p.reviews_count ?? 0,
    free_shipping: typeof p.free_shipping === "boolean" ? p.free_shipping : !!(p.badge && String(p.badge).includes("شحن")),
    badge,
    colors,
  };
}

export function toShapePdpProduct(p) {
  const card = { ...toShapeCardProduct(p), badge: pdpBadgeKey(p) };
  const mu = p.metro_ui || {};
  const rows = mu.size_guide_rows || [];
  const size_chart = rows.map((r) => ({
    size: r.size,
    weight: r.weight,
    height: r.height,
    waist: r.waist,
    hips: r.hip,
  }));

  return {
    ...card,
    sizes: mu.sizes || [],
    size_chart,
    features: p.benefits || [],
    sku: p.id,
    in_stock: (p.stock ?? 0) > 0,
    compression: p.compression || undefined,
  };
}
