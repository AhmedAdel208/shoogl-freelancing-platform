import { Plus } from "lucide-react";
import ProposalCard from "./ProposalCard";
import EmptyState from "./EmptyState";

interface ProposalListProps {
  sectionContent: {
    title: string;
    subtitle: string;
    data: any[];
  };
  onDeleteProposal: (proposalId: number, jobRequestId?: number) => void;
  isClient?: boolean;
  onDeleteJobRequest?: (jobRequestId: number) => void;
  onEditJobRequest?: (jobRequestId: number) => void;
  onEvaluateFreelancer?: (jobRequestId: number, freelancerId: string, rating: number, comment: string) => void;
  onDeliverRequest?: (jobRequestId: number) => void;
  isEvaluating?: boolean;
}

export default function ProposalList({ 
  sectionContent, 
  onDeleteProposal, 
  isClient = false, 
  onDeleteJobRequest, 
  onEditJobRequest, 
  onEvaluateFreelancer,
  onDeliverRequest,
  isEvaluating = false
}: ProposalListProps) {
  
  if (!sectionContent?.data || sectionContent.data.length === 0) {
    if (isClient) {
      return (
        <EmptyState
          title="لا توجد طلبات"
          description="لم تقم بإنشاء أي طلبات عمل بعد. ابدأ بإنشاء طلب جديد للعثور على المستقلين المناسبين لمشروعك."
          buttonText="إنشاء طلب جديد"
          buttonIcon={Plus}
          href="/announcements/create"
        />
      );
    }
    return (
      <EmptyState
        title="لا توجد بيانات حالياً"
        description="لم يتم العثور على أي طلبات أو عروض في هذا القسم"
        buttonText="تصفح المشاريع"
        href="/announcements"
      />
    );
  }

  return (
    <div className="space-y-4">
      {sectionContent.data.map((item: any) => (
        <ProposalCard
          key={item.id}
          offer={item}
          onDeleteProposal={onDeleteProposal}
          isClient={isClient}
          onDeleteJobRequest={onDeleteJobRequest}
          onEditJobRequest={onEditJobRequest}
          onEvaluateFreelancer={onEvaluateFreelancer}
          onDeliverRequest={onDeliverRequest}
          isEvaluating={isEvaluating}
        />
      ))}
    </div>
  );
}
