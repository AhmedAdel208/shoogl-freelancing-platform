"use client";

import { SearchAndFiltersProps } from "@/types/announcements";
import { statusOptions } from "@/data/statusOptions";
import CommonSearchAndFilters, { FilterField, FilterInput, FilterSelect } from "@/container/reusable/form/CommonSearchAndFilters";
import { useTranslation } from "@/hooks/useTranslation";

export default function SearchAndFilters({
  searchTerm,
  minBudget,
  maxBudget,
  status,
  filterShow,
  onSearchChange,
  onFilterChange,
}: SearchAndFiltersProps) {
  const { isRtl, t } = useTranslation();

  const statusOptionsEn = [
    { value: "", label: "All Cases" },
    { value: "Pending", label: "Open" },
    { value: "Accepted", label: "Completed" },
  ];

  return (
    <CommonSearchAndFilters
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      filterShow={filterShow}
      onFilterToggle={(show) => onFilterChange("filterShow", show)}
      placeholder={isRtl ? "ابحث عن مشاريع ملهمة..." : "Search for inspiring projects..."}
    >
      {/* Min Budget */}
      <FilterField label={isRtl ? "الحد الأدنى للميزانية" : "Min Budget"}>
        <FilterInput
          type="text"
          inputMode="numeric"
          placeholder="0"
          unit={t.common.riyal}
          value={minBudget}
          onChange={(e) => onFilterChange("minBudget", e.target.value)}
        />
      </FilterField>

      {/* Max Budget */}
      <FilterField label={isRtl ? "الحد الأقصى للميزانية" : "Max Budget"}>
        <FilterInput
          type="text"
          inputMode="numeric"
          placeholder="10,000"
          unit={t.common.riyal}
          value={maxBudget}
          onChange={(e) => onFilterChange("maxBudget", e.target.value)}
        />
      </FilterField>

      {/* Status */}
      <FilterField label={isRtl ? "حالة المشروع" : "Project Status"}>
        <FilterSelect
          options={isRtl ? statusOptions : statusOptionsEn}
          value={status}
          onChange={(e) => onFilterChange("status", e.target.value)}
        />
      </FilterField>
    </CommonSearchAndFilters>
  );
}
