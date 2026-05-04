import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { storeClient } from "@/api/storeClient";
import { motion } from "framer-motion";
import { MapPin, Phone, User, Check, Loader2, ArrowLeft, Truck, Clock, Shield, Headset, Banknote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { paymentIcons } from "../lib/payments";

const cities = [
  "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر",
  "الظهران", "الأحساء", "الطائف", "تبوك", "بريدة", "حائل", "خميس مشيط",
  "أبها", "نجران", "جازان", "ينبع", "القطيف", "الجبيل", "عنيزة",
  "الباحة", "سكاكا", "عرعر", "الزلفي", "المجمعة", "الخرج", "الدوادمي",
  "القصيم", "حفر الباطن", "رابغ", "أخرى"
];

export default function OrderForm() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");
  const pack = params.get("pack") || "1";
  const priceParam = params.get("price");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
    isSubscription: false,
  });
  const [errors, setErrors] = useState({});

  const { data: product } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => storeClient.entities.Product.filter({ id: productId }),
    select: (data) => data[0],
    enabled: !!productId,
  });

  const basePrice = priceParam ? Number(priceParam) : product?.price || 0;
  const totalPrice = basePrice + (formData.addUpsell ? 49 : 0);
  const packLabel = pack === "5" ? "٥ عبوات" : pack === "3" ? "٣ عبوات" : "عبوة واحدة";

  const createOrder = useMutation({
    mutationFn: (orderData) => storeClient.entities.Order.create(orderData),
    onSuccess: (data) => {
      navigate(`/thank-you?order=${data.id}&name=${encodeURIComponent(formData.name)}`);
    },
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "الاسم مطلوب";
    if (!formData.phone.trim()) newErrors.phone = "رقم الجوال مطلوب";
    else if (!/^(05|5|9665)\d{8}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "أدخل رقم جوال صحيح";
    }
    if (!formData.city) newErrors.city = "المدينة مطلوبة";
    if (!formData.address.trim()) newErrors.address = "العنوان مطلوب";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    createOrder.mutate({
      order_number: `SAF-${Date.now().toString().slice(-6)}`,
      customer_name: formData.name.trim(),
      phone: formData.phone.trim(),
      city: formData.city,
      address: formData.address.trim(),
      product_id: productId,
      product_name: product?.name || "منتج",
      quantity_pack: pack,
      total_price: totalPrice,
      payment_method: "cod",
      notes: formData.notes,
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
                <img src={product.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover" />
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
                <MapPin className="w-4 h-4 text-black" />
              </div>
              <div>
                <h2 className="font-bold text-sm">أين نرسل طلبك؟</h2>
                <p className="text-[10px] text-muted-foreground">الرجاء إدخال بيانات التوصيل بدقة لضمان وصول شحنتك بسرعة</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-xs font-bold mb-1.5 flex items-center gap-1">
                  <User className="w-3 h-3" /> الاسم الكامل
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: محمد أحمد"
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
                <Label className="text-xs font-bold mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> المدينة
                </Label>
                <Select value={formData.city} onValueChange={(val) => setFormData({ ...formData, city: val })}>
                  <SelectTrigger className={`rounded-xl border-slate-200 bg-slate-50/80 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all shadow-inner ${errors.city ? "border-destructive ring-destructive" : ""}`}>
                    <SelectValue placeholder="اختر مدينتك" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
              </div>

              <div>
                <Label className="text-xs font-bold mb-1.5">العنوان بالتفصيل</Label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="الحي، الشارع، رقم المبنى أو الشقة"
                  className={`rounded-xl min-h-[80px] border-slate-200 bg-slate-50/80 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 focus-visible:bg-white transition-all shadow-inner ${errors.address ? "border-destructive ring-destructive" : ""}`}
                />
                {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
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

              {/* Payment Method */}
              <div className="bg-secondary/50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold flex items-center gap-1.5"><Banknote className="w-4 h-4 text-black opacity-80" /> الدفع عند الاستلام</p>
                    <p className="text-[10px] text-muted-foreground">ادفع نقداً أو بالشبكة عند وصول طلبك</p>
                  </div>
                </div>
                
                {/* Professional explanation banner */}
                <div className="bg-blue-50/80 border border-blue-100 rounded-lg p-3 flex gap-2 items-start mt-2">
                  <div className="mt-0.5 shrink-0">
                    <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-blue-900 leading-relaxed mb-0.5">الدفع عند الاستلام متاح مجاناً</p>
                    <p className="text-[10px] text-blue-700 leading-relaxed">
                      لسلامتك وراحتك، وفرنا خدمة (الدفع عند الاستلام). عاين منتجك بنفسك ولا تدفع ريالاً واحداً حتى تستلمه بيدك.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cross-sell / Upsell */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 mt-2 mb-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1 h-full bg-emerald-500"></div>
                <div className="absolute -left-6 -top-6 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
                
                <div className="flex items-start gap-3 relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-white border border-emerald-100 flex-shrink-0 overflow-hidden p-1 shadow-sm">
                    {/* Placeholder image for cross-sell (e.g. pain relief oil) */}
                    <img src="/images/categories/cat-joints.webp" alt="زيت التدليك" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-1.5 py-0.5 rounded-sm">عرض حصري</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 leading-tight">زيت التدليك العضوي السريع (Upsell)</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-black text-emerald-700">+ ٤٩ ر.س</span>
                      <span className="text-[10px] text-slate-400 line-through">٩٩ ر.س</span>
                    </div>
                  </div>
                </div>
                
                <label className="flex items-center gap-2.5 mt-3 pt-3 border-t border-emerald-100 cursor-pointer relative z-10">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.addUpsell ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-300'}`}>
                    {formData.addUpsell && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={formData.addUpsell || false}
                    onChange={(e) => setFormData({...formData, addUpsell: e.target.checked})}
                  />
                  <span className="text-[12px] font-bold text-slate-700">نعم، أضف هذا المنتج لطلبي</span>
                </label>
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
                className="w-full bg-black text-white py-4 rounded-2xl font-black text-lg hover:bg-gray-800 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-black/10"
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
          {/* Real Payment / Trust Badges */}
          <div className="flex items-center justify-center gap-1.5 mt-5 flex-nowrap w-full overflow-x-auto pb-1">
            <span className="text-[10px] text-gray-500 ml-1 font-medium whitespace-nowrap">طرق الدفع الآمنة:</span>
            <img src={paymentIcons.mada} alt="mada" className="h-3.5 object-contain shrink-0" />
            <img src={paymentIcons.visa} alt="visa" className="h-3.5 object-contain shrink-0" />
            <img src={paymentIcons.mastercard} alt="mastercard" className="h-3.5 object-contain shrink-0" />
            <img src={paymentIcons.applepay} alt="apple pay" className="h-3.5 object-contain shrink-0" />
            <img src={paymentIcons.tabby} alt="tabby" className="h-3.5 object-contain shrink-0" />
            <img src={paymentIcons.tamara} alt="tamara" className="h-3.5 object-contain shrink-0" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}