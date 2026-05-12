import React from "react";
import { Link } from "react-router-dom";
import { CHECKOUT_FEATURED_WAIST } from "@/data/metroLaunchNav";

export default function HeroBanner() {
  return (
    <Link
      to={CHECKOUT_FEATURED_WAIST}
      className="block relative w-full overflow-hidden"
      aria-label="اطلبي الآن — إتمام الطلب مباشرة"
    >
      <img
        src="https://metrobrazil.com/cdn/shop/files/home_page-arabic-desktop_2000x.png?v=1777559090"
        alt="عروض مترو برازيل"
        className="w-full h-auto hidden md:block"
      />
      <img
        src="https://metrobrazil.com/cdn/shop/files/home_page-arabic-mobile_2000x.png?v=1777559095"
        alt="عروض مترو برازيل"
        className="w-full h-auto md:hidden"
      />
    </Link>
  );
}
