"use client";

import Link from "next/link";
import ServiceCard from "@/components/ui/service-section/ServiceCard";
import { useTranslation } from "@/hooks/useTranslation";

export default function ServicesSection() {
  const { isRtl } = useTranslation();

  return (
    <section className="py-20 lg:py-24 px-6 md:px-12 max-w-8xl mx-auto bg-bg transition-colors duration-500">
      {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-primary text-3xl md:text-4xl font-el-missiri mb-3 block opacity-80">
          {isRtl ? "بعض خدمات وظائف شغل" : "Some of SHOGOL Services"}
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-heading leading-tight font-cairo">
          {isRtl 
            ? "أهم الخدمات الاحترافية لتطوير وتنمية أعمالك" 
            : "Professional Services to Scale Your Business"}
        </h2>
      </div>

      {/* Services Grid */}
      <div className="mb-16">
        <ServiceCard />
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <Link href="/announcements">
          <button className="bg-primary hover:bg-primary/90 text-xl text-white px-12 md:px-20 py-4.5 rounded-2xl transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1 active:scale-95 font-black font-cairo cursor-pointer">
            {isRtl ? "عرض جميع المشاريع" : "View All Projects"}
          </button>
        </Link>
      </div>
    </section>
  );
}
