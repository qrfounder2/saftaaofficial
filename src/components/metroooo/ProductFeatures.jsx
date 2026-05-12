import React from 'react';

const features = [
  'ينحف ويشد الخصر والبطن على الفور',
  'يزيل دهون البطن والخصر والظهر',
  'يقوم بشد وتشكيل الفخذين والمؤخرة',
  'مزود بتكنولوجيا مضادة للميكروبات',
  'راحة تامة ومرونة كاملة',
  'حزام خصر مع سيليكون لمزيد من الثبات على الجسم',
  'غير مرئي أسفل الملابس، ويمكنك ارتداؤه أسفل الفساتين والتنانير والسراويل',
  'مزود بفتحة صحية لتسهيل دخول الحمام',
  'التركيب: 86% بولي أميد، 14% إيلاستين',
  'صنع في البرازيل',
];

export default function ProductFeatures() {
  return (
    <div className="space-y-6 py-6">
      {/* Compression level */}
      <div className="text-right">
        <div className="flex items-center gap-2 justify-end mb-2">
          <span className="text-xl font-black">ضغط عالي</span>
          <span className="text-xl">▐▌▌</span>
        </div>
        <p className="text-base font-medium leading-relaxed text-muted-foreground">
          ضغط عالي مع الحفاظ على الراحة, مثالي لتقليل المقاس بنسبة كبيرة مع الحفاظ على حرية الحركة.
        </p>
      </div>

      {/* Features list */}
      <ul className="space-y-2 text-right">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 justify-end text-base">
            <span>{feature}</span>
            <span className="mt-1 text-foreground">•</span>
          </li>
        ))}
      </ul>

      {/* Product number */}
      <p className="text-right font-bold">
        رقم المنتج: <span className="font-black">47120</span>
      </p>

      {/* Description */}
      <p className="text-right text-base leading-loose font-medium">
        مشد برمودا البرازيلي ذو الخصر المرتفع يمنحك مظهرًا أنحف على الفور حتى تتمكني من ارتداء ما تحبينه من تصاميم الملابس المختلفة براحة تامة، حتى عند ارتدائها لفترات طويلة، وذلك بفضل مرونته العالية والتقنية المضادة للميكروبات. يعزز هذا المشد منحنياتك الطبيعية عن طريق شد الفخذين والمؤخرة وتشكيلهما بصورة مريحة، كما أنه مزود بحزام خصر من السيليكون لمزيد من الثبات على الجسم.
      </p>

      {/* Brand */}
      <p className="text-right text-base">
        العلامة التجارية: <span className="font-bold underline">Lupo</span>
      </p>

      {/* Share button */}
      <div className="flex justify-end">
        <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold text-base">
          شارك
        </button>
      </div>
    </div>
  );
}