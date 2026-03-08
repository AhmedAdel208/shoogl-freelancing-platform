import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { proposalApi } from "@/lib/api/proposal";
import { ProposalSubmitData } from "@/lib/validation/proposalSchema";

export const useProposal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProposalSubmitData) => proposalApi.submitProposal(data),
    onSuccess: (data, variables) => {
 
      queryClient.invalidateQueries({
        queryKey: ["proposals", variables.jobRequestId],
      });
      queryClient.invalidateQueries({
        queryKey: ["proposals", String(variables.jobRequestId)],
      });
    
      queryClient.invalidateQueries({
        queryKey: ["project", variables.jobRequestId],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", String(variables.jobRequestId)],
      });
  
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
