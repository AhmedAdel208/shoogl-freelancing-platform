// Search and Filters Component Types
export interface SearchAndFiltersProps {
  searchTerm: string;
  minBudget: string;
  maxBudget: string;
  status: string;
  filterShow: boolean;
  onSearchChange: (value: string) => void;
  onFilterChange: (
    key: keyof FiltersState,
    value: string | number | boolean,
  ) => void;
}

// Project Card Types
export interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  budget: string;
  durationInDays: number;
  deadline?: string;
  proposalsCount: number;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  createdAt: string;
  skills?: Array<{ id: string; nameAr: string; nameEn?: string }>;
  proposals?: import("@/lib/validation/proposalSchema").ProposalDisplay[];
  attachments?: Array<{ id: string; url: string; fileName: string; type: string }>; // Add attachments
}

export interface ProjectCardProps {
  project: Project;
}

// Loading State Types
export interface LoadingStateProps {
  message?: string;
}

// Empty State Types
export interface EmptyStateProps {
  message?: string;
  title?: string;
}

// Results Counter Types
export interface ResultsCounterProps {
  currentCount: number;
  label?: string;
}

// Filter Hook Types
export interface FiltersState {
  searchTerm: string;
  minBudget: string;
  maxBudget: string;
  status: string;
  pageNumber: number;
  filterShow: boolean;
}

export interface UseAnnouncementsFiltersReturn {
  filters: FiltersState;
  apiParams: {
    pageNumber: number;
    pageSize: number;
    searchTerm?: string;
    minBudget?: number;
    maxBudget?: number;
    status?: string;
  };
  updateFilter: (
    key: keyof FiltersState,
    value: string | number | boolean,
  ) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}
