"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ChevronDown, Shield, Lock, Eye, Users, DollarSign, CheckCircle, Mail, Home, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface GuaranteeSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string[];
}

const guaranteeData: GuaranteeSection[] = [
  {
    id: "data-collection",
    title: "البيانات التي نجمعها",
    icon: Users,
    content: [
      "المعلومات الشخصية الأساسية: الاسم، البريد الإلكتروني، رقم الهاتف",
      "معلومات الملف الشخصي: الصورة الشخصية، السيرة الذاتية، المهارات",
      "معلومات الموقع: الدولة، المدينة، المنطقة الزمنية",
      "معلومات الدفع: تفاصيل الحساب البنكي (مشفرة وآمنة)",
      "بيانات النشاط: سجل المشاريع، التقييمات، التواصل مع المستخدمين"
    ]
  },
  {
    id: "data-usage",
    title: "كيف نستخدم بياناتك",
    icon: Eye,
    content: [
      "تحسين تجربة المستخدم وتخصيص الخدمات",
      "ربط أصحاب المشاريع بالمستقلين المناسبين",
      "معالجة المدفوعات والمعاملات المالية",
      "إرسال إشعارات وتحديثات هامة",
      "حماية المنصة من الأنشطة الاحتيالية"
    ]
  },
  {
    id: "cookies",
    title: "ملفات تعريف الارتباط",
    icon: Lock,
    content: [
      "ملفات تعريف الارتباط الضرورية لتشغيل الموقع",
      "ملفات تعريف الارتباط للأداء والتحليلات",
      "ملفات تعريف الارتباط للتخصيص والإعلانات",
      "يمكنك التحكم في ملفات تعريف الارتباط من إعدادات المتصفح",
      "نحترم خصوصيتك ونعطيك خيار التحكم في البيانات"
    ]
  },
  {
    id: "data-sharing",
    title: "مشاركة البيانات",
    icon: Shield,
    content: [
      "لا نبيع بياناتك لأطراف ثالثة",
      "نشارك البيانات فقط عند الضرورة القانونية",
      "نشارك المعلومات مع أصحاب المشاريع عند التعاقد",
      "نستخدم شركاء موثوقين لمعالجة المدفوعات",
      "جميع عمليات المشاركة مشفرة وآمنة"
    ]
  },
  {
    id: "data-security",
    title: "أمان البيانات",
    icon: Lock,
    content: [
      "تشفير SSL لجميع الاتصالات والبيانات",
      "جدران حماية متقدمة للحماية من الاختراقات",
      "نسخ احتياطية منتظمة للبيانات",
      "فريق أمان متخصص لمراقبة التهديدات",
      "تحديثات أمنية دورية للنظام"
    ]
  },
  {
    id: "user-rights",
    title: "حقوقك",
    icon: CheckCircle,
    content: [
      "الحق في الوصول إلى بياناتك وتصحيحها",
      "الحق في حذف حسابك وبياناتك",
      "الحق في معرفة كيفية استخدام بياناتك",
      "الحق في سحب الموافقة على جمع البيانات",
      "الحق في تقديم شكوى لجهات حماية البيانات"
    ]
  }
];

const financialProtectionSteps = [
  {
    step: 1,
    title: "حجز المبلغ",
    description: "يتم حجز مبلغ المشروع في حساب آمن عند بدء التعاقد"
  },
  {
    step: 2,
    title: "تنفيذ العمل",
    description: "يقوم المستقل بتنفيذ العمل المتفق عليه مع مراجعة العميل"
  },
  {
    step: 3,
    title: "تحرير المبلغ",
    description: "يتم تحرير المبلغ للمستقل بعد موافقة العميل واستلام العمل"
  }
];

export default function GuaranteeYourRightsContent() {
  const [expanded, setExpanded] = useState<string>("data-collection");
  const router = useRouter();

  const toggle = (id: string) => {
    setExpanded(prev => (prev === id ? "" : id));
  };

  const handleContactUs = () => {
    router.push("/contact");
  };

  return (
    <div className="relative h-full max-w-8xl mx-auto px-6 py-10 lg:py-20">
      
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
        <span className="text-gray-300">ضمان حقوقك</span>
      </nav>
      
      {/* Header */}
      <div
        className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700"
      >
        <h1 className="text-4xl lg:text-6xl font-black mb-6 bg-linear-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          ضمان حقوقك 100%
        </h1>
        <p className="text-gray-400 text-lg lg:text-xl max-w-3xl mx-auto">
          نحن في منصة شغل نضع أمانك وحقوقك على رأس أولوياتنا. إليك كيف نضمن لك تجربة عمل احترافية وآمنة تماماً.
        </p>
      </div>

      {/* Privacy Sections */}
      <div className="space-y-6 mb-16">
        {guaranteeData.map((section, index) => {
          const isOpen = expanded === section.id;
          const Icon = section.icon;

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
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Icon className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                    {section.title}
                  </h3>
                </div>

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
                        <span className="text-green-400 ml-3 mt-1">•</span>
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

      {/* Financial Protection Section */}
      <div
        className="mb-16 bg-linear-to-br from-green-900/20 to-emerald-900/20 rounded-3xl p-12 border border-green-700/30 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white flex items-center justify-center gap-3">
            <DollarSign className="w-8 h-8 text-green-400" />
            كيف نحمي حقوقك المالية؟
          </h2>
          <p className="text-gray-400">
            نظام حماية متكامل يضمن حقوق الطرفين في كل معاملة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {financialProtectionSteps.map((step, index) => (
            <div
              key={step.step}
              className="text-center animate-in fade-in zoom-in-95 duration-500"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div
        className="text-center bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-12 border border-gray-700 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700"
      >
        <h2 className="text-3xl font-bold mb-4 text-white">
          لديك استفسار عن الخصوصية؟
        </h2>
        <div className="flex items-center justify-center gap-2 mb-8">
          <Mail className="w-5 h-5 text-green-400" />
          <p className="text-gray-400">
            privacy@shogol.com
          </p>
        </div>

        <button
          onClick={handleContactUs}
          className="bg-linear-to-r cursor-pointer from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-10 py-4 rounded-xl font-semibold shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          تواصل معنا
        </button>
      </div>
    </div>
  );
}
