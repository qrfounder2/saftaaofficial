/**
 * Pack tiers (1 / 3 / 5) for Metro PDP — same pricing rules as Launch Metro `resolvePackOffers`.
 * Reads Arabic copy from `metro_ui.pack_tier_labels` when present.
 */

function parseOldPrice(oldStr) {
  if (oldStr == null || oldStr === "") return null;
  const n = parseFloat(String(oldStr).replace(/,/g, ""));
  return Number.isNaN(n) ? null : n;
}

function tierLabel(labels, tier, field) {
  if (!labels || typeof labels !== "object") return undefined;
  const block = labels[tier] ?? labels[String(tier)];
  return block?.[field];
}

/**
 * @param {{ price: number, compare_price?: number|null, metro_ui?: object }} product
 * @returns {Array<{ tier: number, total: number, compare: number, promo: string|null, badge: string|null, bundleLabel: string, title: string, subtitle: string }>}
 */
export function resolveMetroPackOffers(product) {
  const unit = Number(product?.price);
  if (!Number.isFinite(unit) || unit <= 0) return [];

  const oldParsed = parseOldPrice(product?.compare_price);
  const compareSingle =
    oldParsed != null && Number.isFinite(oldParsed) && oldParsed > unit
      ? Math.round(oldParsed)
      : Math.max(Math.round(unit * 1.48), unit + 1);

  const threeList = unit * 3;
  const fiveList = unit * 5;
  const labels = product?.metro_ui?.pack_tier_labels || product?.metro_ui?.packTierLabels;

  const base = [
    {
      tier: 1,
      total: Math.round(unit),
      compare: Math.round(compareSingle),
      promo: null,
      badge: null,
      bundleLabel: "قطعة واحدة",
      title: "قطعة واحدة",
      subtitle: "(نفس المقاس واللون)",
    },
    {
      tier: 3,
      total: Math.round(threeList * 0.7),
      compare: Math.round(threeList),
      promo: "وفر 30%",
      badge: "الأكثر طلباً",
      bundleLabel: "عرض 3 قطع",
      title: "عرض 3 قطع",
      subtitle: "(توفير للعناية المتكررة)",
    },
    {
      tier: 5,
      total: Math.round(fiveList * 0.55),
      compare: Math.round(fiveList),
      promo: "وفر 45%",
      badge: "أفضل قيمة",
      bundleLabel: "عرض 5 قطع",
      title: "عرض 5 قطع",
      subtitle: "(أقوى توفير للقطعة)",
    },
  ];

  return base.map((row) => {
    const L = labels?.[row.tier] ?? labels?.[String(row.tier)];
    if (!L) return row;
    const next = { ...row };
    if (L.title != null) next.title = L.title;
    if (L.subtitle != null) next.subtitle = L.subtitle;
    if ("promo" in L) next.promo = L.promo ?? null;
    if ("badge" in L) next.badge = L.badge ?? null;
    if (L.bundleLabel != null) next.bundleLabel = L.bundleLabel;
    if (L.total != null) next.total = Number(L.total);
    if (L.compare != null) next.compare = Number(L.compare);
    return next;
  });
}

/** Unit price to pass in `/order` so `price * qty === offer.total` (OrderForm metro math). */
export function unitPriceForCheckout(offer) {
  if (!offer?.tier) return 0;
  return Math.round((offer.total / offer.tier) * 100) / 100;
}
