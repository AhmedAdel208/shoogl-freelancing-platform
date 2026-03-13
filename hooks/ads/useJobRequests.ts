"use client";

import { useQuery } from "@tanstack/react-query";
import { jobRequestService } from "@/lib/api/jobRequests";
import { SearchJobRequestsParams, JobRequestsResponse } from "@/types/jobRequest";
import { transformJobRequestToProject } from "@/utils/dataTransforms";
import { Project } from "@/types/announcements";

export interface TransformedJobRequestsResponse extends Omit<JobRequestsResponse, 'jobRequests'> {
  projects: Project[];
}

export function useJobRequests(params: SearchJobRequestsParams) {
  return useQuery<JobRequestsResponse, Error, TransformedJobRequestsResponse>({
    queryKey: ["jobRequests", params],
    queryFn: () => jobRequestService.searchJobRequests(params),
    select: (data) => ({
      ...data,
      projects: data.jobRequests
        .filter((job) => job.status === "Pending")
        .map(transformJobRequestToProject),
    }),
  });
}
