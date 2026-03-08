"use client";

import React from "react";
import { RefreshCcw, AlertCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
  retryText?: string;
}

export default function ErrorState({
  message,
  onRetry,
  className = "",
  retryText,
}: ErrorStateProps) {
  const { isRtl } = useTranslation();

  const _message =
    message ||
    (isRtl
      ? "حدث خطأ ما أثناء تحميل البيانات"
      : "An error occurred while loading data");
  const _retryText = retryText || (isRtl ? "إعادة المحاولة" : "Try Again");

  return (
    <div
      className={`flex flex-col items-center justify-center p-12 bg-red-500/5 border border-red-500/10 rounded-[40px] text-center animate-in zoom-in duration-700 ${className}`}
    >
      <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mb-6 shadow-sm">
        <AlertCircle size={32} strokeWidth={2.5} />
      </div>

      <p className="text-xl font-black text-heading font-cairo mb-8 max-w-md">
        {_message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/30 px-8 py-3 rounded-2xl text-red-500 font-black font-cairo hover:bg-red-50 dark:hover:bg-red-950/20 transition-all shadow-sm hover:shadow-md cursor-pointer group active:scale-95"
        >
          <RefreshCcw
            size={18}
            className="group-hover:rotate-180 transition-transform duration-700"
          />
          <span>{_retryText}</span>
        </button>
      )}
    </div>
  );
}
