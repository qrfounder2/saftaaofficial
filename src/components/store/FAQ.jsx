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
    a: "نعم، التركيبة تعتمد على مستخلصات عضوية نقية خضعت لاختبارات الجودة والسلامة لتناسب الاستخدام اليومي المستمر بدون آثار جانبية.",
  },
  {
    q: "متى أحس بالنتيجة؟",
    a: "الاستجابة تختلف حسب شدة الحالة، ولكن وفقاً لتجارب ٩٧٪ من عملائنا، يبدأ الإحساس براحة ملحوظة خلال أول أسبوع من الاستخدام المنتظم (٢-٣ مرات يومياً).",
  },
  {
    q: "كيف أطلب؟ وكم مدة التوصيل؟",
    a: "كل ما عليك هو تعبئة نموذج الطلب، وسيتواصل معك فريقنا لتأكيد الشحنة. التوصيل مبرد وسريع (١-٣ أيام) لجميع مناطق المملكة، والدفع يكون عند الاستلام فقط.",
  },
  {
    q: "هل يوجد ضمان؟",
    a: "نحن نثق بفعالية منتجاتنا، ولذلك معدل الإرجاع لدينا لا يتجاوز ٠.٤٪. ومع ذلك، نوفر سياسة إرجاع مرنة لضمان راحتك التامة.",
  },
  {
    q: "هل الكريم مناسب لجميع الأعمار؟",
    a: "التركيبة صممت خصيصاً للبالغين وكبار السن الذين يعانون من آلام المفاصل والخشونة. آمنة تماماً، ولكن يُفضل للحوامل استشارة الطبيب للاحتياط.",
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