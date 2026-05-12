import React from 'react';
import { BadgeCheck, ShieldCheck, CreditCard } from 'lucide-react';

const badges = [
  { icon: CreditCard, text: 'شامل جميع الرسوم' },
  { icon: BadgeCheck, text: 'منتج برازيلي أصلي' },
  { icon: ShieldCheck, text: 'دفع آمن و سهل' },
];

export default function TrustBadges() {
  return (
    <div className="space-y-3 py-4">
      {badges.map((badge) => (
        <div key={badge.text} className="flex items-center gap-2 justify-end text-base font-semibold">
          <span>{badge.text}</span>
          <badge.icon className="w-5 h-5 text-blue-600" />
        </div>
      ))}
    </div>
  );
}