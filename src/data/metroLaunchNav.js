/** Routes + category grid aligned with Launch Metro storefront. */
export const ROUTES = {
  home: "/",
  bestSellers: "/collections/best-sellers",
  bundles: "/collections/bundles",
  guide: "/guide",
  categories: "/categories",
};

/** Hero / urgency CTAs → same checkout flow as PDP (مشد الخصر المميز). */
export const CHECKOUT_FEATURED_WAIST = `/order?${new URLSearchParams({
  product: "47182",
  pack: "1",
  price: "330",
  qty: "1",
  size: "M",
  colorLabel: "Natural",
}).toString()}`;

export const HEADER_NAV = [
  { label: "أقسام المشدات", href: ROUTES.bestSellers },
  { label: "المجموعات", href: ROUTES.bundles },
  { label: "عروض", href: ROUTES.bestSellers },
  { label: "الأفضل مبيعاً", href: ROUTES.bestSellers },
  { label: "دليل المنتجات", href: ROUTES.guide },
];

/** Visual tiles — same structure as Launch Metro `CATEGORIES`. */
export const METRO_CATEGORY_TILES = [
  {
    label: "مشدات برمودا",
    slug: "bermuda",
    image: "https://metrobrazil.com/cdn/shop/files/276845-800-auto_800x.png?v=1773130226",
  },
  {
    label: "مشدات كامل الجسم",
    slug: "full-body",
    image: "https://metrobrazil.com/cdn/shop/files/0019_Copyof47071-001-01_800x.jpg?v=1776689235",
  },
  {
    label: "مشدات الخصر",
    slug: "waist",
    image: "https://metrobrazil.com/cdn/shop/files/47182-001-6140_800x.jpg?v=1758812376",
  },
  {
    label: "حمالات الصدر",
    slug: "bra",
    image: "https://metrobrazil.com/cdn/shop/files/60156-BALM-01_800x.jpg?v=1772791131",
  },
];

/** Optional keyword filter when opening `/collections/:slug` (non-bundle). */
export function productMatchesCollectionSlug(product, slug) {
  if (!product || !slug) return true;
  const name = String(product.name || "");
  const map = {
    bermuda: /برمودا/i,
    "full-body": /جسم كامل|كامل للجسم|بودي كامل/i,
    body: /بودي|جسم(?! كامل)/i,
    waist: /خصر|وسط/i,
    shorts: /شورت/i,
    bra: /حمالة|صدر/i,
  };
  const re = map[slug];
  if (!re) return true;
  return re.test(name);
}
