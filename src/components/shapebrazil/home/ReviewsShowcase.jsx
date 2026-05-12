import React from 'react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  { name: 'سارة م.', text: 'المشد رائع ومريح جداً، ينحت الجسم بشكل ملحوظ. أنصح فيه بشدة!', rating: 5, variant: 'L / Natural' },
  { name: 'نورة ع.', text: 'أجمل شي استخدمته، مريح جداً يرتب الجسم. شيء خرافي!', rating: 5, variant: '3XL / Natural' },
  { name: 'هند ك.', text: 'مريح جداً على الجسم وبيشد فعلاً. خذوا أصغر من مقاسكم درجة.', rating: 5, variant: '2XL / Beige' },
  { name: 'شيخة أ.', text: 'جميل ومريح وما تحسين فيه أبداً وما يبين تحت الملابس.', rating: 5, variant: 'M / Black' },
];

export default function ReviewsShowcase() {
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-black mb-2 text-center">ماذا تقول عميلاتنا</h2>
        <p className="text-sm text-muted-foreground text-center mb-8">آراء حقيقية من عميلات حقيقيات</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((review, i) => (
            <div key={i} className="bg-secondary/50 border border-border rounded-2xl p-5 hover:shadow-md transition-shadow">
              <Quote className="w-6 h-6 text-accent/40 mb-3" />
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? 'fill-accent text-accent' : 'fill-muted text-muted'}`} />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-4">{review.text}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold">{review.name}</span>
                <span className="text-muted-foreground">{review.variant}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}