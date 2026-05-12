import React from "react";
import { Truck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const STYLES = {
  freeShipping: {
    Icon: Truck,
    label: "شحن مجاني",
    palette: "border-slate-200/90 bg-white text-slate-800",
    icon: "text-emerald-600",
  },
  fastSelling: {
    Icon: Zap,
    label: "يباع بسرعة",
    palette: "border-amber-200/85 bg-amber-50/95 text-amber-950",
    icon: "text-amber-600",
  },
};

const baseWrap =
  "inline-flex items-center justify-center rounded-full font-bold tracking-tight backdrop-blur-[2px] shadow-sm ring-1 ring-slate-950/[0.04]";

const sizeClasses = {
  sm: "gap-0.5 px-2 py-0.5 text-[10px] leading-none",
  md: "gap-1 px-2.5 py-1 text-[11px] leading-none",
};

export default function StoreBadge({ variant, size = "sm" }) {
  const cfg = STYLES[variant];
  if (!cfg) return null;
  const { Icon, label, palette, icon } = cfg;
  const isMd = size === "md";
  return (
    <span className={cn(baseWrap, sizeClasses[size] ?? sizeClasses.sm, palette)}>
      <Icon
        className={cn("shrink-0 stroke-[2.3]", isMd ? "h-3.5 w-3.5" : "h-3 w-3", icon)}
        aria-hidden
      />
      {label}
    </span>
  );
}
