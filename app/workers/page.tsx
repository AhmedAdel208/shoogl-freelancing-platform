"use client";

import WorkersContainer from "@/container/workers/workersList/WorkersContainer";
import Gradientline from "@/components/ui/header/Gradientline";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Footer from "@/components/landing/footer/Footer";
import { useFreelancers } from "@/hooks/workers/useFreelancers";
import { useState } from "react";

export default function WorkersPage() {
  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    skillIds: [] as number[],
    nationality: "",
    minRating: 0,
    pageNumber: 1,
    pageSize: 12,
  });

  const { data, isLoading, error, refetch } = useFreelancers(searchParams);

  const freelancers = data?.freelancers || [];
  const totalCount = data?.totalCount || 0;

  return (
    <div className="bg-bg min-h-screen w-full">
      <Gradientline />
      <LinksHeader />
      <main className=" min-h-screen w-full">
        <WorkersContainer
          freelancers={freelancers}
          totalCount={totalCount}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </main>

      <Footer />
    </div>
  );
}
