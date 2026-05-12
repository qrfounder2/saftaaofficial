/**
 * يزيل لاحقة «نوع المنتج: …» إن وُجدت داخل نص التقييم (غالباً من الـ API / الكتالوج).
 */
export function stripMetroReviewVariantNoise(text) {
  if (typeof text !== "string") return "";
  let cut = text.length;
  for (const re of [/نوع المنتج\s*[:：]/i, /Product type\s*[:：]/i]) {
    const idx = text.search(re);
    if (idx !== -1 && idx < cut) cut = idx;
  }
  return text.slice(0, cut).trim();
}
