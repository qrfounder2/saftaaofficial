import React from 'react';
import { Truck, CreditCard, ShieldCheck, RotateCcw } from 'lucide-react';

const FEATURES = [
  { icon: Truck, title: 'شحن مجاني', desc: 'للطلبات أكثر من 299 ريال' },
  { icon: CreditCard, title: 'تقسيط بدون رسوم', desc: 'قسّمي طلبك على 6 دفعات' },
  { icon: ShieldCheck, title: 'منتج برازيلي أصلي', desc: 'جودة مضمونة 100%' },
  { icon: RotateCcw, title: 'استبدال سهل', desc: 'خلال 14 يوم من الاستلام' },
];

export default function FeaturesBar() {
  return (
    <section className="py-8 border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex items-center gap-3 sm:justify-center">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <f.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold">{f.title}</h4>
                <p className="text-[11px] text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}