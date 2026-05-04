import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { storeClient } from "@/api/storeClient";
import { motion } from "framer-motion";
import {
  Shield, Truck, ChevronLeft, Check, Package,
  ArrowLeft
} from "lucide-react";
import QuantitySelector from "../components/store/QuantitySelector";
import StickyBuyBar from "../components/store/StickyBuyBar";
import Testimonials from "../components/store/Testimonials";
import FAQ from "../components/store/FAQ";
import ProductCard from "../components/store/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { paymentIcons } from "../lib/payments";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPack, setSelectedPack] = useState("2");
  const [packData, setPackData] = useState(null);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => storeClient.entities.Product.filter({ id }),
    select: (data) => data[0],
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["related-products", product?.category],
    queryFn: () => storeClient.entities.Product.filter({ category: product?.category, is_active: true }),
    enabled: !!product?.category,
    initialData: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleBuy = () => {
    const price = packData?.price || product?.price;
    const qty = packData?.id || "1";
    navigate(`/order?product=${id}&pack=${qty}&price=${price}`);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">المنتج غير موجود</p>
        <Link to="/categories" className="text-primary underline text-sm mt-2 block">
          العودة للمنتجات
        </Link>
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : ["/images/products/product-default.webp"];
  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground">الرئيسية</Link>
          <ChevronLeft className="w-3 h-3" />
          <Link to="/categories" className="hover:text-foreground">المنتجات</Link>
          <ChevronLeft className="w-3 h-3" />
          <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Images */}
          <div>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square rounded-2xl overflow-hidden bg-secondary mb-3"
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      i === selectedImage ? "border-primary" : "border-border"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.badge && (
              <span className="inline-block bg-destructive/10 text-destructive text-xs font-bold px-3 py-1 rounded-full mb-3">
                {product.badge}
              </span>
            )}

            <h1 className="text-2xl md:text-3xl font-black mb-2">{product.name}</h1>

            {/* Doctor Recommended Micro-feature */}
            <div className="flex items-center gap-1.5 mb-3 flex-wrap">
              <span className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-sm">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                ينصح به الأطباء والصيادلة
              </span>
              <span className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-sm">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                مرخص من هيئة الغذاء والدواء
              </span>
            </div>

            {/* Official KSA Distributor */}
            <div className="my-4 bg-gray-50 border border-gray-200 rounded-xl p-3 flex gap-3 items-center">
              <Shield className="w-5 h-5 text-gray-600 shrink-0" />
              <div>
                <h3 className="text-xs font-bold text-gray-900">الوكيل الحصري في السعودية 🇸🇦</h3>
                <p className="text-[10px] text-gray-600 mt-0.5 leading-relaxed">
                  جميع منتجاتنا أصلية 100٪ ومصرحة من الجهات المختصة.
                </p>
              </div>
            </div>

            {/* Rating - Amazon Style */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex drop-shadow-sm">
                {[1,2,3,4,5].map((s) => (
                  <svg 
                    key={s} 
                    className={`w-4 h-4 ${s <= (product.rating || 5) ? "text-[#FFA41C] fill-[#FFA41C]" : "text-gray-300 fill-gray-300"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#007185] hover:text-[#C45500] cursor-pointer transition-colors border-b border-transparent hover:border-[#C45500]">
                {product.reviews_count?.toLocaleString() || 0} تقييم
              </span>
              <span className="mx-1 text-border">|</span>
              <span className="flex items-center gap-1 text-xs text-[#007185] font-medium bg-[#007185]/5 px-2 py-0.5 rounded-sm border border-[#007185]/20">
                <svg className="w-3.5 h-3.5 text-[#007185]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                مشتريات موثّقة
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-black text-black">{product.price} ر.س</span>
              {product.compare_price && (
                <>
                  <span className="text-lg text-gray-400 line-through">{product.compare_price} ر.س</span>
                  <span className="bg-red-50 text-red-600 border border-red-100 text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    -{discount}٪
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-muted-foreground mb-4">شامل الضريبة</p>

            {/* FOMO Live Viewers */}
            <div className="flex items-center gap-2 mb-6 bg-red-50 border border-red-100 rounded-lg p-2.5 w-fit">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <p className="text-xs font-bold text-red-700">٤٢ شخص يشاهد هذا المنتج الآن</p>
            </div>

            {/* Short description */}
            {product.short_description && (
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {product.short_description}
              </p>
            )}

            {/* Delivery info mini */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="text-center p-3 rounded-xl bg-secondary/50">
                <Truck className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-[10px] font-bold">توصيل سريع</p>
                <p className="text-[9px] text-muted-foreground">١-٣ أيام عمل</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-secondary/50">
                <Shield className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-[10px] font-bold">ضمان ٣٠ يوم</p>
                <p className="text-[9px] text-muted-foreground">استرجاع كامل</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-secondary/50">
                <Package className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-[10px] font-bold">دفع عند الاستلام</p>
                <p className="text-[9px] text-muted-foreground">بدون مخاطر</p>
              </div>
            </div>

            {/* Quantity Packs */}
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3">اختر الكمية:</h3>
              <QuantitySelector
                product={product}
                selected={selectedPack}
                onSelect={(pack) => {
                  setSelectedPack(pack.id);
                  setPackData(pack);
                }}
              />
            </div>

            {/* Buy Button */}
            <button
              onClick={handleBuy}
              className="w-full bg-black text-white py-4 rounded-2xl font-black text-lg hover:bg-gray-800 transition-all hover:scale-[1.02] shadow-lg shadow-black/20 flex items-center justify-center gap-2"
            >
              اطلب الآن — الدفع عند الاستلام
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Secure Checkout */}
            <div className="flex flex-col items-center justify-center gap-1.5 mt-4">
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                تسوق آمن وموثق 100%
              </p>
            </div>

            {/* Stock urgency - Realistic ProgressBar */}
            {product.stock && product.stock < 50 && (
              <div className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 bg-rose-500 h-full"></div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                    طلب عالي: متبقي {product.stock} قطعة فقط
                  </p>
                  <p className="text-[10px] font-bold text-rose-500">{Math.round((product.stock / 100) * 100)}%</p>
                </div>
                <div className="w-full bg-rose-200/50 rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-rose-500 h-full rounded-full" 
                  />
                </div>
                  <p className="text-[10px] text-rose-600/80 mt-2 font-medium">الرجاء إتمام الطلب قبل نفاذ الكمية لتجنب التأخير</p>
              </div>
            )}

            {/* Product Details Accordion */}
            <Accordion type="single" collapsible className="mt-6">
              {product.description && (
                <AccordionItem value="desc" className="border-b-0 bg-secondary/30 rounded-xl px-4 mb-2">
                  <AccordionTrigger className="text-sm font-bold hover:no-underline py-3">
                    وصف المنتج
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {product.description}
                  </AccordionContent>
                </AccordionItem>
              )}
              {product.benefits?.length > 0 && (
                <AccordionItem value="benefits" className="border-b-0 bg-secondary/30 rounded-xl px-4 mb-2">
                  <AccordionTrigger className="text-sm font-bold hover:no-underline py-3">
                    الفوائد
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <ul className="space-y-2">
                      {product.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
              {product.how_to_use && (
                <AccordionItem value="usage" className="border-b-0 bg-secondary/30 rounded-xl px-4 mb-2">
                  <AccordionTrigger className="text-sm font-bold hover:no-underline py-3">
                    طريقة الاستخدام
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {product.how_to_use}
                  </AccordionContent>
                </AccordionItem>
              )}
              {product.ingredients && (
                <AccordionItem value="ingredients" className="border-b-0 bg-secondary/30 rounded-xl px-4">
                  <AccordionTrigger className="text-sm font-bold hover:no-underline py-3">
                    المكونات
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {product.ingredients}
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.filter(p => p.id !== product.id).length > 0 && (
          <section className="mt-16 mb-8">
            <h2 className="text-xl md:text-2xl font-black mb-6">منتجات قد تعجبك</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.filter(p => p.id !== product.id).slice(0, 4).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Testimonials & FAQ */}
      <Testimonials type="product" />
      <FAQ />

      {/* Sticky buy bar on mobile */}
      <StickyBuyBar product={product} onBuy={handleBuy} />
      {/* Spacer for sticky bar */}
      <div className="h-20 md:hidden" />
    </>
  );
}