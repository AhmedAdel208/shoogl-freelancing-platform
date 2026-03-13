"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import RequestSidebar from "@/components/requests/RequestSidebar";
import RequestsLayout from "@/components/requests/RequestsLayout";
import UserProfileHeader from "@/components/requests/UserProfileHeader";
import ProposalList from "@/components/requests/ProposalList";
import { useRequestsData } from "@/hooks/requests/useRequestsData";
import LoadingPage from "../loading";
import { useProfile } from "@/hooks/profile/useProfile";
import UnauthenticatedRequests from "@/components/requests/UnauthenticatedRequests";

export default function PendingPage() {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get("section");
  const [activeSection, setActiveSection] = useState(sectionParam || "pending");

  useEffect(() => {
    if (sectionParam) {
      setActiveSection(sectionParam);
    }
  }, [sectionParam]);
  const {
    data,
    proposals,
    isLoading,
    isAuthChecking,
    isAuthenticated,
    handleDeleteProposal,
    handleDeleteJobRequest,
    handleEditJobRequest,
    handleEvaluateFreelancer,
    handleDeliverRequest,
    isEvaluating
  } = useRequestsData();

  const {data: profile ,isPending: isProfilePending} = useProfile()


  // Show loading screen while checking authentication or fetching profile
  if (isAuthChecking || (isAuthenticated && isProfilePending)) {
    return (
      <RequestsLayout>
        <LoadingPage />
      </RequestsLayout>
    );
  }

  if (!isAuthChecking && !isAuthenticated) {
    return (
      <RequestsLayout>
        <UnauthenticatedRequests />
      </RequestsLayout>
    );
  }


  const handleSidebarClick = (itemId: string) => {
    setActiveSection(itemId);
  };



  const getSectionContent = () => {
    const isClient = profile?.isClient;
    
    switch (activeSection) {
      case "pending":
        if (isClient) {
          return {
            title: "بانتظار العروض",
            subtitle: "طلبات العمل التي تنتظر موافقتك",
            data: data?.jobRequests?.filter((r: any) => r.status?.toLowerCase() === 'pending') || []
          };
        }
        return {
          title: "بانتظار الموافقة",
          subtitle: "العروض التي قدمتها وانتظر موافقة العملاء",
          data: proposals?.proposals?.filter((p: any) => p.status?.toLowerCase() === 'pending') || []
        };
      case "in-progress":
        if (isClient) {
          return {
            title: "قيد التنفيذ",
            subtitle: "المشاريع التي تم قبولها وقيد التنفيذ",
            data: data?.jobRequests?.filter((p: any) => p.status?.toLowerCase() === "inprogress") || []
          };
        }
        return {
          title: "قيد التنفيذ",
          subtitle: "المشاريع التي تم قبولها وقيد التنفيذ",
          data: proposals?.proposals?.filter((p: any) => p.status?.toLowerCase() === "accepted" || p.status?.toLowerCase() === "inprogress") || []
        };
      case "completed":
        if (isClient) {
          return {
            title: "المكتملة",
            subtitle: "المشاريع التي تم إنجازها بنجاح",
            data: data?.jobRequests?.filter((p: any) => p.status?.toLowerCase() === 'completed') || []
          };
        }
        return {
          title: "المكتملة",
          subtitle: "المشاريع التي تم إنجازها بنجاح",
          data: proposals?.proposals?.filter((p: any) => p.status?.toLowerCase() === 'completed') || []
        };
      default:
        return {
          title: isClient ? "بانتظار العروض" : "بانتظار الموافقة",
          subtitle: "طلبات العمل التي تنتظر موافقتك",
          data: isClient 
            ? data?.jobRequests?.filter((r: any) => r.status?.toLowerCase() === 'pending') || []
            : proposals?.proposals?.filter((p: any) => p.status?.toLowerCase() === 'pending') || []
        };
    }
  };

  const sectionContent = getSectionContent();

  const isClient = profile?.isClient;

  // Robust count calculation matches section filtering
  const sidebarCounts = {
    pending: isClient 
      ? data?.jobRequests?.filter((r: any) => r.status?.toLowerCase() === 'pending').length || 0
      : proposals?.proposals?.filter((p: any) => p.status?.toLowerCase() === 'pending').length || 0,
    inProgress: isClient
      ? data?.jobRequests?.filter((r: any) => r.status?.toLowerCase() === 'inprogress').length || 0
      : proposals?.proposals?.filter((p: any) => p.status?.toLowerCase() === 'accepted' || p.status?.toLowerCase() === 'inprogress').length || 0,
    completed: isClient
      ? data?.jobRequests?.filter((r: any) => r.status?.toLowerCase() === 'completed').length || 0
      : proposals?.proposals?.filter((p: any) => p.status?.toLowerCase() === 'completed').length || 0,
  };

  return (
    <RequestsLayout>
      <div className="bg-bg min-h-screen">
        {/* Header Section */}
        <UserProfileHeader
          userProfile={profile}
         
        />

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-4 -mt-12 md:-mt-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <aside className="shrink-0 w-full lg:w-85 lg:sticky lg:top-40 z-20">
               <RequestSidebar
                activeItem={activeSection}
                onItemClick={handleSidebarClick}
                counts={sidebarCounts}
                isClient={isClient}
              />
            </aside>

             {/* Left Column: Main Content */}
             <main className="flex-1 min-w-0 transition-all duration-500 w-full">
               <div className="bg-card-bg rounded-3xl border border-border shadow-sm overflow-hidden min-h-[450px]">
                 {/* Inner Section Header */}
                 <div className="px-8 pt-8 pb-4 flex items-center justify-end">
                    <h2 className="text-xl font-black text-heading tracking-tight">{sectionContent.title}</h2>
                 </div>

                 <div className="p-6 pt-0">
                   {isLoading ? (
                     <div className="space-y-6">
                       {[1, 2, 3].map((i) => (
                         <div key={i} className="h-48 bg-card-bg/50 rounded-3xl animate-pulse" />
                       ))}
                     </div>
                   ) : (
                     <ProposalList
                      sectionContent={sectionContent}
                      onDeleteProposal={handleDeleteProposal}
                      isClient={profile?.isClient}
                      onDeleteJobRequest={handleDeleteJobRequest}
                      onEditJobRequest={handleEditJobRequest}
                      onEvaluateFreelancer={handleEvaluateFreelancer}
                      onDeliverRequest={handleDeliverRequest}
                      isEvaluating={isEvaluating}
                    />
                   )}
                 </div>
               </div>
            </main>
          </div>
        </div>
      </div>
    </RequestsLayout>
  );
}
