import React from "react";
import { Truck, Zap } from "lucide-react";

const STYLES = {
  freeShipping: {
    Icon: Truck,
    label: "شحن مجاني",
    wrap:
      "bg-white/95 text-slate-800 border border-slate-200 shadow-sm ring-1 ring-slate-900/[0.06]",
    icon: "text-emerald-600",
  },
  fastSelling: {
    Icon: Zap,
    label: "يباع بسرعة",
    wrap:
      "bg-amber-50/95 text-amber-950 border border-amber-200/90 shadow-sm ring-1 ring-amber-900/[0.06]",
    icon: "text-amber-600",
  },
};

export default function StoreBadge({ variant, size = "sm" }) {
  const cfg = STYLES[variant];
  if (!cfg) return null;
  const { Icon, label, wrap, icon } = cfg;
  const isMd = size === "md";
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-black backdrop-blur-[2px] ${isMd ? "gap-1.5 px-3 py-1.5 text-xs" : "gap-1 px-2 py-1 text-[10px] leading-none"} ${wrap}`}
    >
      <Icon className={`shrink-0 stroke-[2.5] ${isMd ? "h-3.5 w-3.5" : "h-3 w-3"} ${icon}`} aria-hidden />
      {label}
    </span>
  );
}
