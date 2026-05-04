import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "هل المنتجات طبيعية وآمنة؟",
    a: "نعم، جميع منتجاتنا مصنوعة من مكونات طبيعية ١٠٠٪ وحاصلة على ترخيص هيئة الغذاء والدواء السعودية. لا تحتوي على أي مواد كيميائية ضارة.",
  },
  {
    q: "متى أحس بالنتيجة؟",
    a: "معظم عملائنا يلاحظون فرقاً واضحاً خلال ٣-٧ أيام من الاستخدام المنتظم. بعض الحالات تحتاج حتى ١٤ يوم للنتائج الكاملة.",
  },
  {
    q: "كيف أطلب؟ وكم مدة التوصيل؟",
    a: "اختر المنتج المناسب، أضف بياناتك (الاسم، الجوال، المدينة، العنوان) وبس! التوصيل خلال ١-٣ أيام عمل لجميع مناطق المملكة. الدفع عند الاستلام.",
  },
  {
    q: "هل يوجد ضمان؟",
    a: "نعم، نوفر ضمان استرجاع المبلغ خلال ٣٠ يوم في حالة عدم الرضا. رضاك أولويتنا.",
  },
  {
    q: "هل الكريم مناسب لجميع الأعمار؟",
    a: "نعم، منتجاتنا مناسبة لجميع الأعمار فوق ١٨ سنة. للحوامل والمرضعات يُنصح باستشارة الطبيب.",
  },
  {
    q: "هل يوجد خصم على الكميات؟",
    a: "نعم! عند شراء عبوتين تحصل على خصم ١٥٪، وعند شراء ٣ عبوات تحصل على خصم ٢٥٪ مع شحن مجاني.",
  },
];

export default function FAQ() {
  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full">
            ❓ أسئلة شائعة
          </span>
          <h2 className="text-2xl md:text-4xl font-black mt-4">عندك سؤال؟</h2>
          <p className="text-muted-foreground mt-2 text-sm">إجابات على أكثر الأسئلة شيوعاً</p>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card rounded-xl border border-border/50 px-5 data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-sm font-bold hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}