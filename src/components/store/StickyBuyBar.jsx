import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function StickyBuyBar({ product, onBuy }) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-border shadow-2xl shadow-black/10 p-3 md:hidden"
    >
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground line-clamp-1">{product.name}</p>
          <p className="font-black text-black text-lg">{product.price} ر.س</p>
        </div>
        <button
          onClick={onBuy}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-black text-base hover:bg-gray-800 transition-all shadow-lg shadow-black/20"
        >
          <ShoppingBag className="w-4 h-4" />
          اطلب الآن
        </button>
      </div>
    </motion.div>
  );
}