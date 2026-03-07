"use client";

import { useState } from "react";
import CommonSearchAndFilters, {
  FilterField,
  FilterSelect,
} from "@/container/reusable/form/CommonSearchAndFilters";
import { RequestsToolbarProps } from "@/types/requestsToolbar";
import {
  ratingOptions,
  completedJobsOptions,
  nationalityOptions,
} from "@/data/requestsToolbarData";
import { useTranslation } from "@/hooks/useTranslation";

const RequestsToolbar = ({
  searchParams,
  setSearchParams,
}: RequestsToolbarProps) => {
  const [filterShow, setFilterShow] = useState(false);
  const { isRtl } = useTranslation();

  // Update search params when local state changes
  const handleSearchChange = (value: string) => {
    setSearchParams((prev) => ({ ...prev, searchTerm: value, pageNumber: 1 }));
  };

  const handleRatingChange = (value: string) => {
    const minRating = value === "0" ? 0 : parseInt(value);
    setSearchParams((prev) => ({ ...prev, minRating, pageNumber: 1 }));
  };

  const handleNationalityChange = (value: string) => {
    const nationality = value === "all" ? "" : value;
    setSearchParams((prev) => ({ ...prev, nationality, pageNumber: 1 }));
  };

  const ratingOptionsEn = [
    { value: "0", label: "All Ratings" },
    { value: "4", label: "4 Stars & Above" },
    { value: "3", label: "3 Stars & Above" },
  ];

  const completedJobsOptionsEn = [
    { value: "0", label: "Any Count" },
  ];

  const nationalityOptionsEn = [
    { value: "all", label: "All Nationalities" },
    { value: "Saudi", label: "Saudi Arabia" },
    { value: "Egypt", label: "Egypt" },
    { value: "Other", label: "Others" },
  ];

  return (
    <div className="w-full mb-8">
        <CommonSearchAndFilters
          searchTerm={searchParams.searchTerm}
          onSearchChange={handleSearchChange}
          filterShow={filterShow}
          onFilterToggle={setFilterShow}
          placeholder={isRtl ? "ابحث عن مستقل محترف..." : "Search for professional freelancers..."}
        >
          {/* Rating Filter */}
          <FilterField label={isRtl ? "التقييم" : "Rating"}>
            <FilterSelect
              options={isRtl ? ratingOptions : ratingOptionsEn}
              value={
                searchParams.minRating === 0
                  ? "0"
                  : searchParams.minRating.toString()
              }
              onChange={(e) => handleRatingChange(e.target.value)}
            />
          </FilterField>

          {/* Jobs Completed Filter */}
          <FilterField label={isRtl ? "الوظائف المكتملة" : "Completed Jobs"}>
            <FilterSelect
              options={isRtl ? completedJobsOptions : completedJobsOptionsEn}
              value="0" 
              onChange={() => {}} 
            />
          </FilterField>

          {/* Nationality Filter */}
          <FilterField label={isRtl ? "الجنسية" : "Nationality"}>
            <FilterSelect
              options={isRtl ? nationalityOptions : nationalityOptionsEn}
              value={
                searchParams.nationality === "" ? "all" : searchParams.nationality
              }
              onChange={(e) => handleNationalityChange(e.target.value)}
            />
          </FilterField>
        </CommonSearchAndFilters>
      </div>
    
  );
};

export default RequestsToolbar;
