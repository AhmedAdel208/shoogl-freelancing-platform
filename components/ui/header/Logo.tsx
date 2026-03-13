
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="relative group flex items-center mt-1 shrink-0"
      aria-label="الرئيسية"
    >
      <Image
        src={logo}
        alt="شغل - منصة العمل الحر"
        priority
        className="relative z-10 transition-transform duration-300 h-10 w-auto md:h-[60px]"
      />
    </Link>
  );
}
