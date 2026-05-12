import React from "react";
import { Star } from "lucide-react";

/** صف نجوم مع نصف نجمة تقريبي — مطابق لعنوان قسم التقييمات */
export default function MetroReviewStarRow({ value, size = "md" }) {
  const v = Math.min(5, Math.max(0, Number(value) || 0));
  const full = Math.floor(v);
  const partial = v - full;
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4 sm:h-[18px] sm:w-[18px]";

  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => {
        if (i < full) {
          return <Star key={i} className={`${icon} fill-amber-400 text-amber-400`} />;
        }
        if (i === full && partial >= 0.25) {
          return (
            <span key={i} className={`relative inline-block shrink-0 ${icon}`}>
              <Star className={`absolute inset-0 ${icon} fill-neutral-200 text-neutral-200`} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${Math.round(partial * 100)}%` }}>
                <Star className={`${icon} fill-amber-400 text-amber-400`} />
              </span>
            </span>
          );
        }
        return <Star key={i} className={`${icon} fill-neutral-200 text-neutral-200`} />;
      })}
    </div>
  );
}
