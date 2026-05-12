import React from 'react';
import { ShieldCheck, CreditCard, Leaf, Package, Truck } from 'lucide-react';

export default function TrustBadges() {
  return (
    <div className="space-y-3">
      {/* Inline trust row */}
      <div className="flex flex-col gap-1.5 text-sm">
        <div className="flex items-center gap-2 justify-end">
          <span>شامل جميع الرسوم</span>
          <div className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-3 h-3 text-background" />
          </div>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <span>منتج برازيلي أصلي</span>
          <div className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-3 h-3 text-background" />
          </div>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <span>دفع آمن و سهل</span>
          <div className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-3 h-3 text-background" />
          </div>
        </div>
      </div>

      {/* 4-grid trust icons */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 py-2">
        <div className="flex items-center gap-2 justify-end">
          <span className="text-sm font-bold">صنع في البرازيل</span>
          <Package className="w-5 h-5 flex-shrink-0" />
        </div>
        <div className="flex items-center gap-2 justify-end">
          <span className="text-sm font-bold">صديقة للبيئة</span>
          <Leaf className="w-5 h-5 flex-shrink-0" />
        </div>
        <div className="flex items-center gap-2 justify-end">
          <span className="text-sm font-bold">توصيل سريع</span>
          <Truck className="w-5 h-5 flex-shrink-0" />
        </div>
        <div className="flex items-center gap-2 justify-end">
          <span className="text-sm font-bold">دفع آمن</span>
          <ShieldCheck className="w-5 h-5 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}