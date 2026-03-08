"use client";

import React from "react";
import { Search } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ 
  title,
  description,
  className = "",
  icon = <Search className="w-12 h-12 opacity-80" />
}: EmptyStateProps) {
  const { isRtl } = useTranslation();

  const defaultTitle = isRtl ? "عذراً، لم نجد أي نتائج" : "No results found, sorry";
  const defaultDescription = isRtl 
    ? "حاول تحسين خيارات البحث أو تغيير الكلمات المفتاحية للعثور على ما تبحث عنه." 
    : "Try refining your search filters or changing keywords to find what you're looking for.";

  return (
    <div className={`flex flex-col items-center justify-center py-24 text-gray-medium font-cairo bg-bg/50 rounded-[40px] border-2 border-dashed border-border/50 animate-in fade-in zoom-in duration-700 ${className}`}>
      <div className="w-28 h-28 mb-8 bg-card-bg border border-border rounded-full flex items-center justify-center shadow-xl text-primary transition-transform hover:scale-110 duration-500">
        <div className="p-4 bg-primary/5 rounded-full ring-8 ring-primary/5">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl md:text-3xl font-black text-heading mb-4 text-center">
        {title || defaultTitle}
      </h3>
      <p className="text-gray-medium font-bold max-w-sm text-center leading-relaxed text-base opacity-70">
        {description || defaultDescription}
      </p>
    </div>
  );
}
