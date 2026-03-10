"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Clock,
  Wallet,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  User,
  UserCheck,
  CheckCircle2,
} from "lucide-react";
import { services } from "@/data/mockDataServiceSection";
import { useTranslation } from "@/hooks/useTranslation";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import Swiper modules
import { Navigation, Pagination } from "swiper/modules";

export default function ModernServices() {
  const { t, isRtl } = useTranslation();

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-bg select-none overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8 mb-12 sm:mb-16 ${isRtl ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
          <div className={`space-y-4 sm:space-y-5 max-w-2xl w-full ${isRtl ? 'text-right' : 'text-left'}`}>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 bg-primary/10 rounded-full text-primary text-[10px] sm:text-[11px] font-black font-cairo tracking-widest uppercase">
              <Sparkles size={14} />
              {isRtl ? "الخدمات الأكثر طلباً" : "Most Requested Services"}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[52px] font-black text-heading font-cairo leading-[1.2] sm:leading-[1.15]">
              {isRtl ? (
                <>
                  استكشف أفضل <span className="text-primary">الخدمات</span>
                  <br />
                  التي تقدمها منصة شُغل
                </>
              ) : (
                <>
                  Explore the Best <span className="text-primary">Services</span>
                  <br />
                  Offered by SHOGOL
                </>
              )}
            </h2>
            <p className="text-gray-medium font-bold font-cairo text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl opacity-90">
              {isRtl 
                ? "نخبة من المستقلين المبدعين جاهزون لتحويل أفكارك إلى واقع ملموس بدقة عالية وميزانية تناسب تطلعاتك."
                : "A selection of creative freelancers ready to turn your ideas into a tangible reality with high precision and a budget that suits your aspirations."}
            </p>
          </div>

          <div className="w-full md:w-auto mt-2 md:mt-0">
            <Link href="/workers" className="block w-full">
              <button className="flex w-full md:w-auto justify-center cursor-pointer items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4.5 bg-card-bg border border-border rounded-[18px] sm:rounded-[22px] text-gray-medium font-black font-cairo text-sm sm:text-base hover:bg-bg hover:border-primary/40 hover:text-primary transition-all duration-300 group shadow-sm">
                {!isRtl && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                {isRtl ? "استكشف كافة الخدمات" : "Explore All Services"}
                {isRtl && <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />}
              </button>
            </Link>
          </div>
        </div>

        {/* Services Slider */}
        <div className="relative mb-16">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            dir= 'rtl'
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-20"
          >
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                <Link
                  href="/workers"
                  className="group block relative bg-card-bg rounded-[32px] overflow-hidden border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 h-full cursor-pointer"
                >
                  {/* Image Area */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-black/5 z-10" />
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover"
                    />

                    <div className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} z-20`}>
                      <div className="bg-white dark:bg-slate-900 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-slate-200 dark:border-slate-800">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <span className="text-[14px] font-black font-cairo text-slate-900 dark:text-white relative top-px">
                          {service.rating}
                        </span>
                        <div className="bg-emerald-500 text-white rounded-full p-px ml-0.5 shadow-sm">
                          <CheckCircle2 size={10} strokeWidth={4} />
                        </div>
                      </div>
                    </div>

                    {/* Role Badge */}
                    <div className={`absolute bottom-4 ${isRtl ? 'right-4' : 'left-4'} z-20`}>
                      <div className="bg-primary backdrop-blur-md text-white px-4 py-1.5 rounded-xl text-[11px] font-black font-cairo shadow-lg shadow-primary/30">
                        {isRtl ? service.badge : (service.badgeEn || service.badge)}
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-7">
                    {/* Author Info */}
                    <div className={`flex items-center gap-3 mb-5 ${isRtl ? 'flex-row' : 'flex-row-reverse justify-end'}`}>
                      <div className="w-11 h-11 rounded-[14px] bg-bg border border-border overflow-hidden relative shadow-inner">
                        {service.personImage ? (
                          <Image src={service.personImage} alt={service.author} fill sizes="44px" className="object-cover" />
                        ) : (
                          <User size={20} className="text-gray-medium/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                      <div className={isRtl ? 'text-right' : 'text-left'}>
                        <h4 className="text-sm font-black font-cairo text-heading leading-tight">
                          {service.author}
                        </h4>
                        <p className="text-[11px] font-bold font-cairo text-gray-medium/60 uppercase tracking-tighter">
                          {isRtl ? "مستقل معتمد" : "Verified Expert"}
                        </p>
                      </div>
                    </div>

                    <h3 className={`text-[19px] font-black font-cairo text-heading mb-3 line-clamp-1 h-7 ${isRtl ? 'text-right' : 'text-left'}`}>
                      {isRtl ? service.title : (service.titleEn || service.title)}
                    </h3>

                    <p className={`text-sm font-bold font-cairo text-gray-medium leading-relaxed line-clamp-2 mb-6 h-10 ${isRtl ? 'text-right' : 'text-left'}`}>
                      {isRtl ? service.description : (service.descriptionEn || service.description)}
                    </p>

                    {/* Footer Metrics */}
                    <div className={`pt-6 border-t border-border flex items-center justify-between ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className="flex items-center gap-2 text-primary font-black font-cairo">
                        <Wallet size={16} />
                        <span className="text-xl">{service.price} <span className="text-[10px] font-bold text-gray-medium/60">{t.common.riyal}</span></span>
                      </div>

                      <div className={`flex items-center gap-1.5 text-gray-medium font-bold font-cairo text-xs ${isRtl ? '' : 'flex-row-reverse'}`}>
                        <Clock size={14} className="opacity-60" />
                        <span>{isRtl ? service.duration : (service.durationEn || service.duration)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 ring-2 ring-primary/0 group-hover:ring-primary/40 rounded-[32px] transition-all duration-300 pointer-events-none" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <button className="swiper-button-next-custom w-14 h-14 rounded-2xl bg-card-bg border border-border flex items-center justify-center text-gray-medium hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer shadow-sm active:scale-95 z-20">
              <ArrowLeft size={22} strokeWidth={2.5} />
            </button>
            <div className="swiper-pagination-custom w-fit! static! flex gap-2"></div>
            <button className="swiper-button-prev-custom w-14 h-14 rounded-2xl bg-card-bg border border-border flex items-center justify-center text-gray-medium hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer shadow-sm active:scale-95 z-20">
              <ArrowLeft size={22} strokeWidth={2.5} className="rotate-180" />
            </button>
          </div>
        </div>

        {/* Why Shogol Info Box */}
        <div className="mt-20 sm:mt-24 md:mt-32 p-6 sm:p-10 lg:p-16 xl:p-20 bg-card-bg rounded-[40px] md:rounded-[60px] relative overflow-hidden group border border-border shadow-md">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-50" />

          <div className={`relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center ${isRtl ? '' : 'text-left'}`}>
            <div className={`lg:col-span-4 space-y-4 sm:space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-[20px] sm:rounded-[28px] flex items-center justify-center text-primary mb-6 sm:mb-8 ring-1 ring-primary/20 shadow-xl shadow-primary/5">
                <UserCheck className="w-8 h-8 sm:w-9 sm:h-9" strokeWidth={2.2} />
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-[40px] font-black text-heading font-cairo leading-tight sm:leading-[1.2]">
                {isRtl ? (
                  <>لماذا تختار <span className="text-primary italic">شُغل؟</span></>
                ) : (
                  <>Why Choose <span className="text-primary italic">SHOGOL</span></>
                )}
              </h3>
              <p className="text-gray-medium font-bold font-cairo text-lg sm:text-xl leading-relaxed opacity-80 max-w-lg">
                {isRtl 
                  ? "نحن لا نوفر منصة عمل فقط، بل نبني علاقات مهنية ناجحة بين المبدعين وأصحاب الأعمال."
                  : "We don't just provide a work platform; we build successful professional relationships between creators and business owners."}
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  icon: <ShieldCheck size={28} />,
                  title: isRtl ? "أمان كامل لبياناتك" : "Full Data Security",
                  desc: isRtl ? "نستخدم أحدث تقنيات التشفير لضمان سرية معلوماتك المالية والشخصية." : "We use the latest encryption technologies to ensure the confidentiality of your financial and personal info.",
                  color: "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20"
                },
                {
                  icon: <Sparkles size={28} />,
                  title: isRtl ? "جودة احترافية" : "Professional Quality",
                  desc: isRtl ? "نخبة من المستقلين الذين تم اختيارهم بعناية لضمان أعلى جودة في التنفيذ." : "A selection of freelancers carefully chosen to ensure the highest quality of execution.",
                  color: "bg-amber-500/10 text-amber-500 ring-amber-500/20"
                },
                {
                  icon: <Wallet size={28} />,
                  title: isRtl ? "دفعات آمنة" : "Secure Payments",
                  desc: isRtl ? "نظام حماية الدفعات يضمن حقوق الطرفين حتى إتمام العمل بنجاح." : "The payment protection system guarantees the rights of both parties until the work is successfully completed.",
                  color: "bg-primary/10 text-primary ring-primary/20"
                },
                {
                  icon: <ArrowUpRight size={28} />,
                  title: isRtl ? "دعم فني 24/7" : "24/7 Technical Support",
                  desc: isRtl ? "فريق دعم متخصص متواجد دائماً لمساعدتك في أي وقت وبكل احترافية." : "A specialized support team is always available to assist you at any time with full professionalism.",
                  color: "bg-blue-500/10 text-blue-500 ring-blue-500/20"
                },
              ].map((box, i) => (
                <div
                  key={i}
                  className="bg-bg p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] border border-border shadow-sm hover:border-primary/20 transition-all duration-300 group/box"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 ring-1 ${box.color}`}>
                    {box.icon}
                  </div>
                  <h4 className={`text-heading font-black font-cairo text-lg sm:text-xl mb-2 sm:mb-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {box.title}
                  </h4>
                  <p className={`text-gray-medium text-sm sm:text-[15px] font-bold font-cairo leading-relaxed opacity-80 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {box.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
