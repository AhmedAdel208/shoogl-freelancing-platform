"use client";

import { useState } from "react";
import { useFreelancers } from "@/hooks/workers/useFreelancers";
import WorkersContainer from "@/container/workers/workersList/WorkersContainer";

interface WorkersClientProps {
  initialData?: {
    freelancers: any[];
    totalCount: number;
  };
}

export default function WorkersClient({ initialData }: WorkersClientProps) {
  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    skillIds: [] as number[],
    nationality: "",
    minRating: 0,
    pageNumber: 1,
    pageSize: 9,
  });

  const { data, isLoading, error, refetch } = useFreelancers(searchParams, initialData);

  const freelancers = data?.freelancers || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = data?.totalPages || 0;

  return (
    <WorkersContainer
      freelancers={freelancers}
      totalCount={totalCount}
      totalPages={totalPages}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
  );
}
