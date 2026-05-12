import React, { useState, useRef, useEffect, useMemo } from "react";
import { Star, BadgeCheck, Volume2, VolumeX } from "lucide-react";
import { stripMetroReviewVariantNoise } from "@/lib/metroReviewText";

function InlineVideo({ src, poster }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-pointer"
      onClick={() => setMuted((m) => !m)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setMuted((m) => !m);
        }
      }}
      aria-label={muted ? "تشغيل الصوت" : "كتم الصوت"}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-1 start-1 w-6 h-6 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white pointer-events-none">
        {muted ? <VolumeX className="w-3 h-3" aria-hidden /> : <Volume2 className="w-3 h-3" aria-hidden />}
      </div>
    </div>
  );
}

export default function ReviewCard({ review }) {
  const body = useMemo(() => stripMetroReviewVariantNoise(review?.text), [review?.text]);
  const filledStars = Math.min(5, Math.max(0, Math.floor(Number(review?.rating) || 0)));

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex gap-3">
        {review.image && (
          <div className="relative w-24 h-28 shrink-0 rounded-xl overflow-hidden bg-muted">
            {review.video ? (
              <InlineVideo src={review.video} poster={review.image} />
            ) : (
              <img src={review.image} alt="" className="w-full h-full object-cover" loading="lazy" />
            )}
          </div>
        )}

        <div className="flex-1 text-start min-w-0">
          <div className="flex items-center gap-1.5 justify-start mb-1">
            <span className="font-black text-sm">{review.name}</span>
            {review.verified && <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" aria-hidden />}
          </div>

          <div className="mb-2 flex justify-start gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < filledStars ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{body}</p>
        </div>
      </div>
    </div>
  );
}
