"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Gradientline from "@/components/ui/header/Gradientline";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Footer from "@/components/landing/footer/Footer";
import { useProfile, useUpdateProfile, useCoverImage } from "@/hooks/profile/useProfile";
import { useAuth } from "@/hooks/auth/useAuth";
import Loading from "@/common/Loading";
import { profileUpdateSchema, type ProfileUpdateFormData } from "@/lib/validation/profileUpdateSchema";

// Sub-components
import EditCoverSection from "@/features/profile/edit/EditCoverSection";
import EditProfileImageSection from "@/features/profile/edit/EditProfileImageSection";
import EditProfileFormFields from "@/features/profile/edit/EditProfileFormFields";

export default function EditProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { data: coverImageData } = useCoverImage(profile?.id);
  
  const coverImageUrl = coverImageData?.imageUrl || null;

  const { mutate: updateProfile, isPending: isSubmitting } = useUpdateProfile(() => {
    router.back();
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset
  } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      gender: "Male",
      nationality: "مصر",
      companyName: ""
    }
  });

  useEffect(() => {
    if (profile && !isDirty) {
      reset({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        bio: profile.bio || "",
        gender: profile.gender || "Male",
        nationality: profile.nationality || "مصر",
        companyName: profile.companyName || ""
      });
    }
  }, [profile, reset, isDirty]);

  if (isProfileLoading) return <Loading />;

  const onSubmit = (data: ProfileUpdateFormData) => {
    updateProfile(data);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen w-full font-cairo" dir="rtl">
      <Gradientline />
      <LinksHeader />

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 relative">
          
          <div className="text-center mb-10">
             <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">تعديل الملف الشخصي</h1>
             <div className="h-1.5 w-16 bg-primary rounded-full mx-auto opacity-80" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            
            {/* Cover Image Section - Only for Freelancers */}
            {user?.isFreelancer && (
              <>
                <EditCoverSection coverImageUrl={coverImageUrl} />
                <hr className="border-slate-100" />
              </>
            )}

            {/* Profile Image Section */}
            <EditProfileImageSection profilePictureUrl={profile?.profilePictureUrl || null} />

            {/* Form Fields */}
            <EditProfileFormFields register={register} errors={errors} />

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-4 pt-6 mt-4 border-t border-slate-50">
              <button
                 type="submit"
                 disabled={isSubmitting}
                 className="flex-1 flex items-center justify-center gap-2 px-6 py-4.5 bg-primary text-white rounded-2xl font-black text-base hover:-translate-y-1 active:scale-[0.98] disabled:opacity-70 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 group"
               >
                 {isSubmitting ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      <Save size={18} className="group-hover:scale-110 transition-transform" />
                      حفظ التغييرات
                    </>
                 )}
               </button>
               <button
                 onClick={() =>  router.back()}
                 className="flex-1 flex items-center justify-center gap-2 px-6 py-4.5 bg-white border-2 border-primary text-primary rounded-2xl font-black text-base hover:bg-primary/5 transition-all active:scale-[0.98]"
               >
                 <X size={18} />
                 إلغاء
               </button>
            </div>

          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}
