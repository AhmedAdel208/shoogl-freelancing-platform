"use client";

import Logo from "@/components/ui/header/Logo";
import Navbuttons from "@/components/ui/header/Navbuttons";
import Navicons from "@/components/ui/header/Navicons";
import Navlinks from "@/components/ui/header/Navlinks";
import { useAuth } from "@/hooks/auth/useAuth";

export default function LinksHeader() {
  const { isAuthenticated, isMounted } = useAuth();

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-bg/80 backdrop-blur-xl border-b border-border shadow-sm shadow-black/5`}
    >
      <div className="flex items-center justify-between max-w-8xl mx-auto px-6 md:px-8 py-3.5">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden md:block">
            <Navlinks />
          </nav>
        </div>

        {/* Right: Icons + Buttons */}
        <div className="flex items-center gap-6">
          {isMounted && isAuthenticated && <Navicons />}
          <Navbuttons />
        </div>
      </div>
    </header>
  );
}
