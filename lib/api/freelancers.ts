import { apiClient } from "./apiClient";
import { Freelancer } from "@/types/freelancers";

export interface FreelancerSearchParams {
  searchTerm?: string;
  skillIds?: number[];
  nationality?: string;
  minRating?: number;
  pageNumber?: number;
  pageSize?: number;
}

export interface FreelancersResponse {
  freelancers: Freelancer[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

// Server-side fetch function (can be used in Server Components)
export async function fetchFreelancers(
  params: FreelancerSearchParams = {},
): Promise<FreelancersResponse> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://shogol.runasp.net/api";
    const response = await fetch(`${baseUrl}/User/freelancers/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
      // Cache for 60 seconds (ISR)
      next: {
        revalidate: 60,
        tags: ["freelancers"],
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch freelancers");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching freelancers:", error);
    return {
      freelancers: [],
      totalCount: 0,
      pageNumber: 1,
      pageSize: 9,
      totalPages: 0,
    };
  }
}

// Client-side fetch function (for React Query)
export async function fetchFreelancersClient(
  params: FreelancerSearchParams = {},
): Promise<FreelancersResponse> {
  const { data } = await apiClient.post("/User/freelancers/search", params);
  return data;
}
