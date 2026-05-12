import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CHECKOUT_FEATURED_WAIST } from "@/data/metroLaunchNav";

export default function GuideBanner() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden my-8"
      style={{ background: "linear-gradient(135deg, #e8d5f0 0%, #f5d5e8 50%, #d5c8e8 100%)" }}
    >
      <div className="flex">
        <div className="flex-1 p-6 flex flex-col justify-center">
          <p className="text-foreground/70 text-base font-bold mb-1">لست متأكدة؟</p>
          <h3 className="text-xl font-black leading-tight mb-4">
            دليل اختيار المنتج
            <br />
            هنا لمساعدتك
          </h3>
          <div>
            <Button asChild className="rounded-lg px-5 py-2 font-bold text-sm bg-primary text-primary-foreground">
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
