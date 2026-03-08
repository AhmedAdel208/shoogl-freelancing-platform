import { useState, useCallback } from "react";
import {
  FiltersState,
  UseAnnouncementsFiltersReturn,
} from "@/types/announcements";

export const useAnnouncementsFilters = (): UseAnnouncementsFiltersReturn => {
  const [filters, setFilters] = useState<FiltersState>({
    searchTerm: "",
    minBudget: "",
    maxBudget: "",
    status: "",
    pageNumber: 1,
    filterShow: false,
  });

  const updateFilter = useCallback(
    (key: keyof FiltersState, value: string | number | boolean) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
        pageNumber: 1, // Reset to first page when any filter changes
      }));
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setFilters({
      searchTerm: "",
      minBudget: "",
      maxBudget: "",
      status: "",
      pageNumber: 1,
      filterShow: false,
    });
  }, []);

  const apiParams = {
    pageNumber: filters.pageNumber,
    pageSize: 10,
    searchTerm: filters.searchTerm || undefined,
    minBudget: filters.minBudget ? Number(filters.minBudget) : undefined,
    maxBudget: filters.maxBudget ? Number(filters.maxBudget) : undefined,
    status: filters.status || undefined,
  };

  return {
    filters,
    apiParams,
    updateFilter,
    resetFilters,
  };
};
