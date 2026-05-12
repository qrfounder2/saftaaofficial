import React, { useEffect, useMemo, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PaymentMethods from "@/components/metroooo/PaymentMethods";
import TrustBadges from "@/components/metroooo/TrustBadges";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { resolveMetroPackOffers, unitPriceForCheckout } from "@/lib/metroPackOffers";

const defaultSizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];
const defaultColors = [
  { name: "Natural", value: "#D4B896", border: "#c0a47e", label_ar: "طبيعي" },
  { name: "Black", value: "#000000", border: "#333", label_ar: "أسود" },
];

function buildVariantsByTier(color, size) {
  const line = () => ({ color, size });
  return {
    1: [line()],
    3: [line(), line(), line()],
    5: [line(), line(), line(), line(), line()],
  };
}

/**
 * Metro PDP: pack 1/3/5 + **per-piece** color & size (each line independent).
 * Checkout receives `lines` JSON + legacy `size` / `colorLabel` (first line).
 */
export default function ProductOptions({ product, sizes: sizesProp = defaultSizes, colors: colorsProp = defaultColors }) {
  const navigate = useNavigate();
  const productId = product?.id;
  const unitList = Number(product?.price) || 0;
  const compareList = product?.compare_price != null ? Number(product.compare_price) : null;

  const sizes = Array.isArray(sizesProp) && sizesProp.length ? sizesProp : defaultSizes;

  const colorOptions = useMemo(() => {
    return (colorsProp || defaultColors).map((c) => ({
      name: c.name,
      hex: c.value ?? c.hex ?? "#ccc",
      label: c.label_ar || c.label || c.name,
    }));
  }, [colorsProp]);

  const defaultColor = colorOptions[0]?.name ?? "Natural";
  const defaultSize = sizes.includes("M") ? "M" : sizes[0] ?? "M";

  const offers = useMemo(
    () =>
      resolveMetroPackOffers({
        price: unitList,
        compare_price: compareList,
        metro_ui: product?.metro_ui,
      }),
    [product?.metro_ui, unitList, compareList],
  );

  const [selectedTier, setSelectedTier] = useState(null);
  const [offerChoiceError, setOfferChoiceError] = useState(false);
  const [variantsByTier, setVariantsByTier] = useState(() =>
    buildVariantsByTier(defaultColor, defaultSize),
  );

  useEffect(() => {
    setSelectedTier(null);
    setOfferChoiceError(false);
    const c = colorOptions[0]?.name ?? "Natural";
    const s = sizes.includes("M") ? "M" : sizes[0] ?? "M";
    setVariantsByTier(buildVariantsByTier(c, s));
  }, [productId, colorOptions, sizes]);

  useEffect(() => {
    const names = new Set(colorOptions.map((c) => c.name));
    const validColor = (c) => (names.has(c) ? c : defaultColor);
    const validSize = (s) => (sizes.includes(s) ? s : defaultSize);
    setVariantsByTier((prev) => {
      const tiers = [1, 3, 5];
      let changed = false;
      const next = { ...prev };
      for (const tier of tiers) {
        const lines = prev[tier];
        if (!lines?.length) continue;
        const mapped = lines.map((line) => {
          const color = validColor(line.color);
          const size = validSize(line.size);
          if (color !== line.color || size !== line.size) changed = true;
          return { ...line, color, size };
        });
        next[tier] = mapped;
      }
      return changed ? next : prev;
    });
  }, [colorOptions, sizes, defaultColor, defaultSize]);

  useEffect(() => {
    if (selectedTier != null) setOfferChoiceError(false);
  }, [selectedTier]);

  const activeOffer = useMemo(() => {
    if (selectedTier == null) return null;
    return offers.find((o) => o.tier === selectedTier) ?? null;
  }, [offers, selectedTier]);

  const tierLines = activeOffer ? variantsByTier[activeOffer.tier] ?? [] : [];

  const updateVariant = (tier, idx, key, val) => {
    setVariantsByTier((prev) => ({
      ...prev,
      [tier]: (prev[tier] ?? []).map((l, i) => (i === idx ? { ...l, [key]: val } : l)),
    }));
  };

  const colorHex = (name) => colorOptions.find((c) => c.name === name)?.hex ?? "#ccc";
  const colorLabelFromName = (name) => colorOptions.find((c) => c.name === name)?.label ?? name;

  const runCheckout = () => {
    if (!productId || !activeOffer) return;
    const lines = variantsByTier[activeOffer.tier] ?? [];
    if (!lines.length) return;
    const effectiveUnit = unitPriceForCheckout(activeOffer);
    const linesPayload = lines.map((l) => ({
      size: l.size,
      colorId: l.color,
      colorLabel: colorLabelFromName(l.color),
    }));
    const first = lines[0];
    const params = new URLSearchParams({
      product: String(productId),
      pack: "1",
      price: String(effectiveUnit),
      qty: String(activeOffer.tier),
      size: first?.size ?? defaultSize,
      colorLabel: colorLabelFromName(first?.color),
      lines: JSON.stringify(linesPayload),
    });
    navigate(`/order?${params.toString()}`);
  };

  const scrollToPackOffers = () => {
    document.getElementById("pdp-pack-offers")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const onPrimaryCtaClick = () => {
    if (!productId) return;
    if (!activeOffer) {
      setOfferChoiceError(true);
      scrollToPackOffers();
      return;
    }
    setOfferChoiceError(false);
    runCheckout();
  };

  const savingsPct =
    activeOffer && activeOffer.compare > activeOffer.total
      ? Math.round((1 - activeOffer.total / activeOffer.compare) * 100)
      : 0;

  const thumb = product?.images?.[0];
  const orderCtaRef = useRef(null);
  const [showJumpToOrder, setShowJumpToOrder] = useState(false);

  useEffect(() => {
    const el = orderCtaRef.current;
    if (!el || !offers.length) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setShowJumpToOrder(!entry.isIntersecting);
      },
      { threshold: 0.12, rootMargin: "0px 0px -56px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [offers.length, productId, selectedTier, activeOffer?.total]);

  const scrollToOrderCta = () => {
    orderCtaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (!offers.length) {
    const firstLine = variantsByTier[1]?.[0];
    return (
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50/90 p-4 space-y-4">
        <p className="text-xs font-bold text-neutral-500">الخيارات</p>
        <p className="text-sm text-neutral-600">تعذر حساب العروض لهذا المنتج.</p>
        <Button
          type="button"
          className="w-full h-12 rounded-xl font-black"
          onClick={() =>
            navigate(
              `/order?product=${encodeURIComponent(productId)}&pack=1&price=${unitList}&qty=1&size=${encodeURIComponent(firstLine?.size || "M")}&colorLabel=${encodeURIComponent(colorLabelFromName(firstLine?.color))}`,
            )
          }
        >
          إتمام الطلب
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="relative isolate -mx-4 overflow-hidden rounded-2xl border border-neutral-200/90 bg-neutral-50/80 px-3 py-4 shadow-sm sm:-mx-0 sm:rounded-2xl sm:px-5 sm:py-5">
        <p className="mb-4 text-center text-xs font-medium leading-relaxed text-neutral-500 sm:text-sm">
          اختر أحد العروض أولاً (قطعة واحدة أو ٣ أو ٥)، ثم اللون والمقاس، وبعدها يمكنك إتمام الطلب. الدفع عند الاستلام.
        </p>
        <div className="space-y-3">
          <div className="rounded-xl border border-neutral-200 bg-white p-3.5 shadow-sm sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-neutral-700">الكمية</span>
              {activeOffer && savingsPct > 0 && activeOffer.tier !== 1 && (
                <span className="text-[11px] font-medium text-neutral-600">
                  يصل التوفير إلى{" "}
                  <span className="tabular-nums font-semibold text-neutral-900">{savingsPct}%</span>{" "}
                  على العروض
                </span>
              )}
            </div>

            <div id="pdp-pack-offers" className="grid grid-cols-3 gap-2 sm:gap-2.5 scroll-mt-28">
              {offers.map((offer) => {
                const selected = selectedTier != null && selectedTier === offer.tier;
                const piece = Math.round((offer.total / offer.tier) * 100) / 100;
                return (
                  <button
                    key={offer.tier}
                    type="button"
                    onClick={() => {
                      setSelectedTier(offer.tier);
                      setOfferChoiceError(false);
                    }}
                    className={cn(
                      "relative flex min-h-[5.75rem] flex-col items-center justify-center gap-0.5 rounded-lg border px-1.5 py-2.5 text-center transition-colors sm:min-h-[6.25rem] sm:rounded-xl sm:px-2",
                      selected
                        ? "border-neutral-900 bg-neutral-900 text-white shadow-sm"
                        : "border-neutral-200 bg-neutral-50/50 text-neutral-900 hover:border-neutral-300 hover:bg-white",
                    )}
                  >
                    {offer.badge && (
                      <span
                        className={cn(
                          "absolute top-1.5 end-1.5 max-w-[calc(100%-10px)] truncate rounded px-1 py-px text-[8px] font-medium leading-tight sm:text-[9px]",
                          selected ? "bg-white/15 text-white/90" : "bg-neutral-200/90 text-neutral-700",
                        )}
                      >
                        {offer.badge}
                      </span>
                    )}
                    <span className={cn("text-lg font-bold tabular-nums leading-none sm:text-xl", selected && "text-white")}>
                      {offer.tier}
                    </span>
                    <span className={cn("text-[10px] font-medium", selected ? "text-white/75" : "text-neutral-500")}>
                      {offer.tier === 1 ? "قطعة" : "قطع"}
                    </span>
                    <span className={cn("mt-0.5 text-sm font-bold tabular-nums sm:text-base", selected && "text-white")}>
                      {offer.total}
                      <span className="me-0.5 text-[10px] font-semibold opacity-80">ر.س</span>
                    </span>
                    {offer.compare > offer.total && (
                      <span
                        className={cn(
                          "text-[9px] tabular-nums line-through",
                          selected ? "text-white/45" : "text-neutral-400",
                        )}
                      >
                        {offer.compare} ر.س
                      </span>
                    )}
                    {offer.promo && (
                      <span
                        className={cn(
                          "mt-0.5 text-[9px] font-medium",
                          selected ? "text-emerald-200/90" : "text-neutral-600",
                        )}
                      >
                        {offer.promo}
                      </span>
                    )}
                    <span className={cn("mt-0.5 text-[9px] tabular-nums", selected ? "text-white/60" : "text-neutral-500")}>
                      {piece} ر.س / قطعة
                    </span>
                  </button>
                );
              })}
            </div>

            {!activeOffer && (
              <p
                className="mt-3 rounded-lg border border-amber-200/80 bg-amber-50/60 px-3 py-2.5 text-center text-[11px] font-semibold leading-snug text-amber-950 sm:text-xs"
                role="status"
              >
                اختر إحدى عروض الكمية أعلاه (١ أو ٣ أو ٥ قطع) لمتابعة اختيار اللون والمقاس وإتمام الطلب.
              </p>
            )}

            {activeOffer ? (
            <div className="mt-4 border-t border-neutral-100 pt-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-neutral-700">اللون والمقاس لكل قطعة</span>
                <span className="text-[11px] font-medium text-neutral-500">
                  {activeOffer.tier === 1 ? "قطعة واحدة" : `${activeOffer.tier} قطع`}
                </span>
              </div>
              <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                {tierLines.map((line, idx) => (
                  <div
                    key={`${activeOffer.tier}-${idx}`}
                    className="flex items-center gap-1.5 rounded-lg border border-neutral-100 bg-neutral-50/40 px-2 py-1.5 sm:bg-white"
                  >
                {activeOffer.tier > 1 && (
                  <span className="w-5 shrink-0 text-center text-[10px] font-semibold text-neutral-400 tabular-nums">
                    {idx + 1}
                  </span>
                )}
                {thumb && (
                  <img
                    src={thumb}
                    alt=""
                    className="h-8 w-7 shrink-0 rounded border border-neutral-200 object-cover bg-neutral-50"
                  />
                )}
                <Select
                  value={line.color}
                  onValueChange={(v) => updateVariant(activeOffer.tier, idx, "color", v)}
                >
                  <SelectTrigger className="h-9 min-h-0 flex-1 border-neutral-200 bg-white px-2 text-[11px] font-medium">
                    <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden">
                      <span
                        className="h-3.5 w-3.5 shrink-0 rounded-sm border border-neutral-200"
                        style={{ backgroundColor: colorHex(line.color) }}
                        aria-hidden
                      />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    {colorOptions.map((c) => (
                      <SelectItem key={c.name} value={c.name} className="text-xs">
                        <span className="flex items-center gap-2">
                          <span
                            className="h-3 w-3 rounded-sm border"
                            style={{ backgroundColor: c.hex }}
                            aria-hidden
                          />
                          {c.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={line.size}
                  onValueChange={(v) => updateVariant(activeOffer.tier, idx, "size", v)}
                >
                  <SelectTrigger className="h-9 w-[3.35rem] shrink-0 border-neutral-200 bg-white px-1 text-[11px] font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    {sizes.map((s) => (
                      <SelectItem key={s} value={s} className="text-xs font-semibold">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
              </div>
            </div>
            ) : null}

          </div>

          <div id="pdp-order-cta" ref={orderCtaRef} className="scroll-mt-28 space-y-2">
            <Button
              type="button"
              className="h-12 w-full rounded-xl bg-neutral-900 text-base font-semibold text-white shadow-sm transition hover:bg-neutral-800 sm:h-[52px] sm:rounded-xl"
              onClick={onPrimaryCtaClick}
              disabled={!productId}
            >
              إتمام الطلب
            </Button>
            {offerChoiceError && (
              <p className="text-center text-xs font-semibold leading-snug text-red-600" role="alert">
                يرجى اختيار أحد عروض الكمية أولاً (١ أو ٣ أو ٥ قطع) قبل إتمام الطلب.
              </p>
            )}
            <p className="text-center text-[11px] font-normal leading-relaxed text-neutral-500">
              الدفع عند الاستلام · توصيل داخل السعودية
            </p>
            <div className="border-t border-neutral-200/80 pt-3 text-center">
              <PaymentMethods className="py-0" stripClassName="justify-center" />
              <TrustBadges className="mt-2 border-t border-neutral-100 py-0 pt-3" />
            </div>
          </div>
        </div>
      </div>

      {showJumpToOrder ? (
        <div
          className="md:hidden fixed inset-x-0 bottom-0 z-[60] border-t border-neutral-200/90 bg-white/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_32px_rgba(0,0,0,0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-white/90"
          role="region"
          aria-label={activeOffer ? "انتقال سريع لإتمام الطلب" : "الانتقال لاختيار عرض الكمية"}
        >
          <button
            type="button"
            onClick={() => {
              if (!activeOffer) {
                setOfferChoiceError(true);
                scrollToPackOffers();
                return;
              }
              scrollToOrderCta();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 py-3.5 text-sm font-semibold text-white shadow-md transition active:scale-[0.99] hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
          >
            <ShoppingBag className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
            {activeOffer ? (
              <>
                <span>إتمام الطلب</span>
                <span className="tabular-nums opacity-90">· {activeOffer.total} ر.س</span>
              </>
            ) : (
              <span className="text-center leading-snug">اختر عرض الكمية (١ أو ٣ أو ٥)</span>
            )}
          </button>
        </div>
      ) : null}
    </>
  );
}
