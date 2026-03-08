"use client";

import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import FacebookIcon from "@/public/icons/FacebookIcon";
import TwitterIcon from "@/public/icons/TwitterIcon";
import InstagramIcon from "@/public/icons/InstagramIcon";
import { Linkedin } from "lucide-react";

const columnVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export default function LinksFooter() {
  const { t, isRtl } = useTranslation();

  return (
    <motion.div variants={columnVariants} className={`lg:col-span-1 mt-5 ${isRtl ? 'text-right' : 'text-left'}`}>
      <Link href="/">
        <Image
          src={logo}
          alt={t.hero.title}
          width={130}
          height={50}
          className={`object-contain -mt-8 mb-4 ${!isRtl && 'scale-x-[-1]'}`}
        />
      </Link>

      <p className="text-gray-400 text-[13px] font-medium font-cairo leading-loose max-w-[220px] mb-8">
        {t.footer.logoDesc}
      </p>

      {/* Social Links inside this column */}
      <div className={`flex items-center ${isRtl ? 'justify-start' : 'justify-start'} gap-3`}>
        <a href="#" className="w-8 h-8 bg-white/5 border border-white/5 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all hover:scale-110">
          <Linkedin size={16} />
        </a>
        <a href="#" className="w-8 h-8 bg-white/5 border border-white/5 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all hover:scale-110">
          <InstagramIcon />
        </a>
        <a href="#" className="w-8 h-8 bg-white/5 border border-white/5 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all hover:scale-110">
          <TwitterIcon />
        </a>
        <a href="#" className="w-8 h-8 bg-white/5 border border-white/5 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all hover:scale-110">
          <FacebookIcon />
        </a>
      </div>
    </motion.div>
  );
}
