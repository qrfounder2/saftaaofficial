import React from 'react';

export default function PaymentBadges() {
  const methods = [
    { label: 'VISA', icon: null, type: 'visa' },
    { label: 'Mastercard', icon: null, type: 'mc' },
    { label: 'Apple Pay', icon: null, type: 'apple' },
    { label: 'G Pay', icon: null, type: 'gpay' },
    { label: 'mada', icon: null, type: 'mada' },
    { label: 'tabby', icon: null, type: 'tabby' },
    { label: 'NAPS', icon: null, type: 'naps' },
  ];

  return (
    <div className="border border-border rounded-2xl p-4">
      <h4 className="text-center font-black text-sm mb-3">طرق الدفع المتاحة</h4>
      <div className="flex items-center justify-center flex-wrap gap-2">
        {methods.map((m) => (
          <div
            key={m.type}
            className="border border-border rounded-xl px-2.5 py-1.5 flex items-center justify-center min-w-[52px] h-9 bg-white"
          >
            {m.type === 'visa' && (
              <span className="text-[13px] font-black text-blue-800 italic tracking-tight">VISA</span>
            )}
            {m.type === 'mc' && (
              <div className="flex">
                <div className="w-4 h-4 rounded-full bg-red-500 opacity-90" />
                <div className="w-4 h-4 rounded-full bg-yellow-400 -ml-2 opacity-90" />
              </div>
            )}
            {m.type === 'apple' && (
              <span className="text-[11px] font-semibold tracking-tight">Apple Pay</span>
            )}
            {m.type === 'gpay' && (
              <span className="text-[11px] font-semibold tracking-tight">G Pay</span>
            )}
            {m.type === 'mada' && (
              <div className="text-center">
                <div className="text-[8px] font-black text-green-700">مدى</div>
                <div className="text-[8px] font-bold text-green-700">mada</div>
              </div>
            )}
            {m.type === 'tabby' && (
              <span className="text-[12px] font-black">tabby</span>
            )}
            {m.type === 'naps' && (
              <span className="text-[10px] font-black tracking-tighter">NAPS</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}