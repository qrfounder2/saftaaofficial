import React, { useState } from 'react';
import { Star, SlidersHorizontal, ChevronDown } from 'lucide-react';
import ReviewCard from './ReviewCard';
import { Button } from '@/components/ui/button';

// Static reviews matching the real site
const STATIC_REVIEWS = [
  {
    id: 's1', author: 'ام', rating: 5, verified: true,
    content: 'يجنن المشد ماشاء الله روعه ومريحه وينحت الجسم جوده ممتازة',
    variant: 'L / Beige',
    image_url: 'https://images.loox.io/uploads/2026/4/15/i113sMH6y_IM-sWRvAg_orig.jpg',
    video_url: 'https://images.loox.io/uploads/2026/4/15/i113sMH6y_IM-sWRvAg_orig.jpg',
    thumb_url: 'https://images.loox.io/uploads/2026/4/15/i113sMH6y_IM-sWRvAg_orig.jpg',
    is_video: true,
  },
  {
    id: 's2', author: 'حنان', rating: 5, verified: true,
    content: 'اقسم بالله أجمل شي استخدمته … مريح جداااا يرتب الجسم\nشي خورافي من الاخررر 😍😍😍 شكرا مترو برازيل اجمل منتج 🌹',
    variant: '3XL / Natural',
    image_url: 'https://images.loox.io/uploads/2026/4/18/eRFsJoFSX_I3w-87HPl_orig.jpg',
    video_url: 'https://images.loox.io/uploads/2026/4/18/eRFsJoFSX_I3w-87HPl_orig.jpg',
    thumb_url: 'https://images.loox.io/uploads/2026/4/18/eRFsJoFSX_I3w-87HPl_orig.jpg',
    is_video: true,
  },
  {
    id: 's3', author: 'نادية', rating: 5, verified: true,
    content: 'مريح جدا علي الجسم وبيشد فعلا بس خدوا أصغر من مقاسكم درجه',
    variant: '2XL / Beige',
    image_url: 'https://images.loox.io/uploads/2026/1/12/mI5uh9_iP_sLn1H5lqG_orig.jpg',
    video_url: 'https://images.loox.io/uploads/2026/1/12/mI5uh9_iP_sLn1H5lqG_orig.jpg',
    thumb_url: 'https://images.loox.io/uploads/2026/1/12/mI5uh9_iP_sLn1H5lqG_orig.jpg',
    is_video: true,
  },
  {
    id: 's4', author: 'شيخه', rating: 5, verified: true,
    content: 'جميييل و مريييح بصراحه و ما تحسين فيه ابداً و ما يبين تحت الملابس و هذا اهم شي',
    variant: '',
    image_url: 'https://images.loox.io/uploads/2026/1/2/2ZAZNHUwe_8K5aETyRE_orig.jpg',
    video_url: 'https://images.loox.io/uploads/2026/1/2/2ZAZNHUwe_8K5aETyRE_orig.jpg',
    thumb_url: 'https://images.loox.io/uploads/2026/1/2/2ZAZNHUwe_8K5aETyRE_orig.jpg',
    is_video: true,
  },
  {
    id: 's5', author: 'سميه', rating: 5, verified: true,
    content: 'حلو ومريح جداً',
    variant: 'L / Natural',
    image_url: 'https://images.loox.io/uploads/2026/4/3/kUM6pT5Fm.jpg',
    is_video: false,
  },
  {
    id: 's6', author: 'Amal', rating: 5, verified: true,
    content: '1. تنحيف وشد الجسم ويساعد المشد على تنحيف الخصر والبطن مباشرة بعد ارتدائه\n\n2. يخفي الترهلات والدهون تحت الملابس و تصميمه يساعد على إخفاء الترهلات وخطوط الدهون في منطقة البطن والخصر\n\n٣-خامة مريحة وقابلة للتنفس، ويسمح بمرور الهواء\n\n٤. غير مرئي تحت الملابس',
    variant: 'M / Beige',
    image_url: 'https://images.loox.io/uploads/2025/12/21/_nnf4Wd4Hf.jpg',
    is_video: false,
  },
  {
    id: 's7', author: 'امجاد', rating: 5, verified: true,
    content: 'المشد رائع جدا ومقاسة ممتاز وضبط لي جسمي بالذات منطقة البطن والخصر',
    variant: 'M / Beige',
    image_url: 'https://images.loox.io/uploads/2025/7/6/YGOWuH_I6_orig.jpg',
    video_url: 'https://images.loox.io/uploads/2025/7/6/YGOWuH_I6_orig.jpg',
    thumb_url: 'https://images.loox.io/uploads/2025/7/6/YGOWuH_I6_orig.jpg',
    is_video: true,
  },
  {
    id: 's8', author: 'محمد', rating: 4, verified: true,
    content: 'مريح جيد 🌸🌸لكن لو كان بنفس المواصفات مع اسفنج بالخلف لكان رائع',
    variant: '2XL / Beige',
    image_url: 'https://images.loox.io/uploads/2025/4/11/PVi59xzvZ.jpg',
    is_video: false,
    reply: 'شكراً لمشاركة التجربة ويسعدنا أن المنتج قد نال اعجابك\nموجود مشد مع حشوات 74382',
  },
  {
    id: 's9', author: 'Afnan', rating: 5, verified: true,
    content: 'يجنن وفيه لاصق يثبت بالجلد مايتزحزح او ينزل تحت\nتجربتي منهم ممتازه وبكرر التجربه بمشد ثاني 😍',
    variant: 'S / Beige',
    image_url: 'https://images.loox.io/uploads/2025/4/4/dUgfQOE_H9.jpg',
    is_video: false,
    extra_images: 2,
  },
  {
    id: 's10', author: 'Maha', rating: 5, verified: true,
    content: 'المشد خفيف ورائع يرتب الجسم بدون مايضايق والتوصيل سريييع',
    variant: 'S / Beige',
    image_url: 'https://images.loox.io/uploads/2025/3/31/mEPdKkdn0_orig.jpg',
    video_url: 'https://images.loox.io/uploads/2025/3/31/mEPdKkdn0_orig.jpg',
    thumb_url: 'https://images.loox.io/uploads/2025/3/31/mEPdKkdn0_orig.jpg',
    is_video: true,
  },
];

export default function ReviewsSection({ productId, totalCount = 472 }) {
  const [showAll, setShowAll] = useState(false);
  const PAGE_SIZE = 5;

  const displayedReviews = showAll ? STATIC_REVIEWS : STATIC_REVIEWS.slice(0, PAGE_SIZE);

  const avgRating = 5;

  return (
    <div id="looxReviews" className="py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button className="w-9 h-9 border border-border rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
          <span className="font-bold text-sm">{totalCount} التقييمات</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
            ))}
          </div>
        </div>
      </div>

      {/* Review cards */}
      <div className="space-y-3">
        {displayedReviews.map(review => (
          <ReviewCard
            key={review.id}
            review={{
              ...review,
              video_url: review.is_video ? review.video_url : undefined,
            }}
          />
        ))}
      </div>

      {/* Load more */}
      {!showAll && STATIC_REVIEWS.length > PAGE_SIZE && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAll(true)}
            className="rounded-xl px-8 h-11"
          >
            عرض المزيد من التقييمات
          </Button>
        </div>
      )}
    </div>
  );
}