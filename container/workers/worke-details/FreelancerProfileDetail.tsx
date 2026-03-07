"use client";

import { User, Briefcase, Star, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Worker } from "@/types/workers";
import ProfileCard from "@/container/workers/worke-details/ProfileCard";
import PortfolioSection from "@/container/workers/worke-details/PortofolieSection";
import ReviewsSection from "@/container/workers/worke-details/ReviewsSection";
import Image from "next/image";

interface FreelancerProfileDetailProps {
  data: Worker;
}

export default function FreelancerProfileDetail({ data }: FreelancerProfileDetailProps) {
  const [activeTab, setActiveTab] = useState("bio");
  const bioRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "bio", label: "نبذة عني", icon: <User size={18} />, ref: bioRef },
    { id: "portfolio", label: "معرض الأعمال", icon: <Briefcase size={18} />, ref: portfolioRef },
    { id: "reviews", label: "التقييمات", icon: <Star size={18} />, ref: reviewsRef },
  ];

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>, id: string) => {
    if (ref.current) {
      const topOffset = ref.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
      setActiveTab(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      
      if (reviewsRef.current && scrollPos >= reviewsRef.current.offsetTop) {
        setActiveTab("reviews");
      } else if (portfolioRef.current && scrollPos >= portfolioRef.current.offsetTop) {
        setActiveTab("portfolio");
      } else {
        setActiveTab("bio");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bg flex flex-col selection:bg-primary/10 font-cairo" dir="rtl">
      {/* Modern Elite Banner */}
      <div className="h-64 md:h-80 w-full relative overflow-hidden">
        {data.coverImageUrl ? (
          <>
            <Image
              src={data.coverImageUrl}
              alt="Cover"
              fill
              className="object-cover"
              priority
            />
            {/* Smooth transition from cover to content */}
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-bg" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-bg to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-indigo-950 via-slate-900 to-primary/40">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(28,178,185,0.15),transparent_50%)]" />
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 w-full -mt-20 md:-mt-24 pb-24 relative z-10" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Profile Sidebar */}
          <div className="lg:col-span-4 order-1 lg:sticky lg:top-8 space-y-6 animate-in slide-in-from-right-8 duration-700">
            <ProfileCard user={data} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8 order-2">
            
            {/* Sticky Navigation Tabs */}
            <div className="sticky top-4 z-40 bg-card-bg/80 backdrop-blur-xl rounded-[28px] p-2 shadow-xl border border-border mb-6 flex items-center justify-between sm:justify-start gap-1 sm:gap-3 transition-all duration-500">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.ref, tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-[22px] font-black font-cairo text-sm transition-all duration-300 relative group truncate ${
                    activeTab === tab.id 
                    ? "bg-primary text-white shadow-lg scale-[1.02]" 
                    : "text-gray-medium hover:bg-bg hover:text-heading"
                  }`}
                >
                  <span className={`transition-transform duration-300 ${activeTab === tab.id ? "scale-110" : "group-hover:scale-110"}`}>
                    {tab.icon}
                  </span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Bio Section */}
            <div 
              id="bio" 
              ref={bioRef}
              className="group bg-card-bg rounded-[40px] p-8 md:p-10 shadow-sm border border-border transition-all duration-500 hover:shadow-xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center border border-primary/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <User size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black text-heading font-cairo tracking-tight"> نبذة عني</h3>
              </div>
              
              <div className="relative leading-relaxed">
                <p className="text-gray-dark font-bold font-cairo text-base md:text-[17px] bg-bg/50 rounded-[30px] p-8 group-hover:bg-bg border border-transparent group-hover:border-border transition-all duration-500 shadow-inner whitespace-pre-line">
                  {data.bio || "هذا المستقل يفضل العمل في صمت.. لم يتم إضافة نبذة تعريفية بعد."}
                </p>
              </div>
            </div>

            {/* Portfolio Section */}
            <div 
              id="portfolio" 
              ref={portfolioRef}
              className="group bg-card-bg rounded-[40px] p-8 md:p-10 shadow-sm border border-border transition-all duration-500 hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center border border-indigo-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <Briefcase size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-black text-heading font-cairo tracking-tight">معرض الأعمال</h3>
                </div>
                <div className="flex items-center gap-2 px-5 py-2 bg-indigo-500/5 rounded-full border border-indigo-500/10">
                  <span className="text-[13px] font-black text-indigo-400 font-cairo">إجمالي الأعمال:</span>
                  <span className="text-sm font-black text-indigo-500">{data.portfolios?.length || 0}</span>
                </div>
              </div>
              
              <PortfolioSection portfolio={data.portfolios || []} />
            </div>

            {/* Reviews Section */}
            <div 
              id="reviews" 
              ref={reviewsRef}
              className="group bg-card-bg rounded-[40px] p-8 md:p-10 shadow-sm border border-border transition-all duration-500 hover:shadow-xl"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center border border-amber-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <Star size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black text-heading font-cairo tracking-tight">التقييمات والآراء</h3>
              </div>
              
              <ReviewsSection reviews={data.reviews || []} />
            </div>
          </div>

        </div>
      </div>

      {/* Floating Mobile Action */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 lg:hidden z-50 w-full px-6 max-w-sm">
        <button className="w-full bg-slate-900 dark:bg-primary text-white p-5 rounded-2xl font-black font-cairo text-lg flex items-center justify-center gap-3 active:scale-95 transition-all border border-white/10 backdrop-blur-md">
          تواصل مع المستقل
          <MessageSquare size={20} />
        </button>
      </div>
    </div>
  );
}
