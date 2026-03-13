"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AdsSection from "@/container/announcements/ads";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import { useJobRequests } from "@/hooks/ads/useJobRequests";
import { useAnnouncementsFilters } from "@/hooks/ads/useAnnouncementsFilters";
import { useTranslation } from "@/hooks/useTranslation";

export default function AnnouncementsPage() {
  const searchParams = useSearchParams();
  const { isRtl } = useTranslation();
  const { apiParams, filters, updateFilter, setPage } = useAnnouncementsFilters();
  const { data, isLoading, error, refetch } = useJobRequests(apiParams);

  // Read search query from URL on mount
  useEffect(() => {
    const searchFromUrl = searchParams.get("search");
    if (searchFromUrl) {
      updateFilter("searchTerm", searchFromUrl);
    }
  }, [searchParams, updateFilter]);

  return (
    <div className="bg-bg min-h-screen w-full flex flex-col" dir={isRtl ? "rtl" : "ltr"}>
      <div className="sticky top-0 z-50">
        <Gradientline />
        <LinksHeader />
      </div>
      <main className="flex-1">
        <AdsSection 
          isRtl={isRtl}
          filters={filters}
          updateFilter={updateFilter}
          setPage={setPage}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
          data={data}
        />
      </main>
      <Footer />
    </div>
  );
}
