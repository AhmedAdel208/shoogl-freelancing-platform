"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Info, CheckCircle2, Loader2 } from "lucide-react";
import { useBio } from "@/hooks/onboarding/useBio";
import { BIO_TIPS } from "@/data/bioTips";

export default function BioPage() {
  const router = useRouter();
  const {
    bio,
    setBio,
    MAX_CHARS,
    isSubmitting,
    handleFinish,
    remainingChars,
    progressPercentage,
  } = useBio();

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className="min-h-screen bg-bg flex flex-col items-center py-12 px-4"
      dir="rtl"
    >
      <div className="text-center mb-8 space-y-3 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-black text-primary tracking-wide font-cairo">
          أخبرنا عنك أكثر
        </h1>
        <p className="text-gray-medium text-lg font-bold max-w-xl mx-auto font-cairo">
          اكتب نبذة تعريفية تجذب العملاء وتوضح خبراتك ومهاراتك بشكل احترافي
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-4xl bg-card-bg rounded-4xl shadow-xl overflow-hidden mb-8 border border-border p-8 animate-fadeIn delay-100 fill-mode-both">
        {/* Text Area Container */}
        <div className="mb-6">
          <div
            className={`relative rounded-2xl border-2 transition-all duration-300 p-4 min-h-[250px]
            ${bio.length > 0 ? "border-primary shadow-lg shadow-primary/10" : "border-border focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10"}
          `}
          >
            <textarea
              className="w-full h-full min-h-[220px] resize-none outline-none text-heading text-lg placeholder:text-gray-medium/30 leading-relaxed bg-transparent font-cairo font-bold"
              placeholder="مطور ويب محترف مع خبرة كبيرة في عديد من التقنيات مثل مكتبة رياكت..."
              value={bio}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHARS) {
                  setBio(e.target.value);
                }
              }}
              dir="rtl"
            />
          </div>

          {/* Counter & Progress */}
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm font-black font-cairo">
              <span
                className={`${remainingChars < 50 ? "text-rose-500" : "text-gray-medium/70"}`}
              >
                {remainingChars} حرف متبقي
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-bg rounded-full overflow-hidden relative">
              <div
                className={`h-full bg-primary transition-all duration-700 ease-out rounded-full ${bio.length > 0 ? "shadow-lg shadow-primary/50" : ""}`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-bg/40 rounded-3xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-4 text-heading">
            <Info size={20} className="text-primary" />
            <h3 className="font-black text-lg font-cairo">نصائح لكتابة نبذة مميزة:</h3>
          </div>

          <ul className="space-y-3 pr-2">
            {BIO_TIPS.map((tip, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-gray-medium font-bold font-cairo animate-fadeIn fill-mode-both"
                style={{ animationDelay: `${300 + idx * 100}ms` }}
              >
                <CheckCircle2 size={16} className="text-primary shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-4 mt-4 animate-fadeIn delay-200 fill-mode-both">
        <button
          onClick={handleBack}
          disabled={isSubmitting}
          className="px-8 py-3 bg-card-bg text-gray-medium rounded-2xl font-black text-lg border-2 border-border
            hover:border-primary/30 hover:text-primary active:scale-[0.98] 
            transition-all duration-200 flex items-center gap-2 font-cairo"
        >
          <ChevronLeft size={20} />
          رجوع
        </button>

        <button
          onClick={handleFinish}
          disabled={isSubmitting || bio.length < 10}
          className="flex-1 max-w-xs py-3 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/25 
            hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] 
            transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 font-cairo"
        >
          {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
          {isSubmitting ? "جاري الحفظ..." : "إنهاء التسجيل"}
        </button>
      </div>
    </div>
  );
}
