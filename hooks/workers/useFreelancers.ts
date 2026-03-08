import { useQuery } from "@tanstack/react-query";
import { Freelancer } from "@/types/freelancers";
import {
  fetchFreelancersClient,
  FreelancersResponse,
} from "@/lib/api/freelancers";

interface FreelancerSearchParams {
  searchTerm?: string;
  skillIds?: number[];
  nationality?: string;
  minRating?: number;
  pageNumber?: number;
  pageSize?: number;
}

interface UseFreelancersOptions {
  initialData?: {
    freelancers: Freelancer[];
    totalCount: number;
  };
}

export function useFreelancers(
  searchParams?: FreelancerSearchParams,
  initialData?: UseFreelancersOptions["initialData"],
) {
  return useQuery<FreelancersResponse>({
    queryKey: ["freelancers", searchParams],
    queryFn: () => fetchFreelancersClient(searchParams || {}),
    staleTime: 60 * 1000, // 1 minute - don't refetch
    gcTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialData: initialData
      ? {
          freelancers: initialData.freelancers,
          totalCount: initialData.totalCount,
          pageNumber: 1,
          pageSize: 12,
          totalPages: Math.ceil(initialData.totalCount / 12),
        }
      : undefined,
  });
}
