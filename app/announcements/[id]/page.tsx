"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useDeleteProject } from "@/hooks/project/useDeleteProject";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import { useProjectDetail } from "@/hooks/project/useProjectDetail";
import ProjectHeader from "@/container/announcements/detail/ProjectHeader";
import ProjectDetails from "@/container/announcements/detail/ProjectDetails";
import ProjectSkills from "@/container/announcements/detail/ProjectSkills";
import ProjectAttachments from "@/container/announcements/detail/ProjectAttachments";
import ProjectActions from "@/container/announcements/detail/ProjectActions";
import ProjectProposals from "@/container/proposals/ProjectProposals";
import CreateProposalForm from "@/container/proposals/CreateProposalForm";
import ErrorState from "@/container/announcements/detail/ErrorState";
import ClientInfo from "@/container/announcements/detail/ClientInfo";
import { useAuth } from "@/hooks/auth/useAuth";
import Loading from "@/common/Loading";
import { useTranslation } from "@/hooks/useTranslation";

export default function AnnouncementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const { isAuthenticated, user } = useAuth();
  const [showProposalForm, setShowProposalForm] = useState(false);
  const { t, isRtl } = useTranslation();

  const {
    data: project,
    isLoading,
    error,
  } = useProjectDetail({
    id: projectId,
  });

  // Check if current user is the owner of this project
  const isOwner = user?.id === project?.clientId;
  const isFreelancer = user?.isFreelancer;

  const hasSubmittedProposal = project?.proposals?.some(
    (proposal) => proposal.freelancerId === user?.id,
  );

  const { deleteProject } = useDeleteProject();

  const handleDeleteProject = () => {
    deleteProject(projectId);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !project) {
    return <ErrorState />;
  }

  return (
    <div className="bg-bg w-full flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <Gradientline />
        <LinksHeader />
      </header>

      <section
        className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-10 md:py-16 w-full"
      >
        <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 ${isRtl ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
          
          {/* Main Content */}
          <main className="flex-1 space-y-8 animate-in fade-in duration-700">
            <div className="bg-card-bg p-6 md:p-10 shadow-sm rounded-4xl border border-border flex flex-col relative transition-all duration-300 hover:shadow-lg">
              {/* Project Header: Title, Status, Meta */}
              <ProjectHeader project={project} />

              <div className="w-full h-px bg-border my-8 opacity-50" />

              {/* Info Cards: Budget, Duration, Deadline */}
              <ProjectDetails project={project} />

              {/* Description Section */}
              <div className="mb-10 group" dir={isRtl ? "rtl" : "ltr"}>
                <h3 className={`text-xl font-black text-heading mb-6 flex items-center gap-3 ${isRtl ? 'flex-row' : 'flex-row-reverse justify-end'}`}>
                  {t.projectDetails.description}
                  <div className="w-1.5 h-6 bg-primary rounded-full opacity-50" />
                </h3>
                <div className={`text-[17px] text-gray-medium leading-loose font-bold bg-bg/50 p-8 rounded-3xl border border-border transition-all duration-300 group-hover:bg-card-bg shadow-inner ${isRtl ? 'text-right' : 'text-left'}`}>
                  {project.description}
                </div>
              </div>

              {/* Skills Section */}
              <ProjectSkills project={project} />

              {/* Attachments Section */}
              <ProjectAttachments attachments={project.attachments} />

              {/* Proposal Submission (Inline) */}
              {isFreelancer && !isOwner && !hasSubmittedProposal && showProposalForm && (
                <div id="proposal-form-section" className="mt-12 pt-12 border-t border-border animate-in fade-in slide-in-from-top-4 duration-500">
                  <CreateProposalForm jobRequestId={projectId} />
                </div>
              )}
            </div>

            <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <ProjectProposals jobRequestId={project.id.toString()} />
            </div>
          </main>

          {/* Sidebar - Actions */}
          <aside className="w-full lg:w-[380px] shrink-0 space-y-6">
            <div className="lg:sticky lg:top-28">
              {!isOwner && (
                <ClientInfo
                  project={project}
                  onSendMessage={() => console.log("Send message")}
                />
              )}
              <div className="mt-6">
                <ProjectActions
                  projectOwnerId={project.clientId}
                  jobRequestId={project.id}
                  projectStatus={project.status}
                  hasSubmittedProposal={hasSubmittedProposal}
                  onSendMessage={() => console.log("Send message")}
                  onEditProject={() =>
                    router.push(`/announcements/edit/${projectId}`)
                  }
                  onDeleteProject={handleDeleteProject}
                  onShowProposalForm={() => setShowProposalForm(true)}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}
