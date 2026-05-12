import React from "react";

const features = [
  "مظهر أنحف وأملس تحت العباية والفساتين من أول لبسة — بدون ما يبان السُمك.",
  "حزام خصر سيليكون يلتصق بلطف: أقل زحزحة مع المشي والجلوس الطويل.",
  "ضغط مدروس على الخصر والبطن: تشكيل واضح مع إمكانية تتنفسين وتتحركين طبيعي.",
  "يطمّنك في المناسبات والتصوير: يخفّي زحمة الجلوس ويظبط وضعية الجسم.",
  "خامة مضادة للميكروبات — راحة أنظف في طقسنا.",
  "فتحة عملية للحمام… ما تحتاجين تخلعين المشد بالكامل كل مرة.",
  "يندمج تحت الملابس: فساتين، تنانير، سراويل — بسماكة ما تلفت.",
  "تركيبة 86% بولي أميد و 14% إيلاستين: مرونة تلحقك طول اليوم.",
];

export default function ProductFeatures() {
  return (
    <section dir="rtl" className="space-y-7 py-6 text-right">
      <div className="rounded-2xl border border-amber-200/60 bg-gradient-to-bl from-amber-50/90 via-white to-white p-4 shadow-sm ring-1 ring-amber-900/[0.04] sm:p-5">
        <p className="text-[11px] font-black tracking-wide text-amber-900/90">
          ليش تختارينه؟
        </p>
        <h2 className="mt-2 text-xl font-black leading-snug text-neutral-900 sm:text-2xl">
          شدّي الخصر والبطن من أول لبسة…{" "}
          <span className="text-neutral-700">براحة تلحقين فيها دوامك ومشاويرك.</span>
        </h2>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-neutral-600 sm:text-base">
          ضغط موزون + خامة مرنة = حركة طبيعية: جلوس، مشي، سيارة — بدون «حسّ مشد يضايق» يقطع يومك.
        </p>
      </div>

      <div>
        <div className="mb-3 flex w-full items-center justify-start gap-2">
          <h3 className="text-lg font-black text-neutral-900 sm:text-xl">تفاصيل تهمّك قبل الطلب</h3>
          <span className="h-7 w-1 shrink-0 rounded-full bg-amber-400" aria-hidden />
        </div>
        <ul className="w-full space-y-3 text-right">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex w-full flex-row items-start justify-start gap-3 text-[15px] leading-relaxed text-neutral-800 sm:text-base"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 ring-2 ring-amber-200/80" aria-hidden />
              <span className="min-w-0 flex-1 text-right">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-4 sm:p-5">
        <p className="text-base font-semibold leading-loose text-neutral-800 sm:text-[17px]">
          مشد برمودا عالي الخصر يركّز على شيء واحد تبحثين عنه:{" "}
          <span className="font-black text-neutral-900">ثقة في الطلعة</span> — لبسة ترتّب الجسم تحت الملابس
          وتعطيكِ إحساس أنحف فوري، مع مرونة تخليكِ تكملين يومك بدون تفكير. مناسب لمن تبغى تشكيل أوضح للخصر
          والبطن والفخذ، وتبغى قطعة تثبت وتخدمك في المناسبات والدوام. اختاري مقاسكِ بارتياح، وإذا كنتِ بين
          مقاسين راجعي دليل المقاسات أو راسلينا — نفضّل نثبت معكِ قبل ما تندفعين.
        </p>
      </div>
    </section>
  );
}
