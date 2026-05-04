import React from "react";
import { motion } from "framer-motion";

// Realistic Unsplash portraits representing diverse Middle Eastern/Saudi demographics
export const homepageReviews = [
  {
    name: "أبو عبدالله",
    city: "الرياض",
    text: "والله ما صدّقت! كنت أعاني من خشونة الركبة ٥ سنوات، وبعد أسبوع واحد فقط حسيت بفرق كبير. المنتج فادني بشكل ملحوظ.",
    rating: 5,
    avatar: "/images/reviews/saudi-man-1.webp",
    platform: "google",
    date: "منذ ٣ أسابيع",
  },
  {
    name: "أم محمد",
    city: "جدة",
    text: "أمي عمرها ٦٥ سنة وتعاني من عرق النسا، طلبنا المنتج وبعد ١٠ أيام صارت تمشي بدون ألم. شكراً لكم.",
    rating: 5,
    avatar: "/images/reviews/saudi-woman-1.webp",
    platform: "google",
    date: "منذ شهر",
  },
  {
    name: "فهد العتيبي",
    city: "الدمام",
    text: "أنا رياضي وكنت أعاني من آلام الظهر بعد التمارين. هالكريم صار رفيقي الدائم، نتائج سريعة وطبيعي ١٠٠٪",
    rating: 5,
    avatar: "/images/reviews/saudi-man-2.webp",
    platform: "snapchat",
    date: "منذ ٢ أسبوعين",
  },
  {
    name: "نورة الشمري",
    city: "بريدة",
    text: "طلبت ٣ عبوات وكانت أحسن قرار! وزّعتها على أهلي وكلهم شاكرين. المنتج ممتاز والتوصيل سريع جداً.",
    rating: 5,
    avatar: "/images/reviews/saudi-woman-2.webp",
    platform: "tiktok",
    date: "منذ ٥ أيام",
  },
];

export const productReviews = [
  {
    name: "سعد المري",
    city: "حائل",
    text: "استخدمته لآلام المفاصل اللي كانت تمنعني من النوم، وبصراحة النتيجة مبهرة من أول ثلاث أيام.",
    rating: 5,
    avatar: "/images/reviews/saudi-man-3.webp",
    platform: "google",
    date: "منذ يومين",
  },
  {
    name: "سارة القحطاني",
    city: "الرياض",
    text: "المنتج ريحته مقبولة وامتصاصه سريع، استخدمته لرقبتي بسبب الجلوس الطويل على المكتب وفعلاً فرق معي.",
    rating: 5,
    avatar: "/images/reviews/saudi-woman-3.webp",
    platform: "snapchat",
    date: "منذ أسبوع",
  },
  {
    name: "أبو خالد",
    city: "القصيم",
    text: "ممتاز جداً للوالد، كان يشتكي من خشونة الركبة والآن وضعه أفضل بكثير ولله الحمد.",
    rating: 5,
    avatar: "/images/reviews/saudi-man-4.webp",
    platform: "tiktok",
    date: "منذ ٣ أسابيع",
  },
  {
    name: "عبدالرحمن الشهري",
    city: "أبها",
    text: "توصيل سريع وتغليف ممتاز. المنتج يستاهل كل ريال تدفعه فيه، فعال جداً لآلام أسفل الظهر.",
    rating: 5,
    avatar: "/images/reviews/saudi-man-5.webp",
    platform: "google",
    date: "منذ شهر",
  },
];

// Clean minimal platform icons using brand colors + letters (no external image deps)
function PlatformBadge({ platform }) {
  if (platform === "google") {
    return (
      <div className="flex items-center gap-1">
        {/* Real Google G logo SVG inline */}
        <svg width="14" height="14" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          <path fill="none" d="M0 0h48v48H0z"/>
        </svg>
        <span className="text-[10px] text-muted-foreground font-medium">Google</span>
      </div>
    );
  }
  if (platform === "snapchat") {
    return (
      <div className="flex items-center gap-1 bg-yellow-300/20 rounded-full px-1.5 py-0.5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFFC00">
          <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.878 4.791-4.014l.015-.015c.182-.344.211-.644.12-.868-.195-.434-.884-.658-1.332-.809-.121-.045-.24-.09-.345-.135-1.214-.39-1.333-.93-1.154-1.34.211-.42.76-.643 1.289-.643.18 0 .345.029.479.09.375.165.765.27 1.034.27.218 0 .363-.06.423-.09l-.029-.51c-.104-1.638-.225-3.679.3-4.857C7.85 1.13 11.206.793 12.206.793z"/>
        </svg>
        <span className="text-[10px] font-medium text-yellow-700">Snapchat</span>
      </div>
    );
  }
  if (platform === "tiktok") {
    return (
      <div className="flex items-center gap-1 bg-black/5 rounded-full px-1.5 py-0.5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.72a8.18 8.18 0 004.78 1.52V6.79a4.85 4.85 0 01-1.01-.1z"/>
        </svg>
        <span className="text-[10px] font-medium">TikTok</span>
      </div>
    );
  }
  return null;
}

export default function Testimonials({ type = "home" }) {
  const reviews = type === "product" ? productReviews : homepageReviews;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-accent bg-accent/10 px-4 py-1.5 rounded-full">
            تقييمات العملاء
          </span>
          <h2 className="text-2xl md:text-4xl font-black mt-4">
            +٥٠,٠٠٠ عميل يثق بنا
          </h2>

          {/* Trustpilot-style aggregate rating */}
          <div className="inline-flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-2xl px-6 py-3 shadow-sm mt-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-gray-900">ممتاز</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <div key={s} className="bg-[#00B67A] p-1 rounded-sm">
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 20 20">
                      <path d="M10 1.3l2.388 6.722H19.2l-5.606 4.318 2.141 6.81L10 15.111l-5.735 4.04 2.141-6.81L.8 8.022h6.812L10 1.3z" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              بناءً على <strong>٢,٨٤٣ تقييم</strong> عبر
              <span className="font-bold text-black flex items-center gap-1 ml-1">
                <svg width="14" height="14" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
                Google
              </span>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-border/50 hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Top: stars + platform */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <PlatformBadge platform={review.platform} />
              </div>

              {/* Review text */}
              <p className="text-sm leading-relaxed text-foreground/80 flex-1 mb-4">{review.text}</p>

              {/* Bottom: avatar + name */}
              <div className="flex items-center gap-2.5 pt-3 border-t border-border/30">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover bg-muted border border-border/40"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">{review.name}</p>
                  <p className="text-[10px] text-muted-foreground">{review.city} · {review.date}</p>
                </div>
                <div className="flex items-center gap-0.5 text-[10px] text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded-full shrink-0">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  موثّق
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}