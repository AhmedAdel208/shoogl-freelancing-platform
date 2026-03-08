import { useState, useRef, useEffect } from "react";
import { User, LayoutGrid, LogOut, ChevronLeft } from "lucide-react";
import { useProfile } from "@/hooks/profile/useProfile";
import Image from "next/image";
import { useAuth } from "@/hooks/auth/useAuth";
import MenuLink from "@/components/ui/MenuLink";
import { getUserName, getUserInitials } from "@/utils";
import Spinner from "@/common/Spinner";

export const UserButton = () => {
  const { data: profile, isLoading, error } = useProfile();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="w-11 h-11 flex items-center justify-center bg-slate-50 rounded-full border border-slate-100">
        <Spinner size={5} className="text-primary/40" inline />
      </div>
    );
  }

  if (error || !profile) return null;

  const isClientRole = user?.isClient;
  const userName = getUserName(profile);
  const getInitials = () => getUserInitials(profile);

  return (
    <div className="relative mr-2" ref={dropdownRef} dir="rtl">
      {/* Profile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative cursor-pointer transition-all duration-500 active:scale-90 group ${
          isOpen ? "scale-110" : ""
        }`}
      >
        <div
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border transition-all duration-500 flex items-center justify-center border-primary bg-[#1CB2B9]/5`}
        >
          {profile.profilePictureUrl ? (
            <Image
              src={profile.profilePictureUrl}
              alt={userName}
              width={50}
              height={50}
              className="object-cover w-full h-full rounded-full"
            />
          ) : (
            <span
              className={`font-black text-sm font-cairo ${isClientRole ? "text-[#1CB2B9]" : "text-emerald-600"}`}
            >
              {getInitials()}
            </span>
          )}
        </div>
      </button>

      {/* Modern Calm Elite Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 md:top-20 left-0 w-72 sm:w-80 max-w-[calc(100vw-24px)] bg-slate-900/95 backdrop-blur-2xl rounded-[36px] shadow-[0_40px_100px_-12px_rgba(0,0,0,0.4)] border border-white/10 p-4 z-50 animate-in fade-in zoom-in-95 slide-in-from-top-6 duration-500 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10 -translate-y-1/2 translate-x-1/2" />

          {/* Header Profile Area (Information Box) */}
          <div className="relative bg-white/5 backdrop-blur-md p-6 rounded-[30px] mb-4 flex flex-col items-center gap-4 border border-white/5 group/profile overflow-hidden">
            {/* Dynamic Light Beam across profile */}
            <div className="absolute inset-0 bg-linear-to-tr from-primary/5 via-white/5 to-transparent opacity-50 transition-opacity duration-700 group-hover/profile:opacity-80" />

            {/* Profile Avatar Repetition for context */}
            <div className="w-16 h-16 rounded-2xl bg-white/10 p-1 relative z-10 transition-transform duration-500 group-hover/profile:scale-105">
              <div className="w-full h-full rounded-[14px] overflow-hidden border border-white/10">
                {profile.profilePictureUrl ? (
                  <Image
                    src={profile.profilePictureUrl}
                    alt={userName}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800">
                    <span className="text-white font-black font-cairo text-sm">
                      {getInitials()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1 text-center relative z-10">
              <p className="text-white font-black font-cairo text-xl tracking-tight">
                {userName}
              </p>
              <div className="flex items-center justify-center mt-2">
                <div
                  className={`inline-flex px-4 py-1.5 rounded-full text-[11px] font-black font-cairo tracking-wide shadow-xs
                     ${
                       isClientRole
                         ? "bg-primary/20 text-primary border border-primary/20 shadow-primary/20"
                         : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 shadow-emerald-500/20"
                     }`}
                >
                  {isClientRole ? "عـمـيـل مـمـيز" : "مـسـتـقـل محـترف"}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items with Elite Spacing */}
          <div className="space-y-1 px-1">
            <MenuLink
              href={isClientRole ? "/profile/edit" : "/profile"}
              icon={
                <User
                  size={19}
                  className="group-hover/menu:translate-x-1 transition-transform"
                />
              }
              label="الملف الشخصي"
              onClick={() => setIsOpen(false)}
            />
            <MenuLink
              href="/requests"
              icon={
                <LayoutGrid
                  size={19}
                  className="group-hover/menu:translate-x-1 transition-transform"
                />
              }
              label="طلباتي ومشاريعي"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Divider with high-end look */}
          <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent my-4 mx-2" />

          {/* Logout Section */}
          <div className="px-1">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-4 rounded-2xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-300 cursor-pointer group/logout"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-rose-500/10 rounded-xl group-hover/logout:bg-rose-500/20 transition-colors">
                  <LogOut size={20} />
                </div>
                <span className="font-black font-cairo text-[15px]">
                  تسجيل الخروج
                </span>
              </div>
              <ChevronLeft
                size={18}
                className="opacity-30 group-hover/logout:translate-x-1 transition-all"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
