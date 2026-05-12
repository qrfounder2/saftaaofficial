import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CHECKOUT_FEATURED_WAIST, ROUTES } from "@/data/metroLaunchNav";

export default function GuideBanner() {
  return (
    <div
      className="relative my-8 overflow-hidden rounded-2xl"
      style={{ background: "linear-gradient(135deg, #e8d5f0 0%, #f5d5e8 50%, #d5c8e8 100%)" }}
    >
      <div className="flex">
        <div className="flex flex-1 flex-col justify-center p-6">
          <p className="mb-1 text-base font-bold text-foreground/70">لست متأكدة؟</p>
          <h3 className="mb-4 text-xl font-black leading-tight">
            دليل اختيار المنتج
            <br />
            هنا لمساعدتك
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-primary-foreground">
              <Link to={ROUTES.guide}>شاهدي الدليل</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-lg border-neutral-900/15 bg-white/80 px-5 py-2 text-sm font-black text-neutral-900 backdrop-blur-sm hover:bg-white">
              <Link to={CHECKOUT_FEATURED_WAIST}>اطلبي الآن</Link>
            </Button>
          </div>
        </div>
        <div className="w-40 flex-shrink-0">
          <img
            src="https://metrobrazil.com/cdn/shop/files/home_page-arabic-mobile_800x.png?v=1777559095"
            alt="دليل المنتجات"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
