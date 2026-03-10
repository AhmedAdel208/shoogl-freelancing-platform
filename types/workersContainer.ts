import { Freelancer } from "./freelancers";

interface SearchParams {
  searchTerm: string;
  skillIds: number[];
  nationality: string;
  minRating: number;
  pageNumber: number;
  pageSize: number;
}

export interface WorkersContainerProps {
  freelancers: Freelancer[];
  totalCount: number;
  totalPages: number;
  isLoading: boolean;
  error: any;
  refetch: () => void;
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}
