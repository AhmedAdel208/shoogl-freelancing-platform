
import Image from "next/image";
import Link from "next/link";
import { Camera, Eye, Settings, User as UserIcon, Mail } from "lucide-react";

interface ProfileIdentityCardProps {
  profile: {
    id: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    email: string;
    profilePictureUrl?: string;
    isFreelancer?: boolean;
  };
}

export default function ProfileIdentityCard({ profile }: ProfileIdentityCardProps) {
  const displayName = profile.firstName && profile.lastName 
    ? `${profile.firstName} ${profile.lastName}`
    : profile.fullName || "مستخدم";

  return (
    <section className="bg-card-bg rounded-[32px] p-8 shadow-sm border border-border relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-primary/5 to-primary/20 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none opacity-50" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
        <div className="flex items-center gap-6">
          <Link href="/profile/edit" className="relative w-24 h-24 rounded-full bg-bg border-4 border-card-bg shadow-xl shadow-black/5 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500">
            {profile.profilePictureUrl ? (
              <Image src={profile.profilePictureUrl} alt={displayName} fill className="object-cover" />
            ) : (
              <UserIcon size={40} className="text-gray-medium opacity-40" />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera size={24} className="text-white" />
            </div>
          </Link>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-heading tracking-tight flex items-center gap-2">
              {displayName}
            </h1>
            <p className="text-gray-medium font-bold text-sm flex items-center gap-2">
              <Mail size={14} className="text-gray-medium opacity-60" />
              {profile.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {profile.isFreelancer && (
            <Link 
              href={`/workers/${profile.id}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-bg border-2 border-border text-gray-medium rounded-2xl font-bold hover:bg-card-bg hover:border-primary/30 hover:text-primary transition-all active:scale-[0.98]"
            >
              <Eye size={18} />
              <span>عرض ملفي</span>
            </Link>
          )}
          <Link href="/profile/edit" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-2xl font-black hover:bg-primary hover:text-white transition-all active:scale-[0.98]">
            <Settings size={18} />
            <span>تعديل</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
