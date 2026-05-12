import React from 'react';
import { Star, Truck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RecommendedProducts({ products }) {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-black text-center mb-2">ننصحك بشراء</h2>
      <div className="w-12 h-0.5 bg-primary mx-auto mb-8" />

      <div className="grid grid-cols-2 gap-3">
        {products.map((product, index) => (
          <Link
            key={product.link || index}
            to={product.link || '/categories'}
            className="group block"
          >
            {/* Image */}
            <div className="relative aspect-[3/4] bg-white rounded-xl overflow-hidden mb-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Badges */}
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                {product.bestSeller && (
                  <span className="bg-pink-200 text-pink-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    الأكثر مبيعاً
                  </span>
                )}
                {product.discount && typeof product.discount === 'number' && (
                  <span className="bg-yellow-300 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                    🎉 خصم {product.discount}%
                  </span>
                )}
                {product.discount && typeof product.discount === 'boolean' && (
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                    خصم
                  </span>
                )}
              </div>

              {/* Bottom badges */}
              <div className="absolute bottom-2 right-2 flex flex-col gap-1">
                {product.freeShipping && (
                  <span className="bg-yellow-300 text-black text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    شحن مجاني
                    <Truck className="w-3 h-3" />
                  </span>
                )}
                {product.fastSelling && (
                  <span className="bg-yellow-300 text-black text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    يباع بسرعة
                    <Clock className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <h3 className="font-bold text-xs leading-snug mb-1 line-clamp-2">
              {product.name}
            </h3>

            {/* Compression */}
            {product.compression && (
              <p className="text-[10px] font-bold mb-0.5">
                <span className="inline-block ml-1">▐▌</span>
                ضغط {product.compression}
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-1 mb-1">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-none text-yellow-400'}`} />
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground">({product.reviewCount})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              {product.oldPrice && (
                <span className="text-xs text-muted-foreground line-through">ر.س {product.oldPrice}</span>
              )}
              <span className="font-black text-sm">ر.س {product.price}</span>
            </div>

            {/* Colors */}
            {product.colors && (
              <div className="flex gap-1.5 mt-1.5">
                {product.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}