import { STATIC_METRO_REVIEW_AVG } from "@/data/metroStaticReviews";

/** نفس منطق عنوان قسم التقييمات: متوسط تقييمات الكتالوج إن وُجدت، وإلا متوسط الثابتة */
export function resolveMetroReviewsHeaderRating(catalogReviews) {
  if (Array.isArray(catalogReviews) && catalogReviews.length) {
    const sum = catalogReviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
    return Math.round((sum / catalogReviews.length) * 10) / 10;
  }
  return Math.round(STATIC_METRO_REVIEW_AVG * 10) / 10;
}
