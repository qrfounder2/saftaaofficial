import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import StoreBadge from "@/components/launchMetro/StoreBadge";

export default function ProductCard({ product }) {
  const priceShow = product.priceLabel ?? product.price;

  return (
    <Link to={product.link || "/categories"} className="group block">
      <div className="relative aspect-[3/4] bg-gray-50 rounded-2xl overflow-hidden mb-2.5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute top-2 end-2 flex flex-col gap-1 items-end">
          {product.bundle && (
            <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded-full">
              مجموعة توفير
            </span>
          )}
          {product.bundle && product.bundleDiscountPct != null && (
            <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              خصم {product.bundleDiscountPct}%
            </span>
          )}
          {product.bestSeller && (
            <span className="bg-pink-100 text-pink-800 text-[10px] font-black px-2 py-0.5 rounded-full">
              الأكثر مبيعاً
            </span>
          )}
          {product.discount && typeof product.discount === "number" && (
            <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              خصم {product.discount}%
            </span>
          )}
          {product.discount === true && (
            <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              خصم
            </span>
          )}
        </div>

        <div className="absolute bottom-2 end-2 flex flex-col gap-1 items-end">
          {product.freeShipping && <StoreBadge variant="freeShipping" size="sm" />}
          {product.fastSelling && <StoreBadge variant="fastSelling" size="sm" />}
        </div>
      </div>

      <h3 className="font-bold text-xs leading-snug mb-1 line-clamp-2">{product.name}</h3>

      {product.compression && (
        <p className="text-[10px] font-bold text-gray-500 mb-0.5">
          ▐▌ ضغط {product.compression}
        </p>
      )}

      {product.reviewCount > 0 && (
        <div className="flex items-center gap-1 mb-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
        </div>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        {product.oldPrice && (
          <span className="text-xs text-gray-400 line-through">ر.س {product.oldPrice}</span>
        )}
        <span className="font-black text-sm">ر.س {priceShow}</span>
      </div>

      {product.colors && (
        <div className="flex gap-1.5 mt-1.5">
          {product.colors.map((c, i) => (
            <span
              key={i}
              className="w-3.5 h-3.5 rounded-full border border-gray-200 inline-block"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      )}
    </Link>
  );
}
