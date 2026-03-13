import { Project } from "@/types/announcements";
import { JobRequest } from "@/types/jobRequest";

// Transform JobRequest to Project format
export const transformJobRequestToProject = (jobRequest: JobRequest): Project => ({
  id: jobRequest.id.toString(),
  title: jobRequest.title,
  description: jobRequest.description,
  status: jobRequest.status,
  budget: jobRequest.budget.toString(),
  durationInDays: jobRequest.durationInDays,
  proposalsCount: jobRequest.proposalsCount,
  clientId: jobRequest.clientId?.toString() ?? "",
  clientName: jobRequest.clientName,
  clientAvatar: jobRequest.clientAvatar,
  createdAt: jobRequest.createdAt,
  skills: jobRequest.skills?.map((skill) => ({
    id: skill.id.toString(),
    nameAr: skill.nameAr,
    nameEn: skill.nameEn,
  })),
});
