
"use client";
import { useEffect } from "react";
import { useProfile } from "@/hooks/profile/useProfile";
import { useRouter } from "next/navigation";
import Loading from "@/common/Loading";
import Gradientline from "@/components/ui/header/Gradientline";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Footer from "@/components/landing/footer/Footer";
import { useAuth } from "@/hooks/auth/useAuth";
import ProfileIdentityCard from "@/features/profile/ProfileIdentityCard";
import ProfileCoverSection from "@/features/profile/ProfileCoverSection";
import ProfileSkillsSection from "@/features/profile/ProfileSkillsSection";
import ProfileBioSection from "@/features/profile/ProfileBioSection";
import ProfilePortfolioSection from "@/features/profile/ProfilePortfolioSection";
import ProfileLanguagesSection from "@/features/profile/ProfileLanguagesSection";
import ProfileCertificatesSection from "@/features/profile/ProfileCertificatesSection";

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { data: safeProfile, isLoading } = useProfile();
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.isClient) {
      router.push("/profile/edit");
    }
  }, [user, router]);

  if (isLoading) return <Loading />;
  if (!safeProfile) return null;


  return (
    <div className="bg-bg min-h-screen w-full font-cairo flex flex-col" dir="rtl">
      <Gradientline />
      <LinksHeader />

      <main className="container mx-auto px-4 py-12 max-w-4xl space-y-8 flex-1">
        
        {/* Profile Identity Card Component */}
        <ProfileIdentityCard profile={safeProfile} />

        {user?.isFreelancer && (
          <>
            {/* Cover Image Section Component */}
            <ProfileCoverSection profileId={safeProfile.id} />

            {/* Skills Section */}
            <ProfileSkillsSection />

            {/* Languages Section */}
            <ProfileLanguagesSection 
              languages={safeProfile.languages || (safeProfile as any).userLanguages || (safeProfile as any).UserLanguages || (safeProfile as any).Languages || []} 
            />

            {/* Certificates Section */}
            <ProfileCertificatesSection 
              certificates={safeProfile.certificates || (safeProfile as any).userCertificates || (safeProfile as any).UserCertificates || (safeProfile as any).Certificates || []} 
            />

            {/* Portfolio Section */}
            <ProfilePortfolioSection />
          </>
        )}

        {/* Bio Section - shown for both */}
        <ProfileBioSection bio={safeProfile.bio || ""} />

      </main>

      <Footer />
    </div>
  );
}
