import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, Search } from "lucide-react";

export default function SearchDrawer({ open, onClose, products }) {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);

  const list = Array.isArray(products) ? products : [];
  const results = q.trim()
    ? list.filter((p) => String(p.name || "").includes(q.trim())).slice(0, 6)
    : list.slice(0, 5);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      document.body.style.overflow = "";
      setQ("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white w-full max-w-lg mx-auto mt-0 h-full shadow-2xl flex flex-col">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ما الذي تبحثي عنه؟"
            className="flex-1 text-base outline-none font-medium"
          />
          <button type="button" onClick={onClose} className="p-1.5">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!q && (
          <div className="px-5 pt-4 flex flex-wrap gap-2">
            {["الأفضل مبيعاً", "مشدات برمودا", "المقاسات الكبيرة"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQ(tag)}
                className="bg-gray-100 text-sm font-bold px-3 py-1.5 rounded-full hover:bg-gray-200 transition"
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 space-y-3">
          {results.map((p) => (
            <Link
              key={p.id}
              to={p.link}
              onClick={onClose}
              className="flex gap-3 p-3 rounded-2xl border border-gray-100 hover:border-gray-300 transition"
            >
              <img src={p.image} alt={p.name} className="w-16 h-20 rounded-xl object-cover bg-gray-50" />
              <div className="flex-1 text-start min-w-0">
                <p className="font-bold text-sm leading-snug">{p.name}</p>
                {p.oldPrice && (
                  <p className="text-xs text-gray-400 line-through mt-1">ر.س {p.oldPrice}</p>
                )}
                <p className="text-sm font-black mt-0.5">ر.س {p.priceLabel ?? p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
