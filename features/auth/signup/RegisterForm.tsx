import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import SucessRegister from "./SucessRegister";
import { useRegistration } from "@/hooks/auth/useRegistration";
import type { RegisterFormProps } from "@/types/registerForm";
import Link from "next/link";

export default function RegisterForm({
  initialAccountType,
}: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    selectedImage,
    setSelectedImage,
    showSuccess,
    setShowSuccess,
    submittedData,
    step,
    nextStep,
    prevStep,
    watch,
  } = useRegistration({ initialAccountType });

  return (
    <section className="py-12 lg:py-20 bg-bg min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-10 px-8">
          <div className="flex items-center justify-between mb-4">
            <span className={`text-sm font-black transition-colors duration-300 font-cairo ${step >= 1 ? "text-primary" : "text-gray-medium"}`}>
              المعلومات الأساسية
            </span>
            <span className={`text-sm font-black transition-colors duration-300 font-cairo ${step >= 2 ? "text-primary" : "text-gray-medium"}`}>
              التفاصيل الإضافية
            </span>
          </div>
          <div className="h-2.5 bg-gray-light rounded-full overflow-hidden border border-border/10">
            <div 
              className="h-full bg-linear-to-r from-primary to-teal-500 transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(30,170,173,0.3)]"
              style={{ width: step === 1 ? "50%" : "100%" }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12 relative overflow-hidden">
          {/* subtle loading overlay */}
          {isSubmitting && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-50 flex items-center justify-center animate-in fade-in duration-300">
               <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <StepOne 
                register={register}
                errors={errors}
                setSelectedImage={setSelectedImage}
                nextStep={nextStep}
                watch={watch}
              />
            )}

            {step === 2 && (
              <StepTwo 
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
                prevStep={prevStep}
                watch={watch}
              />
            )}
          </form>

          {/* Login Link */}
          {!isSubmitting && (
            <div className="text-center mt-6">
              <span className="text-gray-medium">لديك حساب بالفعل؟ </span>
              <Link
                href="/login"
                className="text-primary font-semibold hover:text-dark transition-colors"
              >
                تسجيل الدخول
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <SucessRegister
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        userData={submittedData}
        userImage={selectedImage}
      />
    </section>
  );
}
