"use client";

import { useState } from "react";
import Link from "next/link";
import { accountTypes } from "@/data/accountTypes";
import type { AccountTypeProps } from "@/types/accountType";
import CheckIcon from "@/public/icons/CheckIcon";

export default function AccountType({ onSelectType }: AccountTypeProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelectType = (typeId: string) => {
    setSelectedType(typeId);
    onSelectType(typeId);
  };
  return (
    <section className="pt-20 lg:py-28  min-h-[90vh] bg-bg grow flex flex-col">
      <div className="max-w-8xl mx-auto grow flex flex-col">
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-primary via-dark dark:via-heading to-primary bg-clip-text text-transparent mb-4 relative z-10">
              إنشاء حساب
            </h2>
            {/* Gradient glow effect */}
            <div className="absolute inset-0 bg-linear-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl -z-10 scale-110" />
          </div>

          <p className="text-gray-medium font-el-missiri text-xl max-w-2xl mx-auto leading-relaxed">
            حدد نوع الحساب، يمكن تغييره لاحقاً
          </p>

          {/* Decorative elements */}
          <div className="flex justify-center mt-8 space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-100" />
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {accountTypes.map((type, index) => (
            <button
              key={type.id}
              onClick={() => handleSelectType(type.id)}
              className={`group relative cursor-pointer bg-white rounded-3xl p-10 text-center border-2 transition-all duration-500 hover:shadow-2xl hover:scale-105 transform ${
                selectedType === type.id
                  ? "border-primary shadow-xl scale-105"
                  : "border-border hover:border-primary/50"
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: "slideInUp 0.6s ease-out forwards",
              }}
            >
              {/* Selection Indicator */}
              {selectedType === type.id && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <CheckIcon className="w-5 h-5 text-white" />
                </div>
              )}

              {/* Icon Container */}
              <div
                className={`w-24 h-24 ${type.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
              >
                <type.icon
                  className={`w-12 h-12 ${type.iconColor}`}
                  strokeWidth={2}
                />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-dark group-hover:text-primary transition-colors duration-300">
                  {type.title}
                </h3>

                <p className="text-gray-medium text-lg leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                  {type.description}
                </p>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Shimmer Effect */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </button>
          ))}
        </div>

        {/* Footer Link - Centered below the cards */}
        <div className="text-center mt-8 pb-10">
          <span className="text-gray-medium text-lg font-cairo">لديك حساب بالفعل؟ </span>
          <Link
            href="/login"
            className="text-primary font-black font-cairo hover:text-dark transition-colors duration-200"
          >
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </section>
  );
}
