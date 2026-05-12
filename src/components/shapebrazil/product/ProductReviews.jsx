import React from 'react';
import { Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

/** Placeholder: dynamic reviews API not wired in this storefront. */
export default function ProductReviews({ productId }) {
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => [],
    enabled: !!productId,
  });

  if (reviews.length === 0) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-lg font-bold mb-2">تقييمات العملاء</h3>
        <p className="text-sm text-muted-foreground">لا توجد تقييمات بعد. كوني أول من يكتب تقييماً!</p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <h3 className="text-lg font-bold mb-6">تقييمات العملاء ({reviews.length})</h3>
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-bold">
                  {review.author?.[0]}
                </div>
                <span className="text-sm font-semibold">{review.author}</span>
                {review.verified && (
                  <span className="text-[10px] bg-success/10 text-success px-2 py-0.5 rounded-full font-medium">مشترٍ موثّق</span>
                )}
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-accent text-accent' : 'fill-muted text-muted'}`} />
                ))}
              </div>
            </div>
            <p className="text-sm leading-relaxed">{review.content}</p>
            {review.variant && (
              <p className="text-xs text-muted-foreground mt-2">نوع المنتج: {review.variant}</p>
            )}
            {review.image_url && (
              <img src={review.image_url} alt="" className="w-20 h-20 object-cover rounded-lg mt-3" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
