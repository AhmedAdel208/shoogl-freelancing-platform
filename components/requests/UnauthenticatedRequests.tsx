

import Link from "next/link";
import { LogIn, UserPlus, Briefcase, FileText, CheckCircle } from "lucide-react";

export default function UnauthenticatedRequests() {
  return (
    <div className="bg-bg min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden rounded-3xl border border-border shadow-sm mx-4 my-8 md:my-12">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl opacity-60" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-3xl opacity-60" />
      </div>

      <div className="max-w-3xl w-full flex flex-col items-center z-10 mt-8">
        <div className="w-24 h-24 bg-card-bg shadow-sm rounded-full flex items-center justify-center border border-border mb-8 relative">
           <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-20 mix-blend-multiply" />
           <Briefcase className="w-12 h-12 text-primary relative z-10" />
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-heading text-center tracking-tight mb-4">
          أنجز أعمالك وتابع عروضك <span className="text-primary">بكل سهولة</span>
        </h1>
        
        <p className="text-lg md:text-xl text-text-secondary text-center mb-12 max-w-2xl leading-relaxed">
          سواء كنت تبحث عن مستقلين لتنفيذ مشاريعك، أو كنت مستقلاً يبحث عن فرص عمل جديدة، منصة شغل توفر لك كل ما تحتاجه للنجاح.
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          <div className="bg-card-bg p-6 rounded-2xl border border-border shadow-sm flex flex-col items-center text-center hover:border-primary/30 transition-colors">
             <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
               <FileText className="w-7 h-7" />
             </div>
             <h3 className="text-lg text-heading font-bold mb-2">تابع طلباتك</h3>
             <p className="text-sm text-text-secondary">اطلع على حالة طلبات العمل التي قمت بإنشائها أو تقديم عروض عليها.</p>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-border shadow-sm flex flex-col items-center text-center hover:border-secondary/30 transition-colors">
             <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-4 text-secondary">
               <CheckCircle className="w-7 h-7" />
             </div>
             <h3 className="text-lg text-heading font-bold mb-2">إدارة المشاريع</h3>
             <p className="text-sm text-text-secondary">قم بإدارة مشاريعك قيد التنفيذ بكل احترافية وتابع تقدم العمل.</p>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-border shadow-sm flex flex-col items-center text-center hover:border-primary/30 transition-colors">
             <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
               <Briefcase className="w-7 h-7" />
             </div>
             <h3 className="text-lg text-heading font-bold mb-2">سجل الإنجازات</h3>
             <p className="text-sm text-text-secondary">احتفظ بسجل للمشاريع المكتملة وقم بتوثيق وتقييم الأعمال التي تم إنجازها.</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
          <Link
            href="/signup"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <UserPlus className="w-5 h-5" />
            أنشئ حسابك الآن
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 bg-card-bg hover:bg-bg text-heading border border-border px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-sm hover:shadow hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <LogIn className="w-5 h-5" />
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}
