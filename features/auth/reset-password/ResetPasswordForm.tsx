"use client";
import { Controller } from "react-hook-form";
import shogol from "@/public/images/shogol.png";
import { PasswordInput, Button, OtpInput } from "@/container/reusable/form";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useResetPassword } from "@/hooks/auth/useResetPassword";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "البريد الإلكتروني غير معروف";

  const {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    timer,
    isResending,
    handleResend,
  } = useResetPassword(email);

  return (
    <section className="py-12 lg:py-16 bg-bg min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
  

        {/* Header */}
        <div className="text-center mb-8 space-y-2 animate-in fade-in slide-in-from-top-4 delay-300 duration-700 fill-mode-both">
          <h1 className="text-3xl font-extrabold text-dark tracking-tight">
            إعادة تعيين كلمة المرور
          </h1>

          <p className="text-primary font-bold" dir="ltr">
            {email}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 lg:p-10 border border-gray-100 relative overflow-hidden group hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-shadow duration-500">
          {/* Decorative background pulse */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700"></div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {/* Root Error Display */}
            {errors.root && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600 text-sm text-center font-medium">
                  {errors.root.message}
                </p>
              </div>
            )}
            {/* OTP Section */}
            <div className="space-y-4">
              <label className="block text-dark text-center text-base font-bold">
                رمز التحقق (6 أرقام) <span className="text-red-500">*</span>
              </label>
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <OtpInput
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.code}
                  />
                )}
              />
              {errors.code && (
                <p className="text-red-500 text-sm text-center font-medium animate-in fade-in duration-300">
                  {errors.code.message}
                </p>
              )}
              <p className="text-dark text-center text-xs font-medium">
                أدخل الرمز المكون من 6 أرقام المرسل إلى بريدك الإلكتروني
              </p>
            </div>

            {/* Password Inputs */}
            <div className="grid grid-cols-1  gap-6">
              <PasswordInput
                label="كلمة المرور الجديدة"
                placeholder="أدخل كلمة المرور الجديدة"
                registration={register("password")}
                error={errors.password?.message}
                required
              />
              <PasswordInput
                label="تأكيد كلمة المرور"
                placeholder="أعد إدخال كلمة المرور"
                registration={register("confirmPassword")}
                error={errors.confirmPassword?.message}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 active:scale-95"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>جاري التحديث...</span>
                </div>
              ) : (
                "إعادة تعيين كلمة المرور"
              )}
            </Button>

            <div className="text-center">
              <span className="text-gray-medium font-medium text-sm">
                لم تستلم الرمز؟{" "}
              </span>
              <button
                type="button"
                className="text-primary font-bold hover:text-dark cursor-pointer transition-colors text-sm underline underline-offset-4 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleResend}
                disabled={timer > 0 || isResending}
              >
                {isResending
                  ? "جاري الإرسال..."
                  : timer > 0
                    ? `إعادة الإرسال (${timer}s)`
                    : "إعادة الإرسال"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
