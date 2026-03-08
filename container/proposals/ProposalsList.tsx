"use client";

import { ProposalDisplay } from "@/lib/validation/proposalSchema";
import ProposalCard from "./ProposalCard";
import { useTranslation } from "@/hooks/useTranslation";
import { MessageSquare } from "lucide-react";
import EmptyState from "@/common/EmptyState";

interface ProposalsListProps {
  proposals?: ProposalDisplay[];
  title?: string;
  isProjectOwner?: boolean;
}

export default function ProposalsList({
  proposals = [],
  title,
  isProjectOwner = false,
}: ProposalsListProps) {
  const { isRtl, t } = useTranslation();

  const displayTitle = title || (isRtl ? "العروض" : "Proposals");

  if (proposals.length === 0) {
    return (
      <div className="py-2">
        <EmptyState 
          title={isRtl ? t.projectDetails.noProposals : "No proposals submitted yet"}
          description={isRtl ? t.projectDetails.beFirst : "Be the first to submit a proposal for this special project."}
          icon={<MessageSquare className="w-12 h-12 opacity-80" />}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header with Counter */}
      <div className={`flex items-center justify-between mt-4 px-4 sm:px-6 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-heading font-cairo">
          {displayTitle}
        </h2>
    
      </div>
      
      {/* Cards Grid/List */}
      <div className="space-y-6 w-full animate-in fade-in duration-700">
        {proposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            isProjectOwner={isProjectOwner}
          />
        ))}
      </div>
    </div>
  );
}
