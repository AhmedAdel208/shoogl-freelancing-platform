import { Project } from "./announcements";

// Project Header Component Props
export interface ProjectHeaderProps {
  project: Project;
  isRtl: boolean;
  t: any;
}

// Client Info Component Props
export interface ClientInfoProps {
  project: Project;
  onSendMessage?: () => void;
}

// Project Details Component Props
export interface ProjectDetailsProps {
  project: Project;
  isRtl?: boolean;
  locale: string;
  t: any;
}

// Project Skills Component Props
export interface ProjectSkillsProps {
  project: Project;
  isRtl: boolean;
  t: any;
}

// Project Actions Component Props
export interface ProjectActionsProps {
  projectOwnerId: string;
  jobRequestId: string;
  projectStatus?: string;
  hasSubmittedProposal?: boolean;
  onProposalSuccess?: (proposalId: number) => void;
  onEditProject: () => void;
  onDeleteProject: () => void;
  onShowProposalForm?: () => void;
}

// Error State Component Props
export interface ErrorStateProps {
  title?: string;
  message?: string;
  backButtonText?: string;
  backButtonHref?: string;
}
