"use client";

import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import FacebookIcon from "@/public/icons/FacebookIcon";
import XIcon from "@/public/icons/XIcon";
import InstagramIcon from "@/public/icons/InstagramIcon";
import LinkedInIcon from "@/public/icons/LinkedInIcon";

export default function LinksFooter() {
  const { t, isRtl } = useTranslation();

  return (
    <div className={`lg:col-span-1 mt-5`}>
      <Link href="/">
        <Image
          src={logo}
          alt={t.hero.title}
          width={130}
          height={50}
          className={`object-contain -mt-8 mb-4`}
          loading="lazy"
        />
      </Link>

      <p className="text-gray-400 text-[13px] font-medium font-cairo leading-loose max-w-[220px] mb-8">
        {t.footer.logoDesc}
      </p>

      {/* Social Links inside this column */}
      <div className={`flex items-center ${isRtl ? 'justify-start' : 'justify-start'} gap-3`}>
        <a href="#" className="w-8 h-8 bg-white/5 border border-white/5 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all hover:scale-110">
          <LinkedInIcon className="w-4 h-4" />
        </a>
        <a href="#" className="w-8 h-8 bg-white/5 border border-white/5 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all hover:scale-110">
          <InstagramIcon className="w-4 h-4" />
        </a>
        <a href="#" className="w-8 h-8 bg-white/5 border border-white/5 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all hover:scale-110">
          <XIcon className="w-4 h-4" />
        </a>
        <a href="#" className="w-8 h-8 bg-white/5 border border-white/5 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all hover:scale-110">
          <FacebookIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

