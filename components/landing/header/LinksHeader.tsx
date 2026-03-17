"use client";

import Logo from "@/components/ui/header/Logo";
import Navbuttons from "@/components/ui/header/Navbuttons";
import Navicons from "@/components/ui/header/Navicons";
import Navlinks from "@/components/ui/header/Navlinks";
import MobileMenu from "@/components/ui/header/MobileMenu";
import { UserButton } from "@/components/ui/header/UserButton";
import { useAuth } from "@/hooks/auth/useAuth";

export default function LinksHeader() {
  const { isAuthenticated, isMounted } = useAuth();

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-bg/80 backdrop-blur-xl border-b border-border shadow-sm shadow-black/5`}
    >
      <div className="flex items-center justify-between max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-4 lg:gap-8 xl:gap-12">
          <Logo />
          <nav className="hidden lg:block">
            <Navlinks />
          </nav>
        </div>

        {/* Desktop Right: Icons + Buttons */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {isMounted && isAuthenticated && (
            <div className="flex items-center gap-4 border-l border-border/40 pl-6 ltr:border-r ltr:border-l-0 ltr:pr-6 ltr:pl-0">
               <Navicons />
            </div>
          )}
          <Navbuttons />
        </div>

        {/* Mobile Right: Notifications, Avatar + Hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          {isMounted ? (
            isAuthenticated && (
              <div className="flex items-center gap-2">
                <Navicons />
                <UserButton />
              </div>
            )
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-medium/10 animate-pulse" />
              <div className="w-8 h-8 rounded-full bg-gray-medium/10 animate-pulse" />
            </div>
          )}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
