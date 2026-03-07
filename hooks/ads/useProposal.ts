import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { proposalApi } from "@/lib/api/proposal";
import { ProposalSubmitData } from "@/lib/validation/proposalSchema";

export const useProposal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProposalSubmitData) => proposalApi.submitProposal(data),
    onSuccess: (data, variables) => {
      // Invalidate the specific job request query to show new proposal immediately
      queryClient.invalidateQueries({
        queryKey: ["proposals", variables.jobRequestId],
      });
      // Also invalidate the project detail query where proposals are usually nested
      queryClient.invalidateQueries({
        queryKey: ["project", variables.jobRequestId],
      });
      // Also invalidate my-proposals to refresh the user's proposals list
      queryClient.invalidateQueries({
        queryKey: ["my-proposals"],
      });
    },

  });
};

export const useProposalsByProposalId = (jobRequestId: number) => {
  return useQuery({
    queryKey: ["proposals", jobRequestId],
    queryFn: () => proposalApi.getProposalsByProposalId(jobRequestId),
  });
};
