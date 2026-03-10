"use client";
import { Button } from "@/container/reusable/form";
import { Send, Loader2 } from "lucide-react";
import { useCreateProject } from "@/hooks/project/useCreateProject";
import SkillsModal from "./SkillsModal";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import Spinner from "@/common/Spinner";

export default function CreateProjectForm() {
  const {
    step,
    nextStep,
    prevStep,
    form,
    availableSkills,
    selectedSkills,
    files,
    isSkillsLoading,
    isModalOpen,
    setIsModalOpen,
    isSubmitting,
    toggleSkill,
    handleFileChange,
    removeFile,
    handleSubmit,
  } = useCreateProject();

  const {
    register,
    formState: { errors },
    watch,
  } = form;

  if (isSkillsLoading) {
    return <Spinner fullPage />;
  }

  return (
    <div className="max-w-3xl min-h-[90vh]  mx-auto px-4 py-8" dir="rtl">
      {/* Header Section */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-3xl md:text-4xl font-black font-cairo text-dark mb-4 drop-shadow-sm">
          {step === 1 ? "تفاصيل المشروع" : "إعدادات المشروع"}
        </h1>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <div
            className={`h-2.5 w-16 rounded-full transition-all duration-500 ${step >= 1 ? "bg-primary " : "bg-gray-200"}`}
          />
          <div
            className={`h-2.5 w-16 rounded-full transition-all duration-500 ${step >= 2 ? "bg-primary " : "bg-gray-200"}`}
          />
        </div>
      </div>

      {/* Main Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[40px] shadow-[0_20px_70px_-10px_rgba(30,170,173,0.12)] border border-gray-100 p-8 md:p-12 space-y-8 relative"
      >
        {step === 1 && (
          <StepOne
            register={register}
            errors={errors}
            selectedSkills={selectedSkills}
            toggleSkill={toggleSkill}
            setIsModalOpen={setIsModalOpen}
          />
        )}

        {step === 2 && (
          <StepTwo
            register={register}
            errors={errors}
            files={files}
            handleFileChange={handleFileChange}
            removeFile={removeFile}
          />
        )}

        {/* Navigation Buttons */}
        <div className="pt-8 flex flex-col md:flex-row-reverse gap-4">
          {step === 1 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="w-full relative overflow-hidden group py-6 rounded-3xl"
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary via-teal-400 to-primary bg-size-[200%_auto] animate-[gradient_3s_linear_infinite] group-hover:bg-size-[100%_auto] transition-all" />
              <div className="relative flex items-center justify-center gap-3 font-black font-cairo text-xl text-white">
                التالي
              </div>
            </Button>
          ) : (
            <>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 relative overflow-hidden group py-6 rounded-3xl"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-r from-primary via-teal-400 to-primary bg-size-[200%_auto] transition-all group-hover:bg-size-[100%_auto] ${isSubmitting ? "" : "animate-[gradient_3s_linear_infinite]"}`}
                />
                <div className="relative flex items-center justify-center gap-3 font-black font-cairo text-xl text-white">
                  {isSubmitting ? "جاري الإرسال..." : "نشر المشروع"}
                  {!isSubmitting && (
                    <Send
                      size={20}
                      className="rotate-180 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  )}
                  {isSubmitting && (
                    <Loader2 size={24} className="animate-spin" />
                  )}
                </div>
              </Button>

              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-6 rounded-3xl cursor-pointer font-black font-cairo text-xl text-gray-400 hover:bg-gray-50 transition-all border-2 border-gray-200"
              >
                السابق
              </button>
            </>
          )}
        </div>
      </form>

      {/* Skills Selection Modal */}
      <SkillsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableSkills={availableSkills}
        selectedSkillIds={watch("skillIds") || []}
        onToggleSkill={toggleSkill}
        onConfirm={() => setIsModalOpen(false)}
      />
    </div>
  );
}
