"use client";

import shogol from "@/public/images/shogol.png"
import { Mail, ArrowRight } from "lucide-react";
import { FormInput, Button } from "@/container/reusable/form";
import Link from "next/link";
import Image from "next/image";
import { useForgetPassword } from "@/hooks/auth/useForgetPassword";

export default function ForgotPasswordForm() {

  const {handleSubmit, isSubmitting, register, errors} = useForgetPassword()

  return (
    <section className="py-12 lg:py-16 bg-bg min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
     

        {/* Header */}
        <div className="text-center mb-8 space-y-2 animate-in fade-in slide-in-from-top-4 delay-300 duration-700 fill-mode-both">
          <h1 className="text-3xl font-extrabold text-dark tracking-tight">
             نسيت كلمة المرور؟
          </h1>
         
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 lg:p-10 border border-gray-100 relative overflow-hidden group hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-shadow duration-500">
          {/* Decorative background pulse */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <FormInput
              label="البريد الإلكتروني"
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              icon={<Mail className="w-5 h-5 text-primary/70" />}
              registration={register("email")}
              error={errors.email?.message}
              required
            />

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>جاري الإرسال...</span>
                </div>
              ) : (
                "إرسال رابط إعادة التعيين"
              )}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-primary font-bold hover:text-dark transition-all duration-300 flex items-center justify-center gap-2 group/link"
              >
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:-translate-x-1" />
                <span>العودة لتسجيل الدخول</span>
              
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
