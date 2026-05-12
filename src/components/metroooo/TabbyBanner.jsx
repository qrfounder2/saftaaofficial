import React from 'react';

export default function TabbyBanner() {
  return (
    <div className="my-6 space-y-3">
      {/* Tabby green banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-300 p-5 text-center">
        <h3 className="text-xl font-black text-primary leading-tight">
          قسّمي طلبك على 6 دفعات
        </h3>
        <p className="text-base font-bold text-primary mt-1">
          بدون مصاريف مع tabby
        </p>
      </div>

      {/* Installment providers */}
      <div className="border-2 border-primary rounded-xl bg-background p-5 text-center">
        <p className="text-sm font-bold mb-3">متاح الدفع بالتقسيط</p>
        <div className="flex items-center justify-center gap-4 text-2xl font-black">
          <span>تـابـي</span>
          <span className="text-border text-xl">|</span>
          <span>تـمــارا</span>
        </div>
      </div>

      {/* Payment methods */}
      <div className="border-2 border-primary rounded-xl bg-background p-4 text-center">
        <p className="text-sm font-bold mb-3">طرق الدفع المتاحة</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['VISA', 'Mastercard', 'Apple Pay', 'G Pay', 'mada', 'NAPS', 'KNET'].map((m) => (
            <span key={m} className="px-3 py-1.5 border border-border rounded-lg text-xs font-bold">
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}