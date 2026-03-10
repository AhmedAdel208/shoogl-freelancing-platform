"use client";

import Image from "next/image";
import Link from "next/link";
import googleplay from "@/public/images/googleplay.png";
import appstore from "@/public/images/appstore.png";
import LinksFooter from "./LinksFooter";
import Copyright from "./Copywright";
import { useAuth } from "@/hooks/auth/useAuth";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useUiStore } from "@/stores/useUiStore";
import { Apple, Play } from "lucide-react";

const footerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const columnVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export default function Footer() {
  const { isAuthenticated, isMounted } = useAuth();
  const { footerAnimationPlayed, setFooterAnimationPlayed } = useUiStore();
  const { t, isRtl } = useTranslation();

  return (
    <footer className="relative bg-[#02385A] text-white overflow-hidden mt-12">
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8"
          variants={footerVariants}
          initial={footerAnimationPlayed ? "visible" : "hidden"}
          whileInView="visible"
          onViewportEnter={() => setFooterAnimationPlayed(true)}
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Column 1 - Logo & Social */}
          <div className="lg:col-span-1">
            <LinksFooter />
          </div>

          {/* Column 2 - Quick Links */}
          <motion.div
            variants={columnVariants}
            className={isRtl ? "text-right" : "text-left"}
          >
            <h4 className="text-white font-black text-xl font-cairo mb-6">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-4 text-gray-300 text-sm font-bold font-cairo">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  {t.header.contact}
                </Link>
              </li>
              <li>
                <Link
                  href="/help-center"
                  className="hover:text-primary transition-colors"
                >
                  {isRtl ? "مركز المساعدة" : "Help Center"}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="hover:text-primary transition-colors"
                >
                  {isRtl ? "شروط الاستخدام" : "Terms of Use"}
                </Link>
              </li>
              <li>
                <Link
                  href="/guarantee"
                  className="hover:text-primary transition-colors"
                >
                  {isRtl ? "ضمان حقوقك" : "Guarantee Rights"}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 3 - Pages */}
          <motion.div
            variants={columnVariants}
            className={isRtl ? "text-right" : "text-left ml-24"}
          >
            <h4 className="text-white font-black text-xl font-cairo mb-6">
              {isRtl ? "صفحات" : "Pages"}
            </h4>
            <ul className="space-y-4 text-gray-300 text-sm font-bold font-cairo">
              {isMounted && isAuthenticated ? (
                <>
                  <li>
                    <Link
                      href="/profile"
                      className="hover:text-primary transition-colors"
                    >
                      {isRtl ? "ملفي الشخصي" : "My Profile"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/messages"
                      className="hover:text-primary transition-colors"
                    >
                      {isRtl ? "الرسائل" : "Messages"}
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/signup"
                      className="hover:text-primary transition-colors"
                    >
                      {t.header.signup}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className="hover:text-primary transition-colors"
                    >
                      {t.header.login}
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  href="/announcements"
                  className="hover:text-primary transition-colors"
                >
                  {t.header.announcements}
                </Link>
              </li>
              <li>
                <Link
                  href="/workers"
                  className="hover:text-primary transition-colors"
                >
                  {t.header.workers}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 4 - App Download */}
          <motion.div
            variants={columnVariants}
            className={isRtl ? "text-right" : "text-left"}
          >
            <h4 className="text-white font-black text-xl font-cairo mb-2">
              {t.footer.downloadApp}
            </h4>
            <p className="text-gray-400 text-[13px] font-medium font-cairo mb-6 leading-relaxed">
              {isRtl
                ? "شمولية في الخدمات، أمن للوقت، حرية في التعامل"
                : "Comprehensive services, time security, freedom in dealing"}
            </p>
            <div className="space-y-3">
              <Link
                href="#"
                className="flex items-center gap-4 px-6 py-3 bg-[#244b70] border border-white/5 rounded-xl hover:bg-[#2e5d8a] transition-all group overflow-hidden"
              >
                <div className="text-white group-hover:scale-110 transition-transform">
                  <svg
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.81-3.12 1.87-2.38 5.98.6 7.5-.69 1.77-1.44 3.55-2.65 3.7zm-4.77-13.1c-.08-2.67 2.24-4.81 4.79-4.89.31 2.94-2.82 5.17-4.79 4.89z" />
                  </svg>
                </div>
                <div className={`flex-1 ${isRtl ? "text-right" : "text-left"}`}>
                  <p className="text-[10px] text-gray-300 font-bold leading-tight">
                    {isRtl ? "متوفر على" : "Available on"}
                  </p>
                  <p className="text-base font-black text-white">App Store</p>
                </div>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-6 py-3 bg-[#244b70] border border-white/5 rounded-xl hover:bg-[#2e5d8a] transition-all group overflow-hidden"
              >
                <div className="text-white group-hover:scale-110 transition-transform">
                  <svg
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="currentColor"
                  >
                    <path d="M5 3.5c-.3 0-.5.2-.5.5v16c0 .3.2.5.5.5.1 0 .3 0 .4-.1l14-8.5c.3-.2.3-.5 0-.7L5.9 3.6c-.1-.1-.3-.1-.4-.1z" />
                  </svg>
                </div>
                <div className={`flex-1 ${isRtl ? "text-right" : "text-left"}`}>
                  <p className="text-[10px] text-gray-400 font-bold leading-tight">
                    {isRtl ? "متوفر على" : "Available on"}
                  </p>
                  <p className="text-base font-black text-white">Google Play</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Copyright />
    </footer>
  );
}
