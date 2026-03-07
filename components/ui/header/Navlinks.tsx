"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

export default function Navlinks() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const links = [
    { label: t.header.home, href: "/" },
    { label: t.header.announcements, href: "/announcements" },
    { label: t.header.workers, href: "/workers" },
    { label: t.header.requests, href: "/requests" },
    { label: t.header.contact, href: "/contact" },
  ];

  return (
    <ul className="flex gap-8 text-base font-cairo">
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/" && pathname.startsWith(link.href));

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`relative py-1 font-bold transition-colors duration-200 group
                ${isActive ? "text-primary" : "text-gray-medium hover:text-primary"}
              `}
            >
              {link.label}
         
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
