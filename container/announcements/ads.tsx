"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useJobRequests } from "@/hooks/ads/useJobRequests";
import { useAnnouncementsFilters } from "@/hooks/ads/useAnnouncementsFilters";
import { transformJobRequestToProject } from "@/utils/dataTransforms";
import SearchAndFilters from "./SearchAndFilters";
import ProjectCard from "./ProjectCard";
import EmptyState from "@/common/EmptyState";
import ErrorState from "@/common/ErrorState";
import ResultsCounter from "./ResultsCounter";
import Loading from "@/common/Loading";
import { useTranslation } from "@/hooks/useTranslation";

export default function AdsSection() {
  const searchParams = useSearchParams();
  const { isRtl, t } = useTranslation();
  const { apiParams, filters, updateFilter } = useAnnouncementsFilters();
  const { data, isLoading, error, refetch } = useJobRequests(apiParams);

  // Read search query from URL on mount
  useEffect(() => {
    const searchFromUrl = searchParams.get("search");
    if (searchFromUrl) {
      updateFilter("searchTerm", searchFromUrl);
    }
  }, [searchParams]);

  const projects =
    data?.jobRequests?.filter((project) => project.status === "Pending") || [];

  if (isLoading) return <Loading />;

  return (
    <div
      className="min-h-screen bg-bg py-8 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500"
    >
      <div className="max-w-8xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-2xl md:text-3xl font-black font-cairo text-heading tracking-tight mb-2">
            { isRtl ? "تصفح الإعلانات" : "Browse Projects"}
            </h1>
          </div>

          <p className="text-lg font-bold font-cairo text-gray-medium max-w-2xl mx-auto leading-relaxed">
             {isRtl ? "اعثر على المشروع المثالي لمهاراتك وابدأ رحلتك الآن" : "Find the perfect project for your skills and start your journey now"}
          </p>
        </div>

        {/* Search & Filter Bar */}
          <SearchAndFilters
            searchTerm={filters.searchTerm}
            minBudget={filters.minBudget}
            maxBudget={filters.maxBudget}
            status={filters.status}
            filterShow={filters.filterShow}
            onSearchChange={(value) => updateFilter("searchTerm", value)}
            onFilterChange={updateFilter}
          />

        {/* Results Counter */}
          <ResultsCounter currentCount={projects.length} />

        {error && (
          <div className="py-12">
            <ErrorState 
              message={isRtl ? "حدث خطأ أثناء جلب الإعلانات. يرجى المحاولة لاحقاً." : "An error occurred while fetching projects. Please try again later."} 
              onRetry={refetch} 
            />
          </div>
        )}

        {!isLoading && !error && projects.length === 0 && (
          <div className="py-12">
            <EmptyState />
          </div>
        )}

        {/* Project Cards List */}
        {!isLoading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={transformJobRequestToProject(project)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
