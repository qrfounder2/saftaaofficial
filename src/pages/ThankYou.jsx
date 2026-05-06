import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Phone, ShoppingBag, ArrowLeft, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { storeClient } from "@/api/storeClient";
import ProductCard from "../components/store/ProductCard";

export default function ThankYou() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("order");
  const customerName = params.get("name") || "";
  const price = params.get("price");

  const { data: products } = useQuery({
    queryKey: ["upsell-products"],
    queryFn: () => storeClient.entities.Product.filter({ is_active: true, is_featured: true }),
    initialData: [],
  });

  const hasTrackedPurchase = React.useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // TikTok Pixel: CompletePayment
    if (orderId && price && !hasTrackedPurchase.current && window.ttq) {
      window.ttq.track('CompletePayment', {
        content_type: 'product',
        value: Number(price),
        currency: 'SAR',
        event_id: orderId // Deduplication
      });
      hasTrackedPurchase.current = true;
    }
  }, [orderId, price]);

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
              <Check className="w-4 h-4" /> بيانات الطلب
            </span>
            <div className="w-8 h-0.5 bg-primary rounded-full" />
            <span className="flex items-center gap-1 text-primary font-bold">
              <Check className="w-4 h-4" /> تم التأكيد ✅
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center mb-8 pt-4"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-5 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)]">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </motion.div>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">
            تم تسجيل طلبك بنجاح!
          </h1>
          <p className="text-slate-500 font-medium">
            شكراً لثقتك بنا {customerName && <span className="font-bold text-slate-800">{decodeURIComponent(customerName)}</span>}، طلبك الآن قيد التجهيز.
          </p>
          {orderId && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-bold">رقم الطلب:</span>
              <span className="font-mono font-black text-slate-800 tracking-wider">{orderId}</span>
            </div>
          )}
        </motion.div>

        {/* Important Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm"
        >
          <h2 className="font-black text-sm mb-5 text-slate-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            ماذا سيحدث الآن؟
          </h2>

          <div className="space-y-4 relative">
            <div className="absolute right-[19px] top-6 bottom-6 w-0.5 bg-slate-100"></div>

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border-4 border-white flex items-center justify-center shrink-0 text-sm font-black shadow-sm">
                1
              </div>
              <div className="pt-2">
                <p className="text-sm font-bold text-slate-800">تأكيد سريع للطلب</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  سيتواصل معك أحد موظفينا قريباً لتأكيد تفاصيل العنوان والطلب.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 border-4 border-white flex items-center justify-center shrink-0 text-sm font-black shadow-sm">
                2
              </div>
              <div className="pt-2">
                <p className="text-sm font-bold text-slate-800">تجهيز وشحن فوري</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  يتم تغليف طلبك بعناية وتسليمه لشركة الشحن لضمان وصوله بأسرع وقت.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 border-4 border-white flex items-center justify-center shrink-0 text-sm font-black shadow-sm">
                3
              </div>
              <div className="pt-2">
                <p className="text-sm font-bold text-slate-800">الدفع عند الاستلام براحة تامة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  استلم طلبك خلال ١-٣ أيام وادفع لمندوب التوصيل (نقداً أو بالشبكة).
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Confirmation booster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-amber-50 border border-amber-200/60 rounded-2xl p-5 mb-6 flex items-start gap-3 shadow-inner"
        >
          <div className="bg-amber-100 p-2 rounded-full shrink-0">
            <Phone className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h3 className="font-bold text-amber-900 text-sm mb-1">الرجاء إبقاء هاتفك قريباً</h3>
            <p className="text-[11px] text-amber-700/80 leading-relaxed font-medium">
              سيتم الاتصال بك قريباً من قبل فريقنا. لتجنب أي تأخير في الشحن، نرجو منك الرد على المكالمة لتأكيد عنوانك.
            </p>
          </div>
        </motion.div>

        {/* Direct Support Ticket Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl border p-5 md:p-6 mb-8 shadow-sm"
        >
          <div className="flex flex-col items-center text-center mb-5">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h3 className="font-bold text-slate-800 mb-1">عندك سؤال أو استفسار؟</h3>
            <p className="text-xs text-slate-500">
              أرسل رسالتك الآن وسيقوم فريق الدعم بالرد عليك مباشرة عبر رسالة نصية (SMS)
            </p>
          </div>

          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              const message = form.message.value;
              const phone = form.phone.value;
              if (!message || !phone) return;
              
              const btn = form.submitBtn;
              const originalText = btn.innerText;
              btn.disabled = true;
              btn.innerText = "جاري الإرسال...";
              
              try {
                const res = await fetch('/api/tickets', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    orderId: orderId || "",
                    name: customerName || "عميل",
                    phone: phone,
                    message: message
                  })
                });
                if (res.ok) {
                  form.innerHTML = `
                    <div class="flex flex-col items-center text-center py-4">
                      <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                        <svg class="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <p class="font-bold text-emerald-800 text-sm">تم استلام رسالتك بنجاح</p>
                      <p class="text-xs text-emerald-600/80 mt-1">سيتم الرد عليك عبر رسالة نصية قريباً</p>
                    </div>
                  `;
                }
              } catch (err) {
                btn.disabled = false;
                btn.innerText = originalText;
                alert("حدث خطأ، يرجى المحاولة مرة أخرى");
              }
            }}
            className="space-y-3"
          >
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم الجوال (للتواصل معك)</label>
              <input 
                type="tel" 
                name="phone"
                required
                placeholder="05XXXXXXXX"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">رسالتك</label>
              <textarea 
                name="message"
                required
                placeholder="اكتب استفسارك هنا (تعديل عنوان، استفسار عن الشحن...)"
                rows="3"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              name="submitBtn"
              className="w-full bg-slate-900 text-white font-bold text-sm py-3 rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
            >
              إرسال الرسالة
            </button>
          </form>
        </motion.div>

        {/* Upsell - More Products */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-accent bg-accent/10 px-4 py-1.5 rounded-full">
                🎁 عروض حصرية لك
              </span>
              <h2 className="text-xl font-black mt-3">أضف لطلبك واستفد أكثر!</h2>
              <p className="text-sm text-muted-foreground mt-1">
                عملاؤنا اللي طلبوا أكثر من منتج حصلوا على نتائج أفضل
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {products.slice(0, 4).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            <div className="text-center mt-6">
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold text-sm hover:bg-primary/90 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                تصفح جميع المنتجات
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Social proof */}
        <div className="mt-12 text-center pb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-bold">٤.٩</span>
          </div>
          <p className="text-sm font-bold">تقييم ٤.٩ / ٥ من أكثر من ٥٠,٠٠٠ عميل</p>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <svg viewBox="0 0 512 512" className="w-5 h-5 rounded-sm">
              <path fill="#118C4F" d="M0 0h512v512H0z"/>
              <path fill="#FFF" d="M169 220l4 18-20-4 12 18-18-9 14 15-20-1 20 5-18 12 20-5-15 16 17-10-6 20 12-16 1 19 8-18 8 18 1-19 12 16-6-20 17 10-15-16 20 5-18-12 20-5-20 1 14-15-18 9 12-18-20 4z"/>
              <path fill="#FFF" d="M256 137c-17 0-31 14-31 31s14 31 31 31 31-14 31-31-14-31-31-31z"/>
            </svg>
            <p className="text-xs text-muted-foreground">أول متجر سعودي متخصص في صحة المفاصل</p>
          </div>
        </div>
      </div>
    </div>
  );
}