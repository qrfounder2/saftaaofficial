import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { storeClient } from "@/api/storeClient";
import { motion } from "framer-motion";
import { Phone, User, Check, Loader2, ArrowLeft, Truck, Clock, Shield, Headset, Banknote, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import PaymentLogoStrip from "@/components/store/PaymentLogoStrip";

/** Stored on every order for Sheets / CRM; call center completes real address by phone. */
const DEFAULT_REGION = "KSA";

export default function OrderForm() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");
  const pack = params.get("pack") || "1";
  const priceParam = params.get("price");
  const variantSize = params.get("size");
  const variantColorLabel = params.get("colorLabel");
  const linesEncoded = params.get("lines");
  const lineQty = Math.min(99, Math.max(1, parseInt(params.get("qty") || "1", 10) || 1));

  let variantLines = [];
  if (linesEncoded) {
    try {
      const parsed = JSON.parse(linesEncoded);
      variantLines = Array.isArray(parsed) ? parsed : [];
    } catch {
      try {
        const parsed = JSON.parse(decodeURIComponent(linesEncoded));
        variantLines = Array.isArray(parsed) ? parsed : [];
      } catch {
        variantLines = [];
      }
    }
  }

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    notes: "",
    addUpsell: false,
  });
  const [errors, setErrors] = useState({});

  const { data: product } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => storeClient.entities.Product.filter({ id: productId }),
    select: (data) => data[0],
    enabled: !!productId,
  });

  const basePrice = priceParam ? Number(priceParam) : product?.price || 0;
  const metroLineTotal =
    product?.pd_layout === "metro" ? basePrice * lineQty : basePrice;
  const totalPrice = metroLineTotal + (formData.addUpsell ? 24 : 0);
  const checkoutQty =
    product?.pd_layout === "metro" ? lineQty : pack === "1" ? lineQty : parseInt(pack, 10) || 1;
  const packLabel =
    product?.pd_layout === "metro" && variantLines.length > 1
      ? `${lineQty} قطع — ألوان ومقاسات مختلفة (التفاصيل مع الطلب)`
      : product?.pd_layout === "metro" && variantLines.length === 1
        ? `مقاس ${variantLines[0].size}${variantLines[0].colorLabel ? ` · ${variantLines[0].colorLabel}` : ""} · ×${lineQty}`
        : product?.pd_layout === "metro" && variantSize
          ? `مقاس ${variantSize}${variantColorLabel ? ` · ${decodeURIComponent(variantColorLabel)}` : ""} · ×${lineQty}`
          : pack === "5"
            ? "٥ عبوات"
            : pack === "3"
              ? "٣ عبوات"
              : lineQty > 1
                ? `×${lineQty} — عبوة واحدة`
                : "عبوة واحدة";

  // TikTok Pixel: InitiateCheckout
  const hasTrackedCheckout = React.useRef(false);
  useEffect(() => {
    if (product && !hasTrackedCheckout.current && window.ttq) {
      window.ttq.track('InitiateCheckout', {
        contents: [{
          content_id: product.id,
          content_name: product.name,
          price: totalPrice,
          quantity: product?.pd_layout === "metro" ? lineQty : parseInt(pack) || 1
        }],
        content_type: 'product',
        value: totalPrice,
        currency: 'SAR'
      });
      hasTrackedCheckout.current = true;
    }
  }, [product, totalPrice, pack, lineQty, checkoutQty]);

  const createOrder = useMutation({
    mutationFn: (orderData) => storeClient.entities.Order.create(orderData),
    onSuccess: (data) => {
      navigate(`/thank-you?order=${data.id}&name=${encodeURIComponent(formData.name)}&price=${totalPrice}`);
    },
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "الاسم مطلوب";
    if (!formData.phone.trim()) newErrors.phone = "رقم الجوال مطلوب";
    else if (!/^(05|5|9665)\d{8}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "أدخل رقم جوال صحيح";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const variantNote =
      product?.pd_layout === "metro" && variantLines.length > 0
        ? [
            `الكمية الإجمالية: ${lineQty}`,
            "تفاصيل القطع:",
            ...variantLines.map(
              (l, i) =>
                `#${i + 1}: مقاس ${l.size} — اللون: ${l.colorLabel || l.colorId || "—"}`,
            ),
          ].join("\n")
        : product?.pd_layout === "metro" && variantSize
          ? `المقاس: ${variantSize}${variantColorLabel ? ` — اللون: ${decodeURIComponent(variantColorLabel)}` : ""} — الكمية: ${lineQty}`
          : variantSize || variantColorLabel
            ? `المقاس: ${variantSize || "—"}${variantColorLabel ? ` — اللون: ${decodeURIComponent(variantColorLabel)}` : ""} — الكمية: ${lineQty}`
            : "";
    createOrder.mutate({
      order_number: `SAF-${Date.now().toString().slice(-6)}`,
      customer_name: formData.name.trim(),
      phone: formData.phone.trim(),
      city: DEFAULT_REGION,
      address: DEFAULT_REGION,
      product_id: productId,
      product_name: product?.name || "منتج",
      quantity_pack: pack !== "1" ? pack : String(lineQty),
      total_price: totalPrice,
      payment_method: "cod",
      notes: [formData.notes?.trim(), variantNote].filter(Boolean).join("\n\n"),
      status: "pending",
      has_upsell: formData.addUpsell,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Progress bar */}
      <div className="bg-card border-b">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-primary font-bold">
              <Check className="w-4 h-4" /> المنتج
            </span>
            <div className="w-8 h-0.5 bg-primary rounded-full" />
            <span className="flex items-center gap-1 text-primary font-bold">
              <div className="w-4 h-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">2</div>
              بيانات الطلب
            </span>
            <div className="w-8 h-0.5 bg-border rounded-full" />
            <span className="text-muted-foreground">تأكيد الطلب</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Order summary */}
          <div className="bg-card rounded-2xl border p-4 mb-6">
            <h2 className="text-sm font-bold mb-3">ملخص الطلب</h2>
            <div className="flex items-center gap-3">
              {product?.images?.[0] && (
                <img src={product.images[0]} alt="" loading="lazy" decoding="async" className="w-16 h-16 rounded-xl object-cover" />
              )}
              <div className="flex-1">
                <p className="font-bold text-sm">{product?.name || "جاري التحميل..."}</p>
                <p className="text-xs text-muted-foreground">الكمية: {packLabel}</p>
              </div>
              <p className="font-black text-primary text-lg">{totalPrice} ر.س</p>
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> شحن مجاني</span>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> ضمان ٣٠ يوم</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> توصيل ١-٣ أيام</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card rounded-2xl border p-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">
                <User className="w-4 h-4 text-black" />
              </div>
              <div>
                <h2 className="font-bold text-sm">بيانات التواصل</h2>
                <p className="text-[10px] text-muted-foreground">
                  الاسم ورقم الجوال فقط. سيتصل بك فريقنا لتأكيد العنوان الكامل داخل السعودية.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-xs font-bold mb-1.5 flex items-center gap-1">
                  <User className="w-3 h-3" /> الاسم الكريم
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="اكتب اسمك الكامل — نستخدمه للتواصل معك وتأكيد الطلب"
                  className={`rounded-xl border-slate-200 bg-slate-50/80 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 focus-visible:bg-white transition-all shadow-inner ${errors.name ? "border-destructive ring-destructive" : ""}`}
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label className="text-xs font-bold mb-1.5 flex items-center gap-1">
                  <Phone className="w-3 h-3" /> رقم الجوال
                </Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="05XXXXXXXX"
                  type="tel"
                  dir="ltr"
                  className={`rounded-xl border-slate-200 bg-slate-50/80 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 focus-visible:bg-white transition-all shadow-inner text-right ${errors.phone ? "border-destructive ring-destructive" : ""}`}
                />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label className="text-xs font-bold mb-1.5">ملاحظات (اختياري)</Label>
                <Input
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="أي ملاحظات للتوصيل"
                  className="rounded-xl border-slate-200 bg-slate-50/80 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 focus-visible:bg-white transition-all shadow-inner"
                />
              </div>

              {/* Payment: other methods shown as maintenance; COD only path */}
              <fieldset className="space-y-3 border-0 p-0 m-0 min-w-0">
                <legend className="text-xs font-bold mb-0.5 block">طريقة الدفع</legend>

                <div
                  className="rounded-xl border border-dashed border-amber-200 bg-amber-50/70 p-3 space-y-2.5 pointer-events-none select-none"
                  aria-disabled="true"
                >
                  <div className="flex items-start gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-200/80 text-amber-950">
                      <Wrench className="h-4 w-4" aria-hidden />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-[11px] font-black text-amber-950 leading-snug">بطاقات الشبكة والتقسيط — تحت التحديث</p>
                      <p className="text-[10px] text-amber-900/90 leading-relaxed mt-1">
                        هذه الطرق غير متاحة للاختيار مؤقتاً. نعمل على إعادتها قريباً — شكراً لتفهمكم.
                      </p>
                    </div>
                  </div>
                  <div className="relative rounded-lg border border-amber-100 bg-white/60 px-2 py-2">
                    <PaymentLogoStrip size="sm" maintenance className="justify-center py-0.5" />
                    <p className="text-[9px] text-center font-bold text-amber-900/80 pt-1.5">غير متاح الآن</p>
                  </div>
                </div>

                <div className="rounded-xl border-2 border-emerald-600 bg-gradient-to-b from-emerald-50/90 to-white p-4 shadow-sm ring-2 ring-emerald-500/15">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md" aria-hidden>
                      <Check className="h-5 w-5" strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-emerald-950 flex flex-wrap items-center gap-2">
                        <Banknote className="h-4 w-4 text-emerald-800 shrink-0" aria-hidden />
                        الدفع عند الاستلام
                      </p>
                      <p className="mt-1 text-[10px] font-bold text-emerald-800">الطريقة المتاحة — أكمل الاسم والجوال ثم اضغط التأكيد</p>
                      <p className="mt-1.5 text-[10px] leading-relaxed text-emerald-900/85">
                        ادفع نقداً أو ببطاقتك عند استلام الشحنة. لا نطلب بطاقة على الموقع في هذه المرحلة.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* Premium Service Upsell (Native App Style) */}
              <div className="relative mt-6 mb-4">
                {!formData.addUpsell && (
                  <div className="absolute -top-3 right-6 bg-[#2563eb] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md animate-bounce flex items-center gap-1.5 z-10">
                    اضغط للإضافة
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                  </div>
                )}
                <div 
                  className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer select-none ${formData.addUpsell ? 'border-[#2563eb] bg-[#eff6ff] shadow-sm' : 'border-slate-200 bg-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.15)] hover:border-slate-300 ring-1 ring-[#2563eb]/10'}`} 
                  onClick={() => setFormData({...formData, addUpsell: !formData.addUpsell})}
                >
                  <div className="relative mt-0.5 flex shrink-0">
                    {!formData.addUpsell && (
                      <span className="absolute -inset-1.5 rounded-full bg-[#2563eb] opacity-20 animate-ping"></span>
                    )}
                    <div className={`relative flex items-center justify-center w-5 h-5 rounded border transition-colors ${formData.addUpsell ? 'bg-[#2563eb] border-[#2563eb]' : 'bg-white border-[#2563eb] ring-2 ring-[#2563eb]/20 shadow-sm'}`}>
                      {formData.addUpsell && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[13px] font-bold text-slate-900 flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-[#2563eb]" />
                        تأمين الشحنة وشحن أولوية
                      </p>
                      <span className="text-[12px] font-black text-slate-900">+ ٢٤ ر.س</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed pr-6">
                      تجهيز فوري لطلبك وتغطية تأمينية كاملة ضد التلف أو الفقدان لضمان وصوله بأمان.
                    </p>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 bg-emerald-500 h-full"></div>
                <div>
                  <span className="font-bold text-gray-900 block">المبلغ الإجمالي:</span>
                  <span className="text-[10px] text-gray-500">الضريبة (15%) مشمولة بالسعر</span>
                </div>
                <span className="text-2xl font-black text-black">{totalPrice} ر.س</span>
              </div>

              {/* Secure Checkout */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center justify-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-gray-500" />
                <p className="text-[11px] font-medium text-gray-600">
                  تسوق آمن وموثق 100%
                </p>
              </div>

              <button
                type="submit"
                disabled={createOrder.isPending}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 active:scale-[0.98]"
              >
                {createOrder.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري تأكيد الطلب...
                  </>
                ) : (
                  <>
                    تأكيد الطلب — الدفع عند الاستلام
                    <ArrowLeft className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Trust elements */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
              <Shield className="w-6 h-6 mx-auto mb-1.5 text-black opacity-80" />
              <p className="text-[10px] font-bold">ضمان الجودة</p>
            </div>
            <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
              <Truck className="w-6 h-6 mx-auto mb-1.5 text-black opacity-80" />
              <p className="text-[10px] font-bold">شحن سريع</p>
            </div>
            <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
              <Headset className="w-6 h-6 mx-auto mb-1.5 text-black opacity-80" />
              <p className="text-[10px] font-bold">خدمة عملاء ٢٤/٧</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}