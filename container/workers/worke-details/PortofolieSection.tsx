
import { useState } from "react";
import { Portfolio } from "@/types/workers";
import { Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, EffectFade, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

export default function PortfolioSection({ portfolio }: { portfolio: Portfolio[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (!portfolio?.length) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-100 rounded-[32px] bg-slate-50/50 group hover:border-primary/20 transition-colors duration-500">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 mb-4 shadow-sm group-hover:scale-110 group-hover:text-primary/30 transition-all duration-500">
          <ImageIcon size={32} />
        </div>
        <p className="text-slate-400 font-black font-cairo text-base">لم يتم إضافة أعمال لهذا المستقل بعد</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 select-none" dir="rtl">
       <div className="relative group">
          <Swiper
            spaceBetween={10}
            effect={"fade"}
            navigation={{
              nextEl: ".portfolio-next",
              prevEl: ".portfolio-prev",
            }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[Navigation, Thumbs, EffectFade, Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="rounded-[40px] overflow-hidden aspect-video border border-slate-100 shadow-2xl"
          >
            {portfolio.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full h-full">
                   <Image
                     src={item.imageUrl}
                     alt={item.title}
                     fill
                     className="object-cover"
                     priority={i === 0}
                   />
                   {/* Gradient Overlay for Text Visibility */}
                   <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12 text-white text-right">
                      <div className="space-y-3 max-w-2xl bg-black/10 backdrop-blur-sm p-6 md:p-8 rounded-[32px] border border-white/10 animate-in fade-in slide-in-from-bottom-5 duration-700">
                         <h3 className="text-2xl text-primary md:text-3xl lg:text-4xl font-black font-cairo leading-tight">
                            {item.title}
                         </h3>
                         <p className="text-slate-300 font-bold font-cairo text-sm md:text-base leading-relaxed line-clamp-2">
                            {item.description}
                         </p>
                      </div>
                   </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button className="portfolio-prev absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-slate-800 hover:bg-primary hover:text-white transition-all z-20 cursor-pointer border border-slate-100 group-hover:right-6 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
             <ChevronRight size={24} />
          </button>
          <button className="portfolio-next absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-slate-800 hover:bg-primary hover:text-white transition-all z-20 cursor-pointer border border-slate-100 group-hover:left-6 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
             <ChevronLeft size={24} />
          </button>
       </div>

       {/* Thumbs Swiper */}
       <div className="max-w-4xl mx-auto px-4">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={16}
            slidesPerView={3}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            breakpoints={{
              320: { slidesPerView: 3, spaceBetween: 10 },
              640: { slidesPerView: 4, spaceBetween: 12 },
              1024: { slidesPerView: 5, spaceBetween: 16 }
            }}
            className="thumbs-swiper cursor-pointer px-2 py-4"
          >
            {portfolio.map((item, i) => (
              <SwiperSlide key={i} className="rounded-2xl overflow-hidden border-4 border-transparent  opacity-40 [.swiper-slide-thumb-active&]:opacity-100 [.swiper-slide-thumb-active&]:border-primary transition-all shadow-sm">
                <div className="aspect-video relative">
                  <Image
                    src={item.imageUrl}
                    alt={`thumb-${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
       </div>
    </div>
  );
}