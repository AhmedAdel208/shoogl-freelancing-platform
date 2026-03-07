"use client";

import Image from "next/image";
import { Star, User, Calendar, CreditCard } from "lucide-react";
import { services } from "@/data/mockDataServiceSection";
import { useTranslation } from "@/hooks/useTranslation";

export default function ServiceCard() {
  const { isRtl, t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-card-bg rounded-3xl overflow-hidden shadow-sm border border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
        >
          {/* Image */}
          <div className="relative h-56 overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay Badge */}
            <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} z-10`}>
              <div className="bg-primary text-white text-[11px] font-black font-cairo px-4 py-1.5 rounded-xl shadow-lg shadow-primary/20 backdrop-blur-sm">
                {isRtl ? service.badge : (service.badgeEn || service.badge)}
              </div>
            </div>
          </div>

          {/* Meta Info Bar */}
          <div className={`flex items-center justify-between px-5 py-3.5 bg-bg/50 border-b border-border ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="flex items-center gap-1.5 text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-black font-cairo text-heading">
                {service.rating}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-sm text-heading font-black font-cairo">
                {service.author}
              </span>
              <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <User className="w-4.5 h-4.5 text-primary" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`p-6 ${isRtl ? 'text-right' : 'text-left'}`}>
            <h3 className="text-heading font-black text-[19px] mb-3 leading-tight font-cairo group-hover:text-primary transition-colors">
              {isRtl ? service.title : (service.titleEn || service.title)}
            </h3>
            <p className="text-slate-900 text-sm leading-relaxed mb-6 line-clamp-2 font-bold font-cairo opacity-70">
              {isRtl ? service.description : (service.descriptionEn || service.description)}
            </p>

            {/* Footer Info */}
            <div className={`flex items-center justify-between pt-5 border-t border-border ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="flex items-center gap-2 text-primary font-black font-cairo">
                <Calendar className="w-4 h-4 opacity-70" />
                <span className="text-xs uppercase tracking-wider">{isRtl ? service.duration : (service.durationEn || service.duration)}</span>
              </div>
              <div className="flex items-center gap-2 text-primary font-black font-cairo">
                <CreditCard className="w-4 h-4 opacity-70" />
                <span className="text-base">{service.price} <span className="text-[10px] opacity-60 ml-0.5">{t.common.riyal}</span></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
