"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ChevronDown, Home, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface TermSection {
  id: string;
  title: string;
  content: string[];
}

const termsData: TermSection[] = [
  {
    id: "introduction",
    title: "مقدمة",
    content: [
      "مرحباً بك في منصة شوغول للعمل الحر",
      "هذه الشروط والأحكام تحكم استخدامك لمنصتنا وخدماتنا",
      "باستخدامك للمنصة، فإنك توافق على هذه الشروط بالكامل",
      "يجب قراءة هذه الشروط بعناية قبل استخدام المنصة"
    ]
  },
  {
    id: "registration",
    title: "شروط التسجيل",
    content: [
      "يجب أن تكون قد بلغت السن القانونية للتسجيل في المنصة",
      "يجب تقديم معلومات دقيقة وحقيقية عند التسجيل",
      "أنت مسؤول عن سرية حسابك وكلمة المرور الخاصة بك",
      "يحظر إنشاء أكثر من حساب واحد لنفس المستخدم"
    ]
  },
  {
    id: "platform-usage",
    title: "شروط استخدام المنصة",
    content: [
      "يجب استخدام المنصة للأغراض المشروعة فقط",
      "يحظر نشر محتوى غير لائق أو مخالف للقوانين",
      "يجب احترام المستخدمين الآخرين والتعامل بأدب",
      "يحظر استخدام المنصة للأنشطة الاحتيالية أو المضللة"
    ]
  },
    {
    id: "payment-commission",
    title: "شروط الدفع والعمولة",
    content: [
      "تتقاضى شوغول عمولة على كل معاملة تتم عبر المنصة",
      "نسبة العمولة محددة في سياسة العمولة الخاصة بالمنصة",
      "يجب الدفع عبر الطرق المعتمدة في المنصة فقط",
      "يتم تحرير الأموال بعد إكمال المشروع وتقييم الطرفين"
    ]
  },
  {
    id: "intellectual-property",
    title: "محتوى الملكية الفكرية",
    content: [
      "يحتفظ أصحاب المشاريع بحقوق الملكية الفكرية لأعمالهم",
      "يجب الحصول على إذن قبل استخدام محتوى الآخرين",
      "المنصة ليست مسؤولة عن انتهاك حقوق الملكية الفكرية",
      "يمكن للمنصة إزالة المحتوى المنتهك للحقوق"
    ]
  },
  {
    id: "usage-policy",
    title: "سياسة حد الاستخدام",
    content: [
      "يوجد حد أقصى لعدد المشاريع التي يمكن نشرها شهرياً",
      "يوجد حد أقصى لحجم الملفات التي يمكن رفعها",
      "يتم مراقبة الاستخدام المفرط الذي قد يؤثر على أداء المنصة",
      "يمكن تعديل حدود الاستخدام وفقاً لخطة المستخدم"
    ]
  },
  {
    id: "service-termination",
    title: "إنهاء الخدمة",
    content: [
      "يمكنك إغلاق حسابك في أي وقت من إعدادات الملف الشخصي",
      "تحتفظ المنصة بحق إيقاف الحسابات المخالفة للشروط",
      "يتم إشعار المستخدم قبل إيقاف الحساب (في معظم الحالات)",
      "يمكن استئناف قرار إيقاف الحساب عبر التواصل مع الدعم"
    ]
  }
];

export default function TermsOfUseContent() {
  const [expanded, setExpanded] = useState<string>("introduction");
  const router = useRouter();

  const toggle = (id: string) => {
    setExpanded(prev => (prev === id ? "" : id));
  };

  const handleContactSupport = () => {
    router.push("/contact");
  };

  return (
    <div className="relative max-w-5xl mx-auto px-6 py-10 lg:py-20">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-gray-500 text-sm mb-12 bg-gray-900/50 w-fit px-4 py-2 rounded-full border border-gray-800 backdrop-blur-sm">
        <Link href="/" className="hover:text-primary flex items-center gap-2 transition-colors">
          <Home className="w-4 h-4" />
          <span>الرئيسية</span>
        </Link>
        <ChevronLeft className="w-4 h-4" />
        <Link href="/help-center" className="hover:text-primary transition-colors">
          مركز المساعدة
        </Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-300">شروط الاستخدام</span>
      </nav>

      {/* Header */}
      <div
        className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700"
      >
        <h1 className="text-4xl lg:text-6xl font-black mb-6 bg-linear-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          شروط الاستخدام
        </h1>
        <p className="text-gray-400 text-lg lg:text-xl">
          آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {termsData.map((section, index) => {
          const isOpen = expanded === section.id;

          return (
            <div
              key={section.id}
              className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-500"
            >
              {/* Header Button */}
              <button
                onClick={() => toggle(section.id)}
                className="w-full px-8 py-6 flex items-center justify-between text-right group cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {section.title}
                </h3>

                <div
                  className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                >
                  <ChevronDown />
                </div>
              </button>

              {/* Content */}
              {isOpen && (
                <div
                  className="overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300"
                >
                  <ul className="px-8 pb-8 space-y-4 text-gray-300">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-400 ml-3 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Section */}
      <div
        className="mt-24 text-center bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-12 border border-gray-700 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700"
      >
        <h2 className="text-3xl font-bold mb-4 text-white">
          هل لديك أسئلة؟
        </h2>
        <p className="text-gray-400 mb-8">
          إذا كان لديك أي استفسارات حول شروط الاستخدام، لا تتردد في التواصل معنا
        </p>

        <button
          onClick={handleContactSupport}
          className="bg-linear-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          تواصل مع الدعم
        </button>
      </div>
    </div>
  );
}