import { TransformedJobRequestsResponse } from "@/hooks/ads/useJobRequests";
import SearchAndFilters from "./SearchAndFilters";
import ProjectCard from "./ProjectCard";
import EmptyState from "@/common/EmptyState";
import ErrorState from "@/common/ErrorState";
import PremiumSkeletonGrid from "@/common/PremiumSkeletonGrid";
import Pagination from "@/common/Pagination";
import { FiltersState } from "@/types/announcements";

interface AdsSectionProps {
  isRtl: boolean;
  filters: FiltersState;
  updateFilter: (key: keyof FiltersState, value: string | number | boolean) => void;
  setPage: (page: number) => void;
  isLoading: boolean;
  error: any;
  refetch: () => void;
  data: TransformedJobRequestsResponse | undefined;
}

export default function AdsSection({
  isRtl,
  filters,
  updateFilter,
  setPage,
  isLoading,
  error,
  refetch,
  data,
}: AdsSectionProps) {

  const projects = data?.projects || [];

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
            onSearchChange={(value: string) => updateFilter("searchTerm", value)}
            onFilterChange={updateFilter}
          />

  

        {/* Results State */}
        {isLoading ? (
          <PremiumSkeletonGrid count={6} />
        ) : error ? (
          <div className="py-12">
            <ErrorState 
              message={isRtl ? "حدث خطأ أثناء جلب الإعلانات. يرجى المحاولة لاحقاً." : "An error occurred while fetching projects. Please try again later."} 
              onRetry={refetch} 
            />
          </div>
        ) : projects.length === 0 ? (
          <div className="py-12">
            <EmptyState />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>

            {/* Pagination */}
            {data && data.totalPages > 1 && (filters.pageNumber > 1 || projects.length === data.pageSize) && (
              <Pagination
                currentPage={filters.pageNumber}
                totalPages={data.totalPages}
                onPageChange={setPage}
                isRtl={isRtl}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
