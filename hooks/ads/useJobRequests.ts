"use client";

import { useQuery } from "@tanstack/react-query";
import { jobRequestService } from "@/lib/api/jobRequests";
import { SearchJobRequestsParams } from "@/types/jobRequest";

export function useJobRequests(params: SearchJobRequestsParams) {
  return useQuery({
    queryKey: ["jobRequests", params],
    queryFn: () => jobRequestService.searchJobRequests(params),
    //Keep previous data while fetching new pages/filters to avoid flickering
    placeholderData: (previousData) => previousData,
  });
}
