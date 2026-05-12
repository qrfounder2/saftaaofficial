import React from 'react';

const methods = [
  { label: 'VISA', style: 'font-bold italic' },
  { label: 'Mastercard', style: 'font-bold' },
  { label: 'Apple Pay', style: 'font-bold' },
  { label: 'G Pay', style: 'font-bold' },
  { label: 'mada', style: 'font-bold text-[10px]' },
  { label: 'tabby', style: 'font-bold' },
  { label: '●●', style: 'font-bold text-purple-700' },
];

export default function PaymentMethods() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 py-4">
      {methods.map((method) => (
        <div
          key={method.label}
          className={`px-2.5 py-1.5 border border-border rounded-lg text-[11px] bg-background ${method.style}`}
        >
          {method.label}
        </div>
      ))}
    </div>
  );
}