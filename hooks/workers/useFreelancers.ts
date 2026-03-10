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
  const query = useQuery<FreelancersResponse>({
    queryKey: ["freelancers", searchParams],
    queryFn: () => fetchFreelancersClient(searchParams || {}),
    staleTime: 0, // Force refetch on mount to get most recent data (fixes registration lag
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    initialData: initialData
      ? {
          freelancers: initialData.freelancers,
          totalCount: initialData.totalCount,
          pageNumber: 1,
          pageSize: 9,
          totalPages: Math.ceil(initialData.totalCount / 9),
        }
      : undefined,
  });

  // Derived state to ensure totalPages is always accurate based on our client-side pageSize (9)
  const data = query.data ? {
    ...query.data,
    totalPages: Math.ceil(query.data.totalCount / (searchParams?.pageSize || 9))
  } : undefined;

  return { ...query, data };
}
