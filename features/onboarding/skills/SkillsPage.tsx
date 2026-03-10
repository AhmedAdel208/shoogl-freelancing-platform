"use client";

import { ChevronDown, Check, Loader2, Search, X } from "lucide-react";
import { useSkills } from "@/hooks/onboarding/useSkills";
import { SkillCategory, Skill } from "@/types/skills";

export default function SkillsPage() {
  const {
    categories,
    selectedSkillIds,
    expandedCategoryId,
    searchQuery,
    setSearchQuery,
    isLoading,
    isSubmitting,
    toggleSkill,
    toggleCategory,
    handleNext,
    error,
  } = useSkills();

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg gap-4">
        <div className="bg-rose-50/10 p-8 rounded-3xl border border-rose-500/20 flex flex-col items-center gap-5 max-w-md text-center shadow-2xl shadow-rose-500/5">
          <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center">
             <X className="text-rose-500 w-8 h-8" />
          </div>
          <p className="text-heading text-lg font-black font-cairo" dir="rtl">
            عذراً، حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-rose-500 text-white rounded-2xl font-black font-cairo hover:bg-rose-600 transition-all active:scale-95 shadow-lg shadow-rose-500/20"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <Loader2 className="w-10 h-10 text-primary animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p
          className="text-gray-medium font-black text-xl animate-pulse font-cairo"
          dir="rtl"
        >
          جاري تحميل المهارات...
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-bg flex flex-col items-center py-16 px-4 font-sans"
      dir="rtl"
    >
      {/* Header Section */}
      <div className="text-center mb-8 space-y-3">
        <h1 className="text-4xl md:text-5xl font-black text-primary tracking-wide font-cairo">
          اختر مهاراتك
        </h1>
        <p className="text-gray-medium text-lg font-bold max-w-xl mx-auto font-cairo">
          حدد المهارات التي تتقنها لمساعدة العملاء في العثور عليك بسهولة بناءً
          على تخصصك
        </p>
      </div>

      {/* Search Bar Section */}
      <div className="w-full max-w-2xl mb-12 relative group">
        <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-medium/60 group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          placeholder="ابحث عن مهارة أو فئة بمهولة..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-4 pr-14 pl-12 bg-card-bg rounded-2xl shadow-sm border-2 border-transparent focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-heading font-black text-lg placeholder:text-gray-medium/40 font-cairo"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 left-0 pl-4 flex items-center hover:text-red-500 text-gray-medium/60 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Main Card */}
      <div className="w-full max-w-4xl bg-card-bg rounded-4xl shadow-xl overflow-hidden mb-12 border border-border">
        {/* Card Header (Stats) */}
        <div className="bg-bg/40 px-8 py-6 flex justify-between items-center border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center min-w-[32px] h-8 px-2 rounded-full bg-primary text-white text-sm font-black shadow-lg shadow-primary/20">
              {selectedSkillIds.length}
            </div>
            <span className="text-gray-medium text-sm font-black font-cairo">
              مهارة مختارة
            </span>
          </div>

          <span className="text-heading font-black text-lg font-cairo">
            {searchQuery ? "نتائج البحث" : "فئات المهارات المتاحة"}
          </span>
        </div>

        {/* Categories List Container */}
        <div className="p-8 space-y-4">
          {categories.length > 0 ? (
            categories.map((category: SkillCategory) => {
              // Automatically expand categories if searching
              const isExpanded = searchQuery
                ? true
                : expandedCategoryId === category.id;
              const selectedInCategory = category.skills.filter((s: Skill) =>
                selectedSkillIds.includes(s.id),
              ).length;

              return (
                <div
                  key={category.id}
                  className={`
                    border-2 rounded-2xl overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-2
                    ${isExpanded ? "border-primary/30 shadow-lg shadow-primary/5" : "border-bg hover:border-border hover:bg-bg/50"}
                  `}
                >
                  {/* Category Header */}
                  <div
                    onClick={() => toggleCategory(category.id)}
                    className={`
                      group flex justify-between items-center p-6 cursor-pointer transition-all duration-300
                      ${isExpanded ? "bg-primary/5" : "bg-card-bg"}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xl font-black font-cairo transition-colors select-none ${isExpanded ? "text-primary" : "text-heading"}`}
                      >
                        {category.nameAr}
                      </span>

                      {selectedInCategory > 0 && (
                        <div className="bg-primary text-white text-xs px-3 py-1 rounded-full font-black shadow-sm">
                          {selectedInCategory}
                        </div>
                      )}

                      {!searchQuery && (
                        <ChevronDown
                          size={20}
                          className={`text-gray-medium/60 transition-transform duration-500 ${isExpanded ? "rotate-180 text-primary" : "group-hover:text-heading"}`}
                        />
                      )}
                    </div>

                    <span
                      className={`text-sm font-black italic tracking-wide transition-colors select-none font-cairo ${isExpanded ? "text-primary/70" : "text-gray-medium/30"}`}
                      dir="ltr"
                    >
                      {category.nameEn}
                    </span>
                  </div>

                  {/* Skills Grid (Visible when expanded) */}
                  {isExpanded && (
                    <div className="p-6 bg-card-bg border-t border-border animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.skills.map((skill: Skill) => {
                          const isSkillSelected = selectedSkillIds.includes(
                            skill.id,
                          );
                          return (
                            <div
                              key={skill.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSkill(skill.id);
                              }}
                              className={`
                                group/skill flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border-2
                                ${
                                  isSkillSelected
                                    ? "bg-primary/5 border-primary shadow-sm"
                                    : "bg-bg/30 border-transparent hover:border-border hover:bg-bg/50"
                                }
                              `}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`
                                  w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300
                                  ${
                                    isSkillSelected
                                      ? "bg-primary border-primary rotate-360"
                                      : "bg-bg border-border group-hover/skill:border-primary/40"
                                  }
                                `}
                                >
                                  <Check
                                    size={14}
                                    className={`text-white transition-opacity ${isSkillSelected ? "opacity-100" : "opacity-0"}`}
                                    strokeWidth={4}
                                  />
                                </div>
                                <span
                                  className={`text-[15px] font-black font-cairo transition-colors ${isSkillSelected ? "text-heading" : "text-gray-medium"}`}
                                >
                                  {skill.nameAr}
                                </span>
                              </div>

                              <span
                                className={`text-[10px] font-black italic font-cairo transition-colors ${isSkillSelected ? "text-primary" : "text-gray-medium/40"}`}
                                dir="ltr"
                              >
                                {skill.nameEn}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                <Search size={40} className="text-gray-200" />
              </div>
              <p className="text-gray-500 font-bold text-xl">
                لا توجد مهارات تطابق بحثك
              </p>
              <p className="text-gray-400 font-medium">
                حاول البحث بكلمات أخرى أو تصفح الفئات
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-6 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                مسح البحث
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Button & Helper Text */}
      <div className="w-full max-w-sm mx-auto space-y-6">
        <button
          onClick={handleNext}
          disabled={isSubmitting || selectedSkillIds.length === 0}
          className="relative w-full py-5 bg-primary text-white rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 
            hover:shadow-primary/50 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] 
            transition-all duration-300 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 font-cairo"
        >
          {isSubmitting && <Loader2 className="w-7 h-7 animate-spin" />}
          <span>
            {isSubmitting ? "جاري الحفظ..." : "التالي: إضافة السيرة الذاتية"}
          </span>
        </button>
      </div>
    </div>
  );
}
