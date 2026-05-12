import React from "react";
import PaymentLogoStrip from "@/components/store/PaymentLogoStrip";
import { cn } from "@/lib/utils";

export default function PaymentMethods({ className, stripClassName }) {
  return (
    <div className={cn("py-3", className)} dir="rtl" aria-label="شعارات طرق الدفع المعتادة">
      <PaymentLogoStrip size="md" className={cn("max-w-full", stripClassName ?? "justify-center")} />
    </div>
  );
}
