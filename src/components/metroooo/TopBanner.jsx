import React from 'react';
import { Truck } from 'lucide-react';

export default function TopBanner() {
  return (
    <div className="bg-primary text-primary-foreground py-2.5 text-center">
      <p className="text-sm font-medium flex items-center justify-center gap-2">
        <Truck className="w-4 h-4" />
        توصيل سريع في السعودية
      </p>
    </div>
  );
}