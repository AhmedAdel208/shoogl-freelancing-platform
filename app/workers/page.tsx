import { Suspense } from "react";
import WorkersClient from "./WorkersClient";
import Gradientline from "@/components/ui/header/Gradientline";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Footer from "@/components/landing/footer/Footer";
import PremiumSkeletonGrid from "@/common/PremiumSkeletonGrid";
import { fetchFreelancers } from "@/lib/api/freelancers";

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

// Server Component - fetches data on server
export default async function WorkersPage() {
  // Fetch initial data on server with caching
  const initialData = await fetchFreelancers({
    pageNumber: 1,
    pageSize: 9,
  });

  // Filter out freelancers who don't have a bio (null, undefined, or empty string)
  const freelancers = initialData.freelancers.filter((f) => f.bio && f.bio.trim() !== "");
  


  return (
    <div className="bg-bg min-h-screen w-full">
      <Gradientline />
      <LinksHeader />
      <main className="min-h-screen w-full">
        <Suspense fallback={<PremiumSkeletonGrid count={9} />}>
          <WorkersClient
            initialData={{
              freelancers: freelancers,
              totalCount: initialData.totalCount,
            }}
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
