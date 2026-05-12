import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

export default function HelpSection() {
  return (
    <div className="bg-gradient-to-b from-pink-100 to-purple-100 rounded-2xl p-8 text-center my-6">
      <h3 className="text-2xl font-black mb-2">هل تحتاجي مساعدة ؟</h3>
      <p className="text-base font-medium text-muted-foreground mb-6">
        الإيميل & الواتساب: متاح 24/7 طوال أيام الإسبوع
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="mailto:contact@metrobrazil.com"
          className="flex items-center gap-2 justify-center bg-muted-foreground/20 text-foreground px-5 py-3 rounded-xl font-bold"
        >
          <Mail className="w-5 h-5" />
          <div className="text-right">
            <p className="text-sm font-bold">الإيميل</p>
            <p className="text-xs">contact@metrobrazil.com</p>
          </div>
        </a>
        <a
          href="https://wa.me/920031958"
          className="flex items-center gap-2 justify-center bg-muted-foreground/20 text-foreground px-5 py-3 rounded-xl font-bold"
        >
          <MessageCircle className="w-5 h-5" />
          <div className="text-right">
            <p className="text-sm font-bold">الواتساب</p>
            <p className="text-xs">9200 31958</p>
          </div>
        </a>
      </div>
    </div>
  );
}