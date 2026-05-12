import React, { useMemo, useState } from "react";
import { Star, SlidersHorizontal } from "lucide-react";
import ReviewCard from "./ReviewCard";
import { Button } from "@/components/ui/button";
import { METRO_REVIEW_VIDEO_URLS } from "@/data/metroReviewVideos";

const STATIC_REVIEWS_RAW = [
  {
    name: "ام",
    rating: 5,
    text: "يجنن المشد ماشاء الله روعه ومريحه وينحت الجسم جوده ممتازة",
    variant: "L / Beige",
    verified: true,
    image: "https://images.loox.io/uploads/2026/4/15/i113sMH6y_IM-sWRvAg_orig.jpg",
    hasVideo: true,
  },
  {
    name: "حنان",
    rating: 5,
    text: "اقسم بالله أجمل شي استخدمته … مريح جداااا يرتب الجسم شي خورافي من الاخررر 😍😍😍 شكرا مترو برازيل اجمل منتج 🌹",
    variant: "3XL / Natural",
    verified: true,
    image: "https://images.loox.io/uploads/2026/4/18/eRFsJoFSX_I3w-87HPl_orig.jpg",
    hasVideo: true,
  },
  {
    name: "نادية",
    rating: 5,
    text: "مريح جدا علي الجسم وبيشد فعلا بس خدوا أصغر من مقاسكم درجه",
    variant: "2XL / Beige",
    verified: true,
    image: "https://images.loox.io/uploads/2026/1/12/mI5uh9_iP_sLn1H5lqG_orig.jpg",
    hasVideo: true,
  },
  {
    name: "شيخه",
    rating: 5,
    text: "جميييل و مريييح بصراحه و ما تحسين فيه ابداً و ما يبين تحت الملابس و هذا اهم شي",
    verified: false,
    image: "https://images.loox.io/uploads/2026/1/2/2ZAZNHUwe_8K5aETyRE_orig.jpg",
    hasVideo: true,
  },
  {
    name: "سميه",
    rating: 5,
    text: "حلو ومريح جداً",
    variant: "L / Natural",
    verified: true,
    image: "https://images.loox.io/uploads/2026/4/3/kUM6pT5Fm.jpg",
    hasVideo: true,
  },
  {
    name: "Amal",
    rating: 5,
    text: "1. تنحيف وشد الجسم ويساعد المشد على تنحيف الخصر والبطن مباشرة بعد ارتدائه\n\n2. يخفي الترهلات والدهون تحت الملابس و تصميمه يساعد على إخفاء الترهلات وخطوط الدهون في منطقة البطن والخصر، مما يساعد على تحسين الوضعية عند الوقوف أو الجلوس.\n\n٣-خامة مريحة وقابلة للتنفس\n\n٤. غير مرئي تحت الملابس",
    variant: "M / Beige",
    verified: true,
    image: "https://images.loox.io/uploads/2025/12/21/_nnf4Wd4Hf.jpg",
    hasVideo: false,
  },
  {
    name: "امجاد",
    rating: 5,
    text: "المشد رائع جدا ومقاسة ممتاز وضبط لي جسمي بالذات منطقة البطن والخصر",
    variant: "M / Beige",
    verified: true,
    image: "https://images.loox.io/uploads/2025/7/6/YGOWuH_I6_orig.jpg",
    hasVideo: true,
  },
  {
    name: "محمد",
    rating: 4,
    text: "مريح جيد 🌸🌸لكن لو كان بنفس المواصفات مع اسفنج بالخلف لكان رائع",
    variant: "2XL / Beige",
    verified: false,
    image: "https://images.loox.io/uploads/2025/4/11/PVi59xzvZ.jpg",
    hasVideo: false,
  },
  {
    name: "Afnan",
    rating: 5,
    text: "يجنن وفيه لاصق يثبت بالجلد مايتزحزح او ينزل تحت تجربتي منهم ممتازه وبكرر التجربه بمشد ثاني 😍",
    variant: "S / Beige",
    verified: true,
    image: "https://images.loox.io/uploads/2026/5/4/dUgfQOE_H9.jpg",
    hasVideo: false,
  },
  {
    name: "Maha",
    rating: 5,
    text: "المشد خفيف ورائع يرتب الجسم بدون مايضايق والتوصيل سريييع",
    variant: "S / Beige",
    verified: true,
    image: "https://images.loox.io/uploads/2025/3/31/mEPdKkdn0_orig.jpg",
    hasVideo: true,
  },
];

function attachReviewVideos(rows) {
  let vidIdx = 0;
  return rows.map((r) => {
    if (typeof r.video === "string" && r.video.trim()) {
      return { ...r, video: r.video.trim() };
    }
    if (!r.hasVideo) return { ...r, video: undefined };
    const video =
      METRO_REVIEW_VIDEO_URLS[vidIdx % METRO_REVIEW_VIDEO_URLS.length];
    vidIdx += 1;
    return { ...r, video };
  });
}

const STATIC_REVIEWS = attachReviewVideos(STATIC_REVIEWS_RAW);

function mapCatalogReviews(rows) {
  if (!Array.isArray(rows) || !rows.length) return null;
  return rows.map((r) => {
    const v = typeof r.video === "string" && r.video.trim() ? r.video.trim() : undefined;
    return {
      name: r.name,
      rating: r.rating ?? 5,
      text: r.text,
      variant: [r.city, r.date].filter(Boolean).join(" · ") || r.variant,
      verified: r.verified !== false,
      image: r.image,
      video: v,
      hasVideo: !!v,
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

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-base font-bold">
            {countLabel} {titleSuffix}
          </span>
          <span className="text-muted-foreground">✓</span>
        </div>
        <button type="button" className="p-2 border border-border rounded-lg">
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {displayedReviews.map((review, index) => (
          <ReviewCard key={`${review.name}-${index}`} review={review} />
        ))}
      </div>

      {!showAll && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            className="rounded-full px-8 font-bold"
            onClick={() => setShowAll(true)}
          >
            عرض المزيد من التقييمات
          </Button>
        </div>
      )}
    </div>
  );
}
