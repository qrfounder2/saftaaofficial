import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

/**
 * @param {{ product: object, onBuy: () => void, displayPrice?: number, packSummary?: string | null }} props
 */
export default function StickyBuyBar({ product, onBuy, displayPrice, packSummary }) {
  const price = displayPrice ?? product.price;
  const isLifestyle = product.category === "lifestyle";
  const subtitle =
    packSummary ||
    (isLifestyle ? "اختر الباقة في الصفحة — الدفع عند الاستلام" : "شامل الضريبة");

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-t border-slate-200/60 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] p-3 md:hidden pb-safe"
    >
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-slate-500 font-bold mb-0.5 truncate">{subtitle}</p>
          <p className="font-black text-slate-900 text-xl leading-none">
            {price}{" "}
            <span className="text-sm font-bold text-slate-500">ر.س</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onBuy}
          className="flex items-center justify-center gap-2 bg-slate-900 text-white w-48 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95 shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          {isLifestyle ? "متابعة الطلب" : "إتمام الطلب"}
        </button>
      </div>
    </motion.div>
  );
}
