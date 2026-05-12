import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { METRO_INFO_PAGES, METRO_INFO_SLUGS } from "@/data/metroInfoPages";
import { metroWhatsAppUrl } from "@/lib/metroWa";

const FAQ_ITEMS = [
  {
    q: "كيف أختار المقاس للمشد؟",
    a: "اعتمدي على جدول المقاسات في صفحة المنتج (الخصر والورك بالسنتيمتر). إذا كنتِ بين مقاسين وترغبين بضغط تشكيل أوضح، جرّبي المقاس الأصغر مع مراعاة الراحة اليومية.",
  },
  {
    q: "هل الدفع عند الاستلام متاح في مدينتي؟",
    a: "نعم في معظم مدن المملكة حيث تدعم شركة الشحن خدمة التحصيل عند التسليم. عند التأكيد عبر الواتساب نذكرك إن كان هناك أي استثناء لمنطقتك.",
  },
  {
    q: "كم يستغرق التوصيل؟",
    a: "عادةً بين يومين إلى خمسة أيام عمل داخل السعودية حسب المدينة وموسم الطلبات — يُحدَّد أدقّ عند تأكيد الطلب.",
  },
  {
    q: "هل يمكن الاسترجاع بعد فتح العبوة؟",
    a: "لأسباب صحية، المنتجات الداخلية والمشدات لا تُسترجع بعد الاستخدام أو فتح العبوة وفق السياسة المعروضة. للعيوب قبل الاستخدام، راسلينا فوراً مع الصور.",
  },
  {
    q: "هل المنتجات أصلية؟",
    a: "نعرض طرازات مختارة من علامات ومصانع موثوقة في مجال الملابس التشكيلية، مع وصف واضح للخامة والضغط في صفحة المنتج.",
  },
];

export default function MetroContentPage() {
  const { slug } = useParams();
  const def = METRO_INFO_PAGES[slug];

  if (!slug || !METRO_INFO_SLUGS.includes(slug) || !def) {
    return <Navigate to="/" replace />;
  }

  const waHref = def.primaryWaMessage
    ? metroWhatsAppUrl(def.primaryWaMessage)
    : metroWhatsAppUrl();

  return (
    <div className="layout-narrow py-10 sm:py-14">
      <Link to="/" className="text-sm font-bold text-neutral-500 hover:text-black">
        ← العودة للرئيسية
      </Link>

      <h1 className="mt-6 text-2xl font-black text-neutral-900 sm:text-3xl">{def.title}</h1>

      <div className="mt-6 space-y-4 text-right text-base leading-relaxed text-neutral-700">
        {def.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {slug === "faq" ? (
        <div className="mt-10">
          <Accordion type="single" collapsible className="w-full border-t border-neutral-200 pt-4">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-neutral-200">
                <AccordionTrigger className="text-right font-bold hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="text-right text-sm leading-relaxed text-neutral-600">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : null}

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild className="rounded-full font-black">
          <a href={waHref} target="_blank" rel="noopener noreferrer">
            واتساب
          </a>
        </Button>
        <Button asChild variant="outline" className="rounded-full font-bold">
          <Link to="/categories">تصفحي الكتالوج</Link>
        </Button>
        {slug !== "contact" ? (
          <Button asChild variant="ghost" className="rounded-full font-bold text-neutral-600">
            <Link to="/info/contact">تواصل معنا</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
