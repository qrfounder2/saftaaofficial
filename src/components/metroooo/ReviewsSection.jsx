import React, { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import ReviewCard from "./ReviewCard";
import MetroReviewStarRow from "./MetroReviewStarRow";
import { Button } from "@/components/ui/button";
import { METRO_REVIEW_VIDEO_URLS } from "@/data/metroReviewVideos";
import { STATIC_METRO_REVIEWS_RAW } from "@/data/metroStaticReviews";
import { stripMetroReviewVariantNoise } from "@/lib/metroReviewText";
import { resolveMetroReviewsHeaderRating } from "@/lib/metroReviewHeaderRating";

/** يثبت فيديو صريح أو يوزّع حتى 4 فيديوهات فقط — الباقي صور بدون تكرار مقطع */
function attachReviewVideos(rows) {
  let autoSlot = 0;
  return rows.map((r) => {
    const explicit = typeof r.video === "string" && r.video.trim();
    if (explicit) {
      return { ...r, video: explicit, hasVideo: true };
    }
    if (!r.hasVideo) {
      return { ...r, video: undefined };
    }
    if (autoSlot >= METRO_REVIEW_VIDEO_URLS.length) {
      return { ...r, hasVideo: false, video: undefined };
    }
    const video = METRO_REVIEW_VIDEO_URLS[autoSlot];
    autoSlot += 1;
    return { ...r, video };
  });
}

const STATIC_REVIEWS = attachReviewVideos(
  STATIC_METRO_REVIEWS_RAW.map((r) => ({ ...r, text: stripMetroReviewVariantNoise(r.text) })),
);

function mapCatalogReviews(rows) {
  if (!Array.isArray(rows) || !rows.length) return null;
  return rows.map((r) => {
    const v = typeof r.video === "string" && r.video.trim() ? r.video.trim() : undefined;
    return {
      name: r.name,
      rating: Math.min(5, Math.max(1, Number(r.rating) || 5)),
      text: stripMetroReviewVariantNoise(r.text),
      verified: r.verified !== false,
      image: r.image,
      video: v,
      hasVideo: v ? true : !!r.hasVideo,
    };
  });
}

export default function ReviewsSection({
  reviews: reviewsProp,
  totalCount,
  titleSuffix = "التقييمات",
}) {
  const [showAll, setShowAll] = useState(false);
  const mapped = useMemo(() => mapCatalogReviews(reviewsProp), [reviewsProp]);
  const reviews = mapped && mapped.length ? attachReviewVideos(mapped) : STATIC_REVIEWS;
  const displayedReviews = showAll ? reviews : reviews.slice(0, 6);
  const countLabel = totalCount != null ? String(totalCount) : "472";

  const headerRating = useMemo(() => resolveMetroReviewsHeaderRating(reviewsProp), [reviewsProp]);

  return (
    <section id="product-reviews" dir="rtl" className="scroll-mt-24 py-8 text-right">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex flex-wrap items-center justify-end gap-2">
          <MetroReviewStarRow value={headerRating} />
          <span className="text-sm font-black tabular-nums text-neutral-900" dir="ltr">
            {headerRating.toLocaleString("ar-SA", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
          </span>
          <span className="text-base font-black text-neutral-900">
            {countLabel} {titleSuffix}
          </span>
        </div>
        <button type="button" className="rounded-lg border border-border p-2" aria-label="تصفية التقييمات">
          <SlidersHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {displayedReviews.map((review, index) => (
          <ReviewCard key={`${review.name}-${index}`} review={review} />
        ))}
      </div>

      {!showAll && (
        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            className="rounded-full px-8 font-bold"
            onClick={() => setShowAll(true)}
          >
            عرض المزيد من التقييمات
          </Button>
        </div>
      )}
    </section>
  );
}
