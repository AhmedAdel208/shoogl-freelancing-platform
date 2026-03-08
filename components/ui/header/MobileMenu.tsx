"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogIn, Sparkles, Plus } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, isMounted, user } = useAuth();
  const { t } = useTranslation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isMounted) return null;

  const links = [
    { label: t.header.home, href: "/" },
    { label: t.header.announcements, href: "/announcements" },
    { label: t.header.workers, href: "/workers" },
    { label: t.header.requests, href: "/requests" },
    { label: t.header.contact, href: "/contact" },
  ];

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 -mr-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors cursor-pointer"
        aria-label="Toggle menu"
      >
        <Menu size={28} strokeWidth={2.5} />
      </button>

      {/* Overlay & Sliding Drawer */}
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 z-100 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-110 h-[70vh] w-[85%] max-w-sm bg-white dark:bg-slate-950 shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/10">
          <span className="font-bold font-cairo text-xl text-primary">شغل</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 -ml-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20 transition-all cursor-pointer"
          >
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:-ms-autohiding-scrollbar] [scrollbar-width:none]">
          {/* Main Links */}
          <nav className="flex flex-col gap-5 font-cairo">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-black transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="h-px bg-linear-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent my-8" />

          {/* User Actions */}
          <div className="flex flex-col gap-4">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/signup"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-primary text-white font-bold font-cairo shadow-lg shadow-primary/20 active:scale-95 transition-all text-lg relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-linear-to-r flex from-primary via-teal-500 to-primary background-animate group-hover:bg-size-[l200%_auto] transition-all" />
                  <div className="relative flex items-center gap-2">
                    <Sparkles size={20} className="animate-pulse" />
                    <span>{t.header.beWorker}</span>
                  </div>
                </Link>
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 text-primary border border-primary/20 hover:bg-primary/5 active:scale-95 transition-all font-bold font-cairo text-lg"
                >
                  <LogIn size={20} />
                  <span>{t.header.login}</span>
                </Link>
              </>
            ) : (
              // Authenticated, if client show post job
              user?.isClient && (
                <Link
                  href="/projects/create"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-primary text-white font-bold font-cairo shadow-lg shadow-primary/20 active:scale-95 transition-all text-lg relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-linear-to-r flex from-primary via-teal-500 to-primary background-animate group-hover:bg-size-[200%_auto] transition-all" />
                  <div className="relative flex items-center gap-2">
                    <Plus size={20} />
                    <span>{t.header.postJob}</span>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>

        {/* Footer (Toggles) */}
        <div className="p-6 border-t border-gray-100 dark:border-white/10 flex items-center justify-center gap-6 bg-gray-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-border">
             <LanguageToggle />
             <div className="w-px h-6 bg-border" />
             <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
