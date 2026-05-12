import React from 'react';

export default function TabbyBanner({ price }) {
  const installment = (price / 4).toFixed(2);
  return (
    <div className="bg-[#3DBDA7] rounded-xl p-3 flex items-center justify-between gap-3">
      <div className="flex-1">
        <p className="text-white text-sm font-bold">
          أو {installment} ر.س × 4 أقساط بدون فوائد
        </p>
        <p className="text-white/80 text-xs mt-0.5">اعرفي أكثر عن tabby</p>
      </div>
      <div className="bg-white rounded-lg px-3 py-1.5">
        <span className="text-black font-black text-sm">tabby</span>
      </div>
    </div>
  );
}