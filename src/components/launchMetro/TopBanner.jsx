import React, { useState, useEffect } from "react";

const messages = [
  "توصيل مجاني للطلبات فوق ٢٩٩ ريال",
  "منتجات برازيلية أصلية — ١٠٠٪",
  "دفع آمن وسهل",
];

export default function TopBanner() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % messages.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-black px-4 py-2.5 text-center text-[11px] font-bold tracking-wide text-white sm:text-xs">
      <span key={idx} className="inline-block animate-pulse">
        {messages[idx]}
      </span>
    </div>
  );
}
