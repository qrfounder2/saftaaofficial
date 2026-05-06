import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في لوحة التحكم",
          duration: 2500,
        });
        navigate('/mojourney/dashboard');
      } else {
        const message = data.error || "بيانات الاعتماد غير صحيحة";
        setErrorMessage(message);
        toast({
          title: "فشل تسجيل الدخول",
          description: message,
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      setErrorMessage("تعذر الاتصال بالخادم. تأكد أن السيرفر الخلفي يعمل على المنفذ 3001.");
      toast({
        title: "خطأ في الاتصال",
        description: "تعذر الاتصال بالخادم. تأكد أن السيرفر الخلفي يعمل على المنفذ 3001.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-tajawal" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">تسجيل دخول المسؤول</h2>
          <p className="text-gray-500 text-sm mt-2">Safta COD Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اسم المستخدم</label>
            <Input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="أدخل اسم المستخدم"
              required
              className="w-full text-left"
              dir="ltr"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور</label>
            <Input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full text-left"
              dir="ltr"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "جاري التحقق..." : "تسجيل الدخول"}
          </Button>
          {errorMessage && (
            <p className="text-sm text-red-600 mt-2 text-center">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
