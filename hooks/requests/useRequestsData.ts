import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { jobRequestService } from "@/lib/api/jobRequests";
import { requestsService } from "@/lib/api/requests";
import { proposalApi } from "@/lib/api/proposal";
import { toast } from "@/common/toast";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";

export const REQUESTS_QUERY_KEYS = {
  all: ["requests"] as const,
  myRequests: () => [...REQUESTS_QUERY_KEYS.all, "my-requests"] as const,
  myProposals: () => [...REQUESTS_QUERY_KEYS.all, "my-proposals"] as const,
  userProfile: () => ["user-profile"] as const,
};

export function useRequestsData() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user: currentUser, isAuthenticated } = useAuthStore();
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Queries
  const { data: requestsData, isLoading: isLoadingRequests } = useQuery({
    queryKey: REQUESTS_QUERY_KEYS.myRequests(),
    queryFn: () => requestsService.fetchMyRequests(),
    enabled: isAuthenticated,
    select: (response) => response.data,
  });

  const { data: proposalsData, isLoading: isLoadingProposals } = useQuery({
    queryKey: REQUESTS_QUERY_KEYS.myProposals(),
    queryFn: () => proposalApi.getMyProposals(),
    enabled: isAuthenticated,
  });

 
  // Mutations
  const deleteProposalMutation = useMutation({
    mutationFn: ({ proposalId }: { proposalId: number; jobRequestId?: number }) => 
      proposalApi.deleteProposal(proposalId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: REQUESTS_QUERY_KEYS.all });
      
      // Also invalidate the specific project cache so the submission state reflects accurately
      if (variables.jobRequestId) {
        queryClient.invalidateQueries({
          queryKey: ["project", variables.jobRequestId],
        });
        queryClient.invalidateQueries({
          queryKey: ["project", String(variables.jobRequestId)],
        });
      }
      
      toast.success("تم حذف العرض بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.message || "حدث خطأ أثناء حذف العرض");
    }
  });

  const deleteJobRequestMutation = useMutation({
    mutationFn: (jobRequestId: number) => jobRequestService.deleteJobRequest(jobRequestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUESTS_QUERY_KEYS.all });
      toast.success("تم حذف الطلب بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.message || "حدث خطأ أثناء حذف الطلب");
    }
  });

  const evaluateFreelancerMutation = useMutation({
    mutationFn: ({ jobRequestId, rating, comment }: { jobRequestId: number; rating: number; comment: string }) => 
      jobRequestService.evaluateFreelancer(jobRequestId, rating, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUESTS_QUERY_KEYS.all });
      toast.success("تم تقييم المستقل بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.message || "حدث خطأ أثناء تقييم المستقل");
    }
  });

  const deliverRequestMutation = useMutation({
    mutationFn: (jobRequestId: number) => jobRequestService.deliverRequest(jobRequestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUESTS_QUERY_KEYS.all });
      toast.success("تم تسليم الطلب بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.message || "حدث خطأ أثناء تسليم الطلب");
    }
  });

  const handleEditJobRequest = (jobRequestId: number) => {
    router.push(`/announcements/edit/${jobRequestId}`);
  };

  return {
    data: requestsData || null,
    proposals: proposalsData || null,
    isLoading: isLoadingRequests || isLoadingProposals ,
    currentUser,
    isAuthenticated,
    isAuthChecking: !hasHydrated,
    handleDeleteProposal: (id: number, jobRequestId?: number) => 
      deleteProposalMutation.mutate({ proposalId: id, jobRequestId }),
    handleDeleteJobRequest: (id: number) => deleteJobRequestMutation.mutate(id),
    handleDeliverRequest: (id: number) => deliverRequestMutation.mutate(id),
    handleEditJobRequest,
    isEvaluating: evaluateFreelancerMutation.isPending,
    handleEvaluateFreelancer: (jobRequestId: number, _freelancerId: string, rating: number, comment: string) => 
      evaluateFreelancerMutation.mutate({ jobRequestId, rating, comment })
  };
}
