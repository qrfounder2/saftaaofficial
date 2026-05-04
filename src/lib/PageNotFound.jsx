import { useLocation } from 'react-router-dom';


export default function PageNotFound({}) {
    const location = useLocation();
    
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background" dir="rtl">
            <div className="max-w-md w-full">
                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-7xl font-light text-muted-foreground/30">404</h1>
                        <div className="h-0.5 w-16 bg-border mx-auto"></div>
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-foreground">الصفحة غير موجودة</h2>
                        <p className="text-muted-foreground">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
                        <p className="text-xs text-muted-foreground/70" dir="ltr">{location.pathname}</p>
                    </div>
                    <div className="pt-6">
                        <button 
                            onClick={() => window.location.href = '/'} 
                            className="inline-flex items-center px-6 py-3 text-sm font-bold text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-all"
                        >
                            العودة للرئيسية
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}