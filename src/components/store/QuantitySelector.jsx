import React from "react";
import { motion } from "framer-motion";
import { Check, Gift } from "lucide-react";

export default function QuantitySelector({ product, selected, onSelect }) {
  const packs = [
    {
      id: "1",
      label: "عبوة واحدة",
      qty: 1,
      price: product.price,
      originalPrice: product.compare_price || null,
      badge: null,
      save: null,
    },
    {
      id: "2",
      label: "عبوتين",
      qty: 2,
      price: product.two_pack_price || Math.round(product.price * 1.85),
      originalPrice: (product.compare_price || product.price) * 2,
      badge: "الأكثر مبيعاً",
      save: "وفّر ١٥٪",
    },
    {
      id: "3",
      label: "٣ عبوات",
      qty: 3,
      price: product.three_pack_price || Math.round(product.price * 2.55),
      originalPrice: (product.compare_price || product.price) * 3,
      badge: "التوفير الأكبر",
      save: "وفّر ٢٥٪ + شحن مجاني",
    },
  ];

  return (
    <div className="space-y-2">
      {packs.map((pack) => (
        <motion.button
          key={pack.id}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(pack)}
          className={`w-full relative p-4 rounded-2xl border-2 transition-all text-right overflow-hidden ${
            selected === pack.id
              ? "border-black bg-gray-50 shadow-lg ring-1 ring-black"
              : "border-border hover:border-gray-400 hover:bg-gray-50"
          }`}
        >
          {pack.badge && (
            <div className={`absolute top-0 left-0 rounded-br-2xl px-3 py-1 font-bold text-[10px] text-white shadow-sm ${selected === pack.id ? 'bg-black' : 'bg-gray-500'}`}>
              {pack.badge}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selected === pack.id
                    ? "border-black bg-black"
                    : "border-slate-300 bg-white"
                }`}
              >
                {selected === pack.id && <Check className="w-3 h-3 text-white" />}
              </div>
              <div>
                <p className="font-bold text-sm">{pack.label}</p>
                {pack.save && (
                  <p className="text-[10px] text-primary font-medium flex items-center gap-1">
                    <Gift className="w-3 h-3" />
                    {pack.save}
                  </p>
                )}
              </div>
            </div>

            <div className="text-left">
              <p className="font-black text-lg text-black">{pack.price} <span className="text-xs font-medium">ر.س</span></p>
              {pack.originalPrice && pack.originalPrice > pack.price && (
                <p className="text-[10px] text-muted-foreground/60 line-through">{pack.originalPrice} ر.س</p>
              )}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}