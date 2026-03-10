import { z } from "zod";

export const proposalSchema = z.object({
  jobRequestId: z.coerce.number(),
  description: z.string().min(20, "يجب أن يكون الوصف 20 حرفاً على الأقل"),
  proposedPrice: z.coerce
    .number()
    .gt(0, "السعر يجب أن يكون أكبر من 0"),
  proposedDurationInDays: z.coerce
    .number()
    .gt(0, "المدة يجب أن تكون أكبر من 0"),
});

// Output type (after zod transforms - numbers)
export type ProposalFormData = z.infer<typeof proposalSchema>;

// Input type (raw form values - strings before transform)
export type ProposalFormInput = z.input<typeof proposalSchema>;

// ✅ Only what the API actually needs
export type ProposalSubmitData = {
  jobRequestId: number;
  description: string;
  proposedPrice: number;
  proposedDurationInDays: number;
};

// ✅ Matches the actual API response
export type ProposalDisplay = {
  id: number;
  jobRequestId: number;
  jobRequestTitle: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerRating: number;
  freelancerCompletedJobs: number;
  freelancerSkills: any[];
  freelancerPortfolios: any[];
  description: string;
  proposedPrice: number;
  proposedDurationInDays: number;
  status: "Pending" | "Accepted" | "Rejected";
  createdAt: string;
};
