import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/lib/api/auth";
import { UseRegistrationProps } from "@/types/registerForm";
import { toast } from "@/common/toast";
import {
  registerSchema,
  type RegisterFormData,
} from "@/lib/validation/registerSchema";

export function useRegistration({ initialAccountType }: UseRegistrationProps = {}) {
  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<RegisterFormData | undefined>(undefined);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      userRole: (initialAccountType as "freelancer" | "client") || "freelancer",
      accountType: "individual",
    },
  });

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setError,
    formState: { errors },
  } = form;

  // Registration Mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormData) => authService.register(data, selectedImage),
    onSuccess: (response, variables) => {
      // Check for logical failure even on 200 OK
      if (response && (response.isSuccess === false || response.success === false)) {
        toast.error(response.message || "فشل التسجيل. يرجى مراجعة البيانات", "خطأ في التسجيل");
        setError("root", {
          message: response.message || "فشل التسجيل",
        });
        return;
      }

      toast.success("تم إنشاء حسابك بنجاح! مرحباً بك في شغل.", "شكراً لانضمامك");
      setSubmittedData(variables);
      setShowSuccess(true);
    },
    onError: (error: any, variables) => {
      // Handle cases where backend sends a "success" message with an error status code
      if (error.message && (
        error.message.toLowerCase().includes("success") || 
        error.message.toLowerCase().includes("تم التسجيل")
      )) {
        setSubmittedData(variables);
        setShowSuccess(true);
        return;
      }

      setError("root", {
        message: error.message || "فشل التسجيل",
      });
    }
  });

  const nextStep = async () => {
    if (step === 1) {
      const isValid = await trigger(["firstName", "lastName", "email", "phone", "password"]);
      if (isValid) setStep(2);
    }
  };

  const prevStep = () => setStep(1);

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return {
    form,
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    errors,
    isSubmitting: registerMutation.isPending,
    selectedImage,
    setSelectedImage,
    showSuccess,
    setShowSuccess,
    submittedData,
    step,
    nextStep,
    prevStep,
  };
}
