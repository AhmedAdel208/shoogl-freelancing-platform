"use client";

import { CheckCircle2, Search, Send, Rocket, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ProcessSection() {
  const { isRtl } = useTranslation();

  const stepsAr = [
    {
      icon: <Send className="w-8 h-8" />,
      title: "اطرح مشروعك",
      desc: "صف احتياجاتك بدقة وسرعة في أقل من دقيقة لنصلك بأفضل المبدعين في وقت قياسي.",
      color: "bg-blue-500",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "تلقَ العروض",
      desc: "استعرض عروض الأسعار من نخبة المستقلين، وقارن بين السير الذاتية والأعمال السابقة.",
      color: "bg-primary",
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "اختر الأنسب",
      desc: "بكل ثقة وراحة بال، اختر المستقل الذي يناسب ميزانيتك وتطلعاتك لبدء العمل فوراً.",
      color: "bg-teal-500",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "استلم مشروعك",
      desc: "تواصل مع المستقل مباشرة، وتابع سير العمل حتى تستلم مشروعك بجودة تفوق التوقعات.",
      color: "bg-indigo-500",
    },
  ];

  const stepsEn = [
    {
      icon: <Send className="w-8 h-8" />,
      title: "Post Your Project",
      desc: "Describe your needs accurately and quickly in less than a minute to reach the best creators in record time.",
      color: "bg-blue-500",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Receive Quotes",
      desc: "Review price quotes from elite freelancers, and compare resumes and previous work samples.",
      color: "bg-primary",
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "Choose the Best",
      desc: "With confidence and peace of mind, choose the freelancer that fits your budget and aspirations to start work immediately.",
      color: "bg-teal-500",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Receive Your Project",
      desc: "Communicate directly with the freelancer, track progress until you receive your project with quality exceeding expectations.",
      color: "bg-indigo-500",
    },
  ];

  const steps = isRtl ? stepsAr : stepsEn;

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-bg relative overflow-hidden select-none">
      {/* Background Decor */}
      <div className={`absolute top-0 ${isRtl ? 'right-1/4' : 'left-1/4'} w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10`} />

      <div className="max-w-8xl mx-auto px-6 md:px-12 text-center">
        {/* Section Header */}
        <div className="space-y-6 mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-card-bg border border-border rounded-full text-gray-medium shadow-sm">
            <Sparkles size={16} className="text-primary sm:w-[18px] sm:h-[18px]" />
            <span className="text-xs sm:text-sm font-black font-cairo uppercase tracking-wider">
              {isRtl ? "سهولة، سرعة، وكفاءة غير مسبوقة" : "Ease, Speed, and Unprecedented Efficiency"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[62px] font-black text-heading font-cairo leading-[1.2] tracking-tight max-w-4xl mx-auto">
            {isRtl ? (
              <>رحلة النجاح مع شُغل تبدأ <span className="text-primary italic">بأربع خطوات</span></>
            ) : (
              <>Success Journey with SHOGOL Starts <span className="text-primary italic">in 4 Steps</span></>
            )}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 relative">
          {/* Static Connecting Path (Desktop) */}
          <div
            className={`hidden lg:block absolute top-[60px] ${isRtl ? 'right-[10%] left-[10%]' : 'left-[10%] right-[10%]'} h-[2px] bg-linear-to-r from-transparent via-border to-transparent -z-10`}
          />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative flex flex-col items-center group ${isRtl ? 'text-right' : 'text-left'}`}
            >
              {/* Step Number Dot */}
              <div className={`absolute -top-3 sm:-top-4 ${isRtl ? '-right-1 sm:-right-2' : '-left-1 sm:-left-2'} w-8 h-8 sm:w-10 sm:h-10 bg-card-bg border border-border rounded-full flex items-center justify-center font-black text-gray-medium/30 text-[10px] sm:text-xs shadow-md group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 z-10`}>
                0{i + 1}
              </div>

              {/* Icon Container */}
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 ${step.color} rounded-[28px] sm:rounded-[38px] flex items-center justify-center text-white shadow-2xl shadow-primary/20 mb-8 sm:mb-10 md:mb-12 transition-all duration-500 ring-4 sm:ring-8 ring-card-bg/50 border border-white/20`}
              >
                <div className="transform transition-transform duration-500 group-hover:scale-110 scale-75 sm:scale-90 md:scale-100">
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2 sm:space-y-4 text-center">
                <h3 className="text-xl sm:text-2xl font-black text-heading font-cairo group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base font-bold font-cairo text-gray-medium leading-relaxed max-w-[260px] mx-auto opacity-70 group-hover:opacity-100 transition-opacity">
                  {step.desc}
                </p>
              </div>

              {/* Hover Glow Background */}
              <div className="absolute inset-x-0 -bottom-10 h-full bg-linear-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 -z-10 rounded-[60px] blur-3xl transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
