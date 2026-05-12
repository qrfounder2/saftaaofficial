import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BADGE_MAP = {
  bestseller: { label: 'الأكثر مبيعاً', className: 'bg-primary text-primary-foreground' },
  sale: { label: 'خصم', className: 'bg-destructive text-destructive-foreground' },
  new: { label: 'جديد', className: 'bg-accent text-accent-foreground' },
  selling_fast: { label: 'يباع بسرعة', className: 'bg-accent text-accent-foreground' },
};

export default function ProductCard({ product }) {
  const badge = BADGE_MAP[product.badge];
  const hasDiscount = product.original_price && product.original_price > product.price;

  return (
    <Link
      to={`/product/${encodeURIComponent(product.slug || product.id)}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-xl bg-secondary aspect-[3/4]">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.free_shipping && (
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-foreground text-[10px] gap-1">
              <Truck className="w-3 h-3" />
              شحن مجاني
            </Badge>
          )}
          {badge && (
            <Badge className={`${badge.className} text-[10px]`}>
              {badge.label}
            </Badge>
          )}
          {hasDiscount && (
            <Badge className="bg-destructive text-destructive-foreground text-[10px]">
              خصم
            </Badge>
          )}
        </div>

        {/* Color swatches */}
        {product.colors?.length > 0 && (
          <div className="absolute bottom-2 right-2 flex gap-1">
            {product.colors.slice(0, 4).map((c, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: c.hex }}
                title={c.name_ar}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 px-1">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-muted-foreground transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        {product.review_count > 0 && (
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.round(product.rating) ? 'fill-accent text-accent' : 'fill-muted text-muted'}`} />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground">({product.review_count})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-black">{product.price} ر.س</span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">{product.original_price} ر.س</span>
          )}
        </div>
      </div>
    </Link>
  );
}