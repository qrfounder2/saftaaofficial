import React, { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

/** سعر العرض الوحيد القابل للشراء في شريط الإضافات (بقية العناصر تُعرض كنفاد للكمية). */
const ADDON_ACTIVE_PROMO_PRICE = 190;

function buildCombos(card) {
  const colors = card.colorOptionsQuick || [];
  const sizes = card.sizesQuick || [];
  const out = [];
  for (const c of colors) {
    for (const sz of sizes) {
      out.push({
        key: `${c.id}||${sz}`,
        colorId: c.id,
        colorLabel: c.label,
        size: sz,
        label: `${c.label} / ${sz}`,
      });
    }
  }
  return out.length ? out : [{ key: "—", colorId: "Natural", colorLabel: "طبيعي", size: "M", label: "طبيعي / M" }];
}

function UpsellStripCard({ card, isActiveUpsell }) {
  const navigate = useNavigate();
  const combos = useMemo(() => buildCombos(card), [card]);
  const [variantKey, setVariantKey] = useState(() => combos[0]?.key ?? "");

  const selected = useMemo(
    () => combos.find((c) => c.key === variantKey) ?? combos[0],
    [combos, variantKey],
  );

  const catalogSale =
    Number(card.checkoutUnitPrice) || Number(String(card.price).replace(/,/g, "")) || 0;
  const realList =
    card.oldPrice != null ? Number(String(card.oldPrice).replace(/,/g, "")) : null;

  const saleNum = isActiveUpsell ? ADDON_ACTIVE_PROMO_PRICE : catalogSale;
  const compareStrike =
    isActiveUpsell && realList != null && Number.isFinite(realList) && realList > ADDON_ACTIVE_PROMO_PRICE
      ? realList
      : isActiveUpsell && catalogSale > ADDON_ACTIVE_PROMO_PRICE
        ? catalogSale
        : null;

  const realSavingsPct =
    isActiveUpsell &&
    compareStrike != null &&
    Number.isFinite(compareStrike) &&
    compareStrike > ADDON_ACTIVE_PROMO_PRICE
      ? Math.round((1 - ADDON_ACTIVE_PROMO_PRICE / compareStrike) * 100)
      : null;
  const showSavingsLine = isActiveUpsell && realSavingsPct != null && realSavingsPct >= 8;
  const showDiscountPill =
    isActiveUpsell && typeof card.discount === "number" && card.discount >= 12;

  const handleAdd = () => {
    if (!isActiveUpsell || !card.productId || !selected) return;
    const isMetro = card.pd_layout === "metro";
    if (isMetro) {
      const lines = JSON.stringify([
        { size: selected.size, colorId: selected.colorId, colorLabel: selected.colorLabel },
      ]);
      const params = new URLSearchParams({
        product: String(card.productId),
        pack: "1",
        price: String(ADDON_ACTIVE_PROMO_PRICE),
        qty: "1",
        size: selected.size,
        colorLabel: selected.colorLabel,
        lines,
      });
      navigate(`/order?${params.toString()}`);
      return;
    }
    const params = new URLSearchParams({
      product: String(card.productId),
      pack: "1",
      price: String(ADDON_ACTIVE_PROMO_PRICE),
      qty: "1",
    });
    navigate(`/order?${params.toString()}`);
  };

  return (
    <article
      className={cn(
        "flex w-[min(46vw,11.5rem)] shrink-0 snap-start flex-col gap-1.5 rounded-xl border bg-white p-2 shadow-sm sm:w-44",
        isActiveUpsell
          ? "border-emerald-200/90 transition-shadow hover:shadow-md"
          : "border-neutral-200/90 opacity-[0.92]",
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
        <img
          src={card.image}
          alt=""
          className={cn("h-full w-full object-cover", !isActiveUpsell && "grayscale-[0.35]")}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute right-1 top-1 flex max-w-[90%] flex-col items-end gap-0.5">
          {isActiveUpsell && (
            <span className="rounded-full border border-emerald-200/90 bg-emerald-50/95 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-900 shadow-sm">
              عرض إضافي · متوفر
            </span>
          )}
          {!isActiveUpsell && (
            <span className="rounded-full border border-neutral-300/90 bg-neutral-100/95 px-1.5 py-0.5 text-[9px] font-semibold text-neutral-700 shadow-sm">
              نفد من المخزون
            </span>
          )}
          {isActiveUpsell && card.bestSeller && (
            <span className="rounded-full border border-neutral-200/80 bg-white/95 px-1.5 py-0.5 text-[9px] font-semibold text-neutral-800 shadow-sm backdrop-blur-sm">
              الأكثر مبيعاً
            </span>
          )}
          {isActiveUpsell && showDiscountPill && (
            <span className="rounded-full border border-neutral-200/80 bg-white/95 px-1.5 py-0.5 text-[9px] font-semibold text-neutral-800 shadow-sm backdrop-blur-sm">
              خصم {card.discount}%
            </span>
          )}
        </div>
      </div>

      <h3
        className={cn(
          "line-clamp-2 min-h-[2.25rem] text-[10px] font-black leading-tight sm:text-[11px]",
          isActiveUpsell ? "text-neutral-900" : "text-neutral-600",
        )}
      >
        {card.name}
      </h3>

      <div className="flex flex-wrap items-baseline justify-end gap-1.5" dir="ltr">
        {isActiveUpsell && compareStrike != null && (
          <span className="text-[10px] text-neutral-400 line-through">
            {compareStrike.toLocaleString("ar-SA", { maximumFractionDigits: 0 })} ر.س
          </span>
        )}
        {!isActiveUpsell && catalogSale > 0 && (
          <span className="text-[10px] text-neutral-400 line-through">
            {catalogSale.toLocaleString("ar-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ر.س
          </span>
        )}
        {isActiveUpsell ? (
          <span className="text-xs font-black text-emerald-800">
            {ADDON_ACTIVE_PROMO_PRICE.toLocaleString("ar-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
            ر.س
          </span>
        ) : (
          <span className="text-[11px] font-bold text-neutral-400">غير متوفر</span>
        )}
      </div>

      {showSavingsLine && realSavingsPct != null && (
        <p className="text-[10px] font-medium text-neutral-600">وفر {realSavingsPct}% عن السعر المرجعي</p>
      )}

      {isActiveUpsell ? (
        <div className="relative mt-0.5">
          <select
            value={variantKey}
            onChange={(e) => setVariantKey(e.target.value)}
            className="w-full appearance-none rounded-md border border-neutral-900/80 bg-white py-1.5 pl-7 pr-2 text-[10px] font-bold text-neutral-900"
            aria-label="اللون والمقاس"
          >
            {combos.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-600" aria-hidden />
        </div>
      ) : (
        <div
          className="mt-0.5 rounded-md border border-dashed border-neutral-300 bg-neutral-50 py-2 text-center text-[10px] font-bold text-neutral-500"
          aria-hidden
        >
          غير متوفر حالياً
        </div>
      )}

      {isActiveUpsell ? (
        <button
          type="button"
          onClick={handleAdd}
          className="mt-auto w-full rounded-md border-2 border-emerald-600 bg-white py-2 text-[11px] font-black text-neutral-900 transition-colors hover:bg-emerald-50 active:scale-[0.98]"
        >
          أضف للسلة
        </button>
      ) : (
        <button
          type="button"
          disabled
          className="mt-auto w-full cursor-not-allowed rounded-md border border-neutral-200 bg-neutral-100 py-2 text-[11px] font-bold text-neutral-500"
        >
          نفد من المخزون
        </button>
      )}
    </article>
  );
}

export default function RecommendedProducts({ products }) {
  if (!Array.isArray(products) || !products.length) return null;

  return (
    <div className="py-8" dir="rtl">
      <h2 className="mb-1 text-right text-lg font-black text-neutral-900 sm:text-xl">قد يعجبك أيضاً</h2>
      <p className="mb-3 text-right text-[11px] font-bold text-neutral-500">
        عرض إضافي واحد متوفر بسعر خاص — بقية المقترحات غير متوفرة حالياً
      </p>
      <div className="w-10 rounded-full bg-primary" />

      <div
        className="mt-4 flex gap-3 overflow-x-auto pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:thin] snap-x snap-mandatory sm:gap-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-300"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {products.map((card, index) => (
          <UpsellStripCard
            key={card.productId || card.link}
            card={card}
            isActiveUpsell={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
