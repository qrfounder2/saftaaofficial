import React from "react";
import { BadgeCheck, ShieldCheck, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const badges = [
  { icon: CreditCard, text: "شامل جميع الرسوم" },
  { icon: BadgeCheck, text: "منتج برازيلي أصلي" },
  { icon: ShieldCheck, text: "دفع آمن وسهل" },
];

export default function TrustBadges({ className }) {
  return (
    <div dir="rtl" className={cn("space-y-2 py-3 text-center", className)}>
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div
            key={badge.text}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-neutral-800"
          >
            <Icon className="h-4 w-4 shrink-0 text-blue-600" aria-hidden />
            <span>{badge.text}</span>
          </div>
        );
      })}
    </div>
  );
}