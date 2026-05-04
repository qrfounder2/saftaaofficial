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

  const { data: products } = useQuery({
    queryKey: ["upsell-products"],
    queryFn: () => storeClient.entities.Product.filter({ is_active: true, is_featured: true }),
    initialData: [],
  });

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
          className="text-center mb-8"
        >
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Check className="w-10 h-10 text-primary" />
            </motion.div>
          </div>

          <h1 className="text-2xl md:text-3xl font-black mb-2">
            تم تأكيد طلبك بنجاح! 🎉
          </h1>
          <p className="text-muted-foreground">
            شكراً لك {customerName && <span className="font-bold text-foreground">{decodeURIComponent(customerName)}</span>}، طلبك في الطريق إليك!
          </p>
          {orderId && (
            <p className="text-xs text-muted-foreground mt-1">
              رقم الطلب: <span className="font-mono font-bold">{orderId}</span>
            </p>
          )}
        </motion.div>

        {/* Important Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl border p-5 mb-6"
        >
          <h2 className="font-bold text-sm mb-4 flex items-center gap-2">
            <span className="text-lg">📋</span>
            خطوات مهمة — الرجاء قراءتها
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 text-sm font-bold">
                1
              </div>
              <div>
                <p className="text-sm font-bold">سيتواصل معك فريقنا خلال ساعات</p>
                <p className="text-xs text-muted-foreground">
                  سنتصل بك لتأكيد الطلب والعنوان. <span className="font-bold text-destructive">الرجاء الرد على المكالمة</span> حتى لا يتأخر طلبك.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 text-sm font-bold">
                2
              </div>
              <div>
                <p className="text-sm font-bold">جهّز المبلغ عند التوصيل</p>
                <p className="text-xs text-muted-foreground">
                  الدفع نقداً عند الاستلام. تأكد من وجود المبلغ المطلوب لتسهيل عملية التوصيل.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-secondary rounded-xl">
              <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center shrink-0 text-sm font-bold">
                3
              </div>
              <div>
                <p className="text-sm font-bold">استلم طلبك خلال ١-٣ أيام عمل</p>
                <p className="text-xs text-muted-foreground">
                  سيصلك المنتج مغلّف بعناية. تأكد من فحصه عند الاستلام.
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
          className="bg-destructive/5 border border-destructive/10 rounded-2xl p-5 mb-6 text-center"
        >
          <Phone className="w-8 h-8 mx-auto text-destructive mb-2" />
          <h3 className="font-bold mb-1">⚠️ مهم جداً</h3>
          <p className="text-sm text-muted-foreground">
            عند اتصال فريق التوصيل بك، <span className="font-bold text-foreground">الرجاء الرد فوراً</span> لتأكيد طلبك.
            عدم الرد قد يؤدي لإلغاء الطلب.
          </p>
        </motion.div>

        {/* WhatsApp support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl border p-5 mb-8 text-center"
        >
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#25D366] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <h3 className="font-bold mb-1">عندك سؤال؟</h3>
          <p className="text-xs text-muted-foreground mb-3">تواصل معنا عبر واتساب لأي استفسار</p>
          <a
            href="https://wa.me/966501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#20BA5A] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            تواصل عبر واتساب
          </a>
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