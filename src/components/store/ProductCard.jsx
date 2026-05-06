import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product, index = 0 }) {
  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group block elegant-surface rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <div className="absolute inset-0 bg-gray-100 animate-pulse" aria-hidden="true" />
          <img
            src={product.images?.[0] || "/images/products/product-default.webp"}
            alt={product.name}
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/products/product-default.svg"; }}
            className="relative w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {product.badge && (
            <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-[10px] font-bold px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">
              -{discount}٪
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex drop-shadow-sm">
              {[1,2,3,4,5].map(s => (
                <svg 
                  key={s} 
                  className={`w-3.5 h-3.5 ${s <= (product.rating || 5) ? "text-[#FFA41C] fill-[#FFA41C]" : "text-gray-300 fill-gray-300"}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-[#007185] hover:text-[#C45500] cursor-pointer transition-colors">
              {product.reviews_count?.toLocaleString() || 0} تقييم
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-black">{product.price} ر.س</span>
            {product.compare_price && (
              <span className="text-xs text-gray-400 line-through">{product.compare_price} ر.س</span>
            )}
          </div>

            {/* Buy Button */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-md">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                متوفر
              </span>
              <button className="flex items-center justify-center gap-1.5 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-800 transition-all shadow-md shadow-slate-200">
                <ShoppingBag className="w-3.5 h-3.5" />
                اطلب الآن
              </button>
            </div>
        </div>
      </Link>
    </motion.div>
  );
}