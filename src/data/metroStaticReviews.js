import { METRO_REVIEW_VIDEO_URLS } from "@/data/metroReviewVideos";

/** مصدر واحد لقائمة التقييمات الثابتة + متوسطها (يُعرض في الـ PDP وقسم التقييمات) */
export const STATIC_METRO_REVIEWS_RAW = [
  {
    name: "أم فيصل",
    rating: 5,
    text: "الله يبارك المشد ما شاء الله… مريح ويظبط الجسم تحت العباية، والخامة حسيتها من أول يوم.",
    verified: true,
    image: "https://images.loox.io/uploads/2026/4/15/i113sMH6y_IM-sWRvAg_orig.jpg",
    hasVideo: true,
    video: METRO_REVIEW_VIDEO_URLS[0],
  },
  {
    name: "حنان",
    rating: 5,
    text: "من الراحة للتشكيل يعطيني ثقة طول اليوم. طلبت من الرياض ووصلني بسرعة الحمد لله.",
    verified: true,
    image: "https://images.loox.io/uploads/2026/4/18/eRFsJoFSX_I3w-87HPl_orig.jpg",
    hasVideo: true,
    video: METRO_REVIEW_VIDEO_URLS[1],
  },
  {
    name: "نادية",
    rating: 5,
    text: "مريح ويشد، بس أنصحكم تأخذون مقاس أصغر إذا حابين ضغط أوضح — أنا رجعت بدّلت ومضبوط الحين.",
    verified: true,
    image: "https://images.loox.io/uploads/2026/1/12/mI5uh9_iP_sLn1H5lqG_orig.jpg",
    hasVideo: true,
    video: METRO_REVIEW_VIDEO_URLS[2],
  },
  {
    name: "شيخة",
    rating: 5,
    text: "ما يبان تحت الملابس وهذا أهم شي للدوام. مريح حتى مع الجلوس الطويل.",
    verified: false,
    image: "https://images.loox.io/uploads/2026/1/2/2ZAZNHUwe_8K5aETyRE_orig.jpg",
    hasVideo: true,
    video: METRO_REVIEW_VIDEO_URLS[3],
  },
  {
    name: "سمية",
    rating: 5,
    text: "حلو ومريح، بس أتمنى لون «طبيعي» يبان أوضح في الصور عشان المقارنة.",
    verified: true,
    image: "https://images.loox.io/uploads/2026/4/3/kUM6pT5Fm.jpg",
    hasVideo: false,
  },
  {
    name: "أمل",
    rating: 5,
    text: "يعطي شكل أنظف تحت الملابس وما يضيقني. التجربة حلوة بس الوصف كان طويل شوي 😄",
    verified: true,
    image: "https://images.loox.io/uploads/2025/12/21/_nnf4Wd4Hf.jpg",
    hasVideo: false,
  },
  {
    name: "أمجاد",
    rating: 5,
    text: "الخصر والبطن صاروا أوضح، والمقاس طلع مثل الجدول — أنصح فيه.",
    verified: true,
    image: "https://images.loox.io/uploads/2025/7/6/YGOWuH_I6_orig.jpg",
    hasVideo: false,
  },
  {
    name: "محمد",
    rating: 4,
    text: "مريح بشكل عام، بس كنت أتمنى دعم أقوى للظهر لطول الجلوس في الشغل.",
    verified: false,
    image: "https://images.loox.io/uploads/2025/4/11/PVi59xzvZ.jpg",
    hasVideo: false,
  },
  {
    name: "أفنان",
    rating: 5,
    text: "اللاصق ممتاز ما يتحرك مع المشي، وبكرر التجربة بمقاس ثاني إن شاء الله 😍",
    verified: true,
    image: "https://images.loox.io/uploads/2026/5/4/dUgfQOE_H9.jpg",
    hasVideo: false,
  },
  {
    name: "مها",
    rating: 5,
    text: "خفيف ويظبط الجسم بدون ما يضايق، والتوصيل للشرقية كان مرتب.",
    verified: true,
    image: "https://images.loox.io/uploads/2025/3/31/mEPdKkdn0_orig.jpg",
    hasVideo: false,
  },
];

export const STATIC_METRO_REVIEW_AVG =
  STATIC_METRO_REVIEWS_RAW.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / STATIC_METRO_REVIEWS_RAW.length;
