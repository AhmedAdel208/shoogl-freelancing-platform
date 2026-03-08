"use client";

import { User, Plus } from "lucide-react";
import Link from "next/link";
import { getUserName } from "@/utils/user";
import { UserProfile } from "@/types/user";
import { useTranslation } from "@/hooks/useTranslation";

interface UserProfileHeaderProps {
  userProfile?: UserProfile;
}

export default function UserProfileHeader({ userProfile }: UserProfileHeaderProps) {
  const { isRtl, t } = useTranslation();

  return (
    <header className="relative bg-linear-to-r from-primary/80 to-primary overflow-hidden transition-colors duration-500">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className={`absolute -top-24 ${isRtl ? '-right-24' : '-left-24'} w-96 h-96 bg-white rounded-full blur-[100px] animate-pulse`} />
        <div className={`absolute -bottom-24 ${isRtl ? '-left-24' : '-right-24'} w-80 h-80 bg-teal-200 rounded-full blur-[80px]`} />
      </div>

      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div className={`flex flex-col md:flex-row items-center justify-between gap-8 ${isRtl ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        
          <div className={`flex items-center gap-6 ${isRtl ? 'flex-row text-right' : 'flex-row-reverse text-left'}`}>
            <div className="relative group">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-2xl rounded-full flex items-center justify-center overflow-hidden border border-white/30 shadow-xl transition-transform duration-500 group-hover:scale-105">
                {userProfile?.profilePictureUrl ? (
                  <img
                    src={userProfile.profilePictureUrl}
                    alt="Profile image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-white/50" />
                )}
              </div>
            </div>
            
            <div className={`flex flex-col ${isRtl ? 'items-start' : 'items-end'}`}>
              <h1 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight font-cairo">
                {getUserName(userProfile)}
              </h1>
              <div className="flex items-center justify-start gap-2">
                <span className="text-white font-black bg-white/10 px-4 py-1 mt-2 rounded-2xl text-[10px] uppercase tracking-widest border border-white/10 backdrop-blur-sm font-cairo">
                  {userProfile?.isClient 
                    ? (isRtl ? "صاحب مشاريع" : "Client") 
                    : userProfile?.isFreelancer 
                      ? (isRtl ? "مستقل" : "Freelancer") 
                      : (isRtl ? "مستخدم" : "User")}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {userProfile?.isClient && (
            <Link 
              href="/projects/create" 
              className="group flex items-center gap-4 bg-white text-primary px-10 py-3.5 rounded-full font-black shadow-2xl hover:bg-white/95 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10"
            >
              <div className="bg-primary/10 p-2 rounded-xl transition-transform duration-500 group-hover:rotate-90">
                <Plus className="w-5 h-5 transition-transform" />
              </div>
              <span className="text-base font-cairo">
                {isRtl ? "إضافة طلب جديد" : "Add New Request"}
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
