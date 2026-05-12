import React from 'react';
import { Check, ShieldCheck, Droplets, Eye, Sparkles } from 'lucide-react';

export default function ProductFeatures({ features = [], compression }) {
  return (
    <div className="space-y-4">
      {/* Compression badge */}
      {compression && (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${
          compression === 'high' ? 'bg-rose-50 text-rose-700' :
          compression === 'medium' ? 'bg-amber-50 text-amber-700' :
          'bg-sky-50 text-sky-700'
        }`}>
          <Sparkles className="w-3.5 h-3.5" />
          {compression === 'high' ? 'ضغط عالي مع الحفاظ على الراحة' :
           compression === 'medium' ? 'ضغط متوسط مريح' : 'ضغط خفيف يومي'}
        </div>
      )}

      {/* Feature list */}
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-3 pt-2">
        {[
          { icon: ShieldCheck, label: 'منتج برازيلي أصلي' },
          { icon: Droplets, label: 'مضاد للميكروبات' },
          { icon: Eye, label: 'غير مرئي تحت الملابس' },
        ].map((badge, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <badge.icon className="w-3.5 h-3.5" />
            <span>{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}