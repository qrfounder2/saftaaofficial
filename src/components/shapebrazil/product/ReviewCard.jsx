import React, { useState } from 'react';
import { Star, Play } from 'lucide-react';
import { CheckCircle } from 'lucide-react';

export default function ReviewCard({ review }) {
  const [videoPlaying, setVideoPlaying] = useState(false);

  const hasMedia = review.image_url || review.video_url;
  const isVideo = !!review.video_url;

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-white">
      <div className="flex gap-0">
        {/* Media thumbnail */}
        {hasMedia && (
          <div className="w-28 sm:w-36 flex-shrink-0 relative bg-secondary">
            {isVideo ? (
              <div
                className="relative w-full h-full min-h-[130px] cursor-pointer"
                onClick={() => setVideoPlaying(true)}
              >
                {videoPlaying ? (
                  <video
                    src={review.video_url}
                    autoPlay
                    controls
                    className="w-full h-full object-cover"
                    style={{ minHeight: 130 }}
                  />
                ) : (
                  <>
                    <img
                      src={review.image_url || review.thumb_url}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{ minHeight: 130 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-foreground text-foreground ml-0.5" />
                      </div>
                    </div>
                    {review.extra_images > 0 && (
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-1.5 py-0.5">
                        {review.extra_images}+
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="relative w-full h-full min-h-[130px]">
                <img
                  src={review.image_url}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ minHeight: 130 }}
                />
                {review.extra_images > 0 && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-1.5 py-0.5">
                    {review.extra_images}+
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-4 text-right">
          {/* Author + verified */}
          <div className="flex items-center justify-end gap-1.5 mb-1.5">
            <span className="font-bold text-sm">{review.author}</span>
            {review.verified && (
              <CheckCircle className="w-4 h-4 text-foreground fill-foreground flex-shrink-0" />
            )}
          </div>

          {/* Stars */}
          <div className="flex gap-0.5 justify-end mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < review.rating ? 'fill-accent text-accent' : 'fill-muted text-muted'}`}
              />
            ))}
          </div>

          {/* Text */}
          <p className="text-sm leading-relaxed text-foreground">{review.content}</p>

          {/* Store reply */}
          {review.reply && (
            <div className="mt-3 bg-secondary rounded-lg p-2.5 text-right">
              <p className="text-xs font-bold text-muted-foreground mb-1">METRO BRAZIL تم الرد عليه:</p>
              <p className="text-xs leading-relaxed">{review.reply}</p>
            </div>
          )}

          {/* Variant */}
          {review.variant && (
            <div className="mt-2">
              <span className="text-xs text-muted-foreground">نوع المنتج: </span>
              <span className="text-xs font-semibold">{review.variant}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}