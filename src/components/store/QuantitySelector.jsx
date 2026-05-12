import React from "react";
import { motion } from "framer-motion";
import { Check, Gift } from "lucide-react";

export default function QuantitySelector({ product, selected, onSelect }) {
  const isLifestyle = product.category === "lifestyle";

  const healthPacks = [
    {
      id: "1",
      label: "الكورس المبدئي (عبوة واحدة)",
      sub: null,
      qty: 1,
      price: product.price,
      originalPrice: product.compare_price || null,
      badge: null,
      save: null,
    },
    {
      id: "3",
      label: "الكورس العلاجي (٣ عبوات)",
      sub: null,
      qty: 3,
      price: product.two_pack_price || Math.round(product.price * 1.85),
      originalPrice: (product.compare_price || product.price) * 3,
      badge: "الخيار المفضل للمتعافين",
      save: "وفّر ٣٠٪",
    },
    {
      id: "5",
      label: "الكورس المكثف (٥ عبوات)",
      sub: null,
      qty: 5,
      price: product.three_pack_price || Math.round(product.price * 2.55),
      originalPrice: (product.compare_price || product.price) * 5,
      badge: "أفضل قيمة علاجية",
      save: "وفّر ٤٥٪ + شحن مجاني",
    },
  ];

  const lifestylePacks = [
    {
      id: "1",
      label: "قطعة واحدة",
      sub: "تجربة شخصية، سيارة، أو أول محتوى",
      qty: 1,
      price: product.price,
      originalPrice: product.compare_price || null,
      badge: null,
      save: null,
    },
    {
      id: "3",
      label: "٣ قطع — الأكثر طلباً",
      sub: "هدية + احتياط + سيارة — أوفر لكل قطعة",
      qty: 3,
      price: product.two_pack_price || Math.round(product.price * 1.85),
      originalPrice: (product.compare_price || product.price) * 3,
      badge: "أوفر للقطعة",
      save: null,
    },
    {
      id: "5",
      label: "٥ قطع — للعائلة والبر",
      sub: "أقل سعر للقطعة عند الشراء بالجملة الخفيف",
      qty: 5,
      price: product.three_pack_price || Math.round(product.price * 2.55),
      originalPrice: (product.compare_price || product.price) * 5,
      badge: "قيمة أعلى",
      save: null,
    },
  ];

  const packs = isLifestyle ? lifestylePacks : healthPacks;

  const formatSaveVsSingles = (pack) => {
    if (!isLifestyle || pack.qty <= 1) return null;
    const singles = product.price * pack.qty;
    if (singles <= pack.price) return null;
    const pct = Math.round((1 - pack.price / singles) * 100);
    if (pct < 5) return null;
    return `وفر ${pct}% مقارنةً بشراء ${pack.qty}× قطعة مفردة`;
  };

  return (
    <div className="space-y-2">
      {packs.map((pack) => {
        const computedSave = formatSaveVsSingles(pack);
        const saveLine = pack.save || computedSave;

        return (
          <motion.button
            key={pack.id}
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(pack)}
            className={`w-full relative p-4 rounded-2xl border-2 transition-all text-right overflow-hidden ${
              selected === pack.id
                ? "border-black bg-gray-50 shadow-lg ring-1 ring-black"
                : "border-border hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            {pack.badge && (
              <div
                className={`absolute top-0 left-0 rounded-br-2xl px-3 py-1 font-bold text-[10px] text-white shadow-sm ${
                  selected === pack.id ? "bg-black" : "bg-gray-500"
                }`}
              >
                {pack.badge}
              </div>
            )}

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                    selected === pack.id
                      ? "border-black bg-black"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {selected === pack.id && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm">{pack.label}</p>
                  {pack.sub && (
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">
                      {pack.sub}
                    </p>
                  )}
                  {saveLine && (
                    <p className="text-[10px] text-primary font-medium flex items-center gap-1 mt-1">
                      <Gift className="w-3 h-3 shrink-0" />
                      {saveLine}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-left shrink-0">
                <p className="font-black text-lg text-black">
                  {pack.price} <span className="text-xs font-medium">ر.س</span>
                </p>
                {isLifestyle && pack.qty > 1 && (
                  <p className="text-[10px] text-muted-foreground">
                    ~{Math.round(pack.price / pack.qty)} ر.س / قطعة
                  </p>
                )}
                {pack.originalPrice && pack.originalPrice > pack.price && (
                  <p className="text-[10px] text-muted-foreground/60 line-through">
                    {pack.originalPrice} ر.س
                  </p>
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
