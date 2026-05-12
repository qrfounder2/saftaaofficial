import React from 'react';
import { MapPin, Truck, Lock, Leaf } from 'lucide-react';

const features = [
  { icon: MapPin, text: 'صنع في البرازيل' },
  { icon: Truck, text: 'توصيل سريع' },
  { icon: Leaf, text: 'صديقة للبيئة' },
  { icon: Lock, text: 'دفع آمن' },
];

export default function FeatureIcons() {
  return (
    <div className="grid grid-cols-2 gap-6 py-8">
      {features.map((feature) => (
        <div key={feature.text} className="flex items-center gap-2 justify-center">
          <span className="font-bold text-sm">{feature.text}</span>
          <feature.icon className="w-5 h-5" />
        </div>
      ))}
    </div>
  );
}