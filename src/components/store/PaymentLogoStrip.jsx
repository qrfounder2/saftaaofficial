import React from "react";
import { PAYMENT_STRIP_ITEMS } from "@/lib/payments";
import { cn } from "@/lib/utils";

/**
 * Single horizontal row of payment marks (scrolls on very narrow screens).
 */
export default function PaymentLogoStrip({ size = "md", maintenance = false, className }) {
  const imgH = size === "sm" ? "h-4 max-h-4" : "h-[18px] max-h-[18px] sm:h-5 sm:max-h-5";
  const chipH = size === "sm" ? "h-7 min-h-[1.75rem]" : "h-8 min-h-[2rem] sm:h-9 sm:min-h-[2.25rem]";
  const gap = size === "sm" ? "gap-1" : "gap-1 sm:gap-1.5";

  return (
    <div
      className={cn(
        "flex w-full max-w-full flex-nowrap items-stretch justify-center",
        gap,
        "overflow-x-auto overflow-y-hidden px-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        maintenance && "pointer-events-none select-none opacity-[0.62] grayscale contrast-[0.92]",
        className,
      )}
    >
      {PAYMENT_STRIP_ITEMS.map((m) => (
        <div
          key={m.id}
          className={cn(
            "flex shrink-0 items-center justify-center rounded-lg border border-border/90 bg-background px-1.5 shadow-[0_1px_0_rgba(0,0,0,0.04)]",
            chipH,
            maintenance && "border-dashed border-muted-foreground/25 bg-muted/40",
          )}
        >
          <img
            src={m.src}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className={cn(imgH, "w-auto object-contain object-center")}
            style={{ maxWidth: m.maxW }}
          />
        </div>
      ))}
    </div>
  );
}
