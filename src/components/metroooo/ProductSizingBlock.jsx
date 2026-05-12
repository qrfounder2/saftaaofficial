import React, { useMemo } from "react";

/** جدول مقاسات على صفحة المنتج */
export default function ProductSizingBlock({ sizeChart, sizes }) {
  const rows = useMemo(() => {
    if (Array.isArray(sizeChart) && sizeChart.length) {
      return sizeChart.map((r) => ({
        size: r.size ?? "—",
        weight: r.weight ?? "—",
        height: r.height ?? "—",
        waist: r.waist ?? "—",
        hips: r.hips ?? r.hip ?? "—",
      }));
    }
    const list = Array.isArray(sizes) && sizes.length ? sizes : ["S", "M", "L", "XL", "2XL", "3XL"];
    return list.map((size) => ({
      size,
      weight: "—",
      height: "—",
      waist: "راجعي جدول العلامة أو راسلينا",
      hips: "راجعي جدول العلامة أو راسلينا",
    }));
  }, [sizeChart, sizes]);

  return (
    <div className="space-y-8 border-t border-gray-100 py-6">
      <section id="product-size-chart" className="scroll-mt-28 text-right">
        <h2 className="text-lg font-black text-neutral-900 sm:text-xl">دليل المقاسات</h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          القياسات بالسنتيمتر تقريبية وتختلف حسب الطراز. عند الشك، راسلينا على الواتساب مع قياس الخصر والورك.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <table className="w-full min-w-[280px] text-right text-sm">
            <thead className="bg-neutral-50 text-xs font-black text-neutral-700">
              <tr>
                <th className="px-3 py-2">المقاس</th>
                <th className="px-3 py-2">الوزن (تقريبي)</th>
                <th className="px-3 py-2">الطول</th>
                <th className="px-3 py-2">الخصر</th>
                <th className="px-3 py-2">الورك</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {rows.map((r) => (
                <tr key={r.size} className="font-medium text-neutral-800">
                  <td className="px-3 py-2 font-black tabular-nums">{r.size}</td>
                  <td className="px-3 py-2 text-neutral-600">{r.weight}</td>
                  <td className="px-3 py-2 text-neutral-600">{r.height}</td>
                  <td className="px-3 py-2 text-neutral-600">{r.waist}</td>
                  <td className="px-3 py-2 text-neutral-600">{r.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
