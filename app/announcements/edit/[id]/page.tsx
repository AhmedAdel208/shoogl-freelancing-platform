"use client";
import { useRouter } from "next/navigation";
import EditProjectPage from "@/container/actions/EditProjectPage";
import BackArrowIcon from "@/public/icons/BackArrowIcon";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";

export default function EditProjectPageWrapper() {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  return (
    <div>
      <header className="bg-white">
        <Gradientline />
        <LinksHeader />
      </header>
      <div className="max-w-3xl mx-auto min-h-[90vh] px-4 md:px-8 py-12 flex flex-col justify-center">
        <div className="mb-8 md:mb-12">
          <button
            onClick={handleCancel}
            className="text-gray-medium hover:text-primary flex items-center cursor-pointer gap-2 mb-6 transition-all hover:-translate-x-1"
          >
            <BackArrowIcon className="w-5 h-5 rtl:rotate-180" />
            <span className="font-bold font-cairo">العودة للمشروع</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-black text-heading mb-3 font-cairo">
            تعديل المشروع
          </h1>
          <p className="text-gray-medium font-bold font-cairo text-lg">قم بتعديل تفاصيل مشروعك</p>
        </div>

        {/* Form Component */}
        <EditProjectPage />
      </div>

      <Footer />
    </div>
  );
}
