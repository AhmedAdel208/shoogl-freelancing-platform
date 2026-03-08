"use client";

import ProposalsList from "./ProposalsList";
import { useProjectDetail } from "@/hooks/project/useProjectDetail";
import { useAuth } from "@/hooks/auth/useAuth";
import Loading from "@/common/Loading";
import ErrorState from "@/container/announcements/detail/ErrorState";
import { useTranslation } from "@/hooks/useTranslation";
import EmptyState from "@/common/EmptyState";
import { MessageSquare } from "lucide-react";

interface ProjectProposalsProps {
  proposalId?: number | null;
  jobRequestId?: string;
}

export default function ProjectProposals({
  jobRequestId,
}: ProjectProposalsProps) {
  const {
    data: project,
    isLoading,
    error,
    refetch
  } = useProjectDetail({
    id: jobRequestId || "",
  });

  const { user } = useAuth();
  const { isRtl, t } = useTranslation();
  const isProjectOwner = user?.id === project?.clientId;

  if (isLoading) {
    return (
      <div className="py-12">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <ErrorState 
          title={isRtl ? "خطأ في تحميل العروض" : "Error Loading Proposals"}
          message={isRtl ? t.projectDetails.errorLoading : "Failed to load proposals for this project."}
        />
      </div>
    );
  }

  const projectProposals = project?.proposals || [];

  if (!projectProposals || projectProposals.length === 0) {
    return (
      <div className="py-12">
        <EmptyState 
          title={isRtl ? t.projectDetails.noProposals : "No proposals submitted yet"}
          description={isRtl ? t.projectDetails.beFirst : "Be the first to submit a proposal for this special project."}
          icon={<MessageSquare className="w-12 h-12 opacity-80" />}
        />
      </div>
    );
  }

  return (
    <ProposalsList
      proposals={projectProposals}
      isProjectOwner={isProjectOwner}
      title={isRtl ? t.projectDetails.proposals : "Proposals"}
    />
  );
}
