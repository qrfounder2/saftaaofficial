import { METRO_LAUNCH_PRODUCT_ROWS } from "./metroLaunchProductRows.js";
import FEATURED_47182_IMAGES from "./metroFeatured47182Images.json";

const DEFAULT_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];

const DEFAULT_SIZE_GUIDE_ROWS = [
  { size: "S", weight: "٤٠ – ٥٠", height: "١٫٥ – ١٫٦", waist: "٧٤ - ٧٨", hip: "٩٤ - ٩٨" },
  { size: "M", weight: "٥١ – ٦٢", height: "١٫٥٥ – ١٫٦٥", waist: "٧٨ - ٨٢", hip: "٩٨ - ١٠٢" },
  { size: "L", weight: "٦٣ – ٧٠", height: "١٫٦٥ – ١٫٧٥", waist: "٨٢ - ٨٦", hip: "١٠٢ - ١٠٦" },
  { size: "XL", weight: "٧١ – ٨٢", height: "١٫٦٥ – ١٫٨", waist: "٨٦ - ٩٠", hip: "١٠٦ - ١١٠" },
  { size: "2XL", weight: "٨٣ - ٩٠", height: "١٫٨ - ١٫٨٤", waist: "٩٠-٩٤", hip: "١١٠-١١٤" },
  { size: "3XL", weight: "٩١ - ٩٩", height: "١٫٨٤ - ١٫٨٨", waist: "٩٤-٩٨", hip: "١١٤-١١٨" },
  { size: "4XL", weight: "١٠٠-١١١", height: "١٫٨٨ - ١٫٩٢", waist: "٩٨-١١٢", hip: "١١٨-١٢٢" },
];

function parseOldPrice(oldStr) {
  if (oldStr == null || oldStr === "") return undefined;
  const n = parseFloat(String(oldStr).replace(/,/g, ""));
  return Number.isFinite(n) ? n : undefined;
}

function hexesToMetroColors(hexes) {
  const labels = ["Natural", "Black", "Rose", "Mauve", "Cocoa", "Sand", "Matte", "Nude"];
  return (hexes || []).map((swatch, i) => ({
    id: `shade-${i}`,
    label: labels[i] || `Tone ${i + 1}`,
    swatch,
  }));
}

function inferBadge(row) {
  if (row.fastSelling) return "يباع بسرعة";
  if (row.bestSeller) return "الأكثر مبيعاً";
  if (row.discount) return "عرض";
  return undefined;
}

function launchRowToProduct(row, index) {
  const slug = row.handle;
  const compare = parseOldPrice(row.oldPrice);
  const images = row.id === "47182" ? [...FEATURED_47182_IMAGES] : [row.image];
  const baseTime = new Date("2026-05-15T12:00:00.000Z").getTime();
  const created_date = new Date(baseTime - index * 60_000).toISOString();

  return {
    id: String(row.id),
    name: row.name,
    slug,
    description: row.name,
    short_description: `${row.name} — ضغط ${row.compression || "عالي"}. منتجات أصلية مع شحن داخل المملكة.`,
    price: Number(row.price) || 0,
    compare_price: compare,
    images,
    category: "wellness",
    brand: "Metro Brazil",
    pd_layout: "metro",
    compression: row.compression || "عالي",
    benefits: [
      row.packTierLabels?.[1]?.title
        ? `${row.packTierLabels[1].title} ${row.packTierLabels[1].subtitle || ""}`.trim()
        : "تنسيق القوام وراحة يومية — خامات عالية الجودة.",
      "شحن داخل المملكة — الدفع عند الاستلام حيث يتوفر.",
    ],
    ingredients: "تفاصيل التركيبة والعناية: راجعي بطاقة المنتج الرسمية للعلامة عند الاستلام.",
    how_to_use: "ارتدي المشد حسب جدول المقاسات. ابدأ بفترات أقصر ثم زيدي تدريجياً. يُغسل يدوياً أو على دورة لطيفة حسب تعليمات العلامة.",
    badge: inferBadge(row),
    rating: row.rating ?? 5,
    reviews_count: row.reviewCount ?? 0,
    stock: 120,
    is_featured: !!(row.bestSeller || row.bundle),
    is_active: true,
    free_shipping: !!row.freeShipping,
    two_pack_price: undefined,
    three_pack_price: undefined,
    created_date,
    /** Preserves Launch Metro card badges when `badge` maps to `selling_fast` only. */
    catalog_best_seller: !!row.bestSeller,
    metro_ui: {
      bundle: !!row.bundle,
      bundle_discount_pct: row.bundleDiscountPct,
      pack_tier_labels: row.packTierLabels,
      colors: hexesToMetroColors(row.colors),
      sizes: DEFAULT_SIZES,
      size_guide_rows: DEFAULT_SIZE_GUIDE_ROWS,
      story_images: images.length > 1 ? images.slice(1) : [],
      trust_lines: ["شامل جميع الرسوم", "منتج أصلي — دفع آمن وسهل", "توصيل سريع داخل السعودية"],
      feature_strip: [
        { icon: "wind", title: "راحة", sub: "تصميم عملي للاستخدام اليومي" },
        { icon: "shirt", title: "تنسيق", sub: "لمظهر أنحف تحت الملابس" },
        { icon: "spark", title: "ضغط", sub: `مستوى ${row.compression || "عالي"}` },
      ],
    },
  };
}

/** Same SKUs, prices, images, and order as Launch Metro `PRODUCTS`. */
export function metroBrazilProductsFromLaunch() {
  return METRO_LAUNCH_PRODUCT_ROWS.map((row, i) => launchRowToProduct(row, i));
}
