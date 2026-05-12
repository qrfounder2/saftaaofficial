import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function HeroBanner({ heroImage }) {
  const [countdown, setCountdown] = useState({ days: 4, hours: 20, minutes: 32, seconds: 0 });

  useEffect(() => {
    const target = Date.now() + (4 * 24 + 20) * 3600000 + 32 * 60000;
    const interval = setInterval(() => {
      const diff = target - Date.now();
      if (diff <= 0) { clearInterval(interval); return; }
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="relative">
        <img
          src={heroImage}
          alt="مشدات برازيلية أصلية"
          className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-md mr-auto text-white">
              <p className="text-sm font-medium opacity-80 mb-2">مشدات برازيلية أصلية</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4">
                اطلبي الآن!
                <br />
                <span className="text-accent">قبل نفاذ الكمية</span>
              </h2>

              {/* Countdown */}
              <div className="flex gap-3 mb-6">
                {[
                  { val: countdown.days, label: 'يوم' },
                  { val: countdown.hours, label: 'ساعة' },
                  { val: countdown.minutes, label: 'دقيقة' },
                  { val: countdown.seconds, label: 'ثانية' },
                ].map((t, i) => (
                  <div key={i} className="bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 text-center min-w-[52px]">
                    <div className="text-xl font-black">{String(t.val).padStart(2, '0')}</div>
                    <div className="text-[10px] opacity-70">{t.label}</div>
                  </div>
                ))}
              </div>

              <Link to="/collections">
                <Button size="lg" className="bg-white text-foreground hover:bg-white/90 rounded-xl h-12 px-8 font-bold text-base gap-2">
                  تسوقي الآن
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}