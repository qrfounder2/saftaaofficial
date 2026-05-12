import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/shapebrazil/product/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function ProductGrid({ title, products, showViewAll = true }) {
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-black">{title}</h2>
          {showViewAll && (
            <Link to="/collections">
              <Button variant="ghost" className="gap-1 text-sm font-semibold">
                عرض الكل
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}