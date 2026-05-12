import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CHECKOUT_FEATURED_WAIST } from "@/data/metroLaunchNav";

export default function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 15, minutes: 20, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 4);
    targetDate.setHours(targetDate.getHours() + 15);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Link
      to={CHECKOUT_FEATURED_WAIST}
      className="block bg-foreground/85 text-primary-foreground py-4 px-4 text-center hover:bg-foreground/90 transition-colors"
      aria-label="اطلبي الآن قبل انتهاء العرض — الانتقال لإتمام الطلب"
    >
      <h2 className="text-lg md:text-xl font-bold mb-2">اطلبي الآن! قبل زحمة العيد...</h2>
      <div className="inline-flex items-center gap-1 bg-background text-foreground rounded-lg px-4 py-2 font-bold text-sm pointer-events-none">
        <span>{timeLeft.seconds}</span>
        <span className="text-muted-foreground text-xs">ثوان</span>
        <span className="mx-1">:</span>
        <span>{timeLeft.minutes}</span>
        <span className="text-muted-foreground text-xs">دقائق</span>
        <span className="mx-1">:</span>
        <span>{timeLeft.hours}</span>
        <span className="text-muted-foreground text-xs">ساعات</span>
        <span className="mx-1">:</span>
        <span>{timeLeft.days}</span>
        <span className="text-muted-foreground text-xs">أيام</span>
      </div>
    </Link>
  );
}
