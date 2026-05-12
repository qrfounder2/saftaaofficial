import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CATEGORIES = [
  { label: 'مشدات برمودا', slug: 'bermuda', color: 'bg-rose-50' },
  { label: 'مشدات كاملة', slug: 'body', color: 'bg-amber-50' },
  { label: 'مشدات خصر', slug: 'vest', color: 'bg-violet-50' },
  { label: 'حمالات صدر', slug: 'bra', color: 'bg-sky-50' },
];

export default function CategoryBanner() {
  return (
    <section className="py-10 sm:py-14 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-black mb-6 sm:mb-8 text-center">تسوقي حسب القسم</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              to={`/collections?cat=${cat.slug}`}
              className={`${cat.color} rounded-2xl p-6 sm:p-8 text-center group hover:shadow-lg transition-all duration-300`}
            >
              <h3 className="text-base sm:text-lg font-bold mb-2">{cat.label}</h3>
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                <span>تصفحي</span>
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}