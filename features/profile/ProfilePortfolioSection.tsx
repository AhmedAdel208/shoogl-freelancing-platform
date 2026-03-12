import { useState } from "react";
import { Plus, LayoutGrid, Trash2, Loader2, ExternalLink } from "lucide-react";
import {
  useUserPortfolios,
  useDeletePortfolio,
} from "@/hooks/profile/useUserPortfolios";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamic import for heavy modal - only loads when needed
const AddPortfolioModal = dynamic(() => import("./AddPortfolioModal"), {
  loading: () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
  ssr: false,
});

export default function ProfilePortfolioSection() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: portfolios = [], isLoading } = useUserPortfolios();
  const {
    mutate: deletePortfolio,
    isPending: isDeleting,
    variables: deletingId,
  } = useDeletePortfolio();

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا العمل؟")) {
      deletePortfolio(id);
    }
  };

  return (
    <>
      <section className="bg-white rounded-4xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
              <LayoutGrid size={20} />
            </div>
            معرض الأعمال
          </h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-xl font-black text-sm hover:bg-primary hover:text-white transition-all active:scale-[0.98]"
          >
            <Plus size={16} />
            إضافة عمل
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-3xl h-64 animate-pulse"
              />
            ))}
          </div>
        ) : portfolios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolios.map((item: any) => (
              <div
                key={item.id}
                className="group relative bg-white border border-slate-100 rounded-4xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Delete Button (On Hover) */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      disabled={isDeleting}
                      className="w-12 h-12 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-500 disabled:opacity-50"
                    >
                      {isDeleting && deletingId === item.id ? (
                        <Loader2 size={24} className="animate-spin" />
                      ) : (
                        <Trash2 size={24} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1 flex-1">
                      <h3 className="font-black text-slate-900 group-hover:text-primary transition-colors line-clamp-1 wrap-break-word">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 font-bold text-xs line-clamp-2 leading-relaxed wrap-break-word">
                        {item.description || "لا يوجد وصف"}
                      </p>
                    </div>
                    {item.projectUrl && (
                      <a
                        href={item.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-slate-50/50 rounded-[32px] border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
              <LayoutGrid size={32} className="text-slate-200" />
            </div>
            <p className="text-slate-400 font-bold text-sm">
              لا يوجد أعمال في معرضك حتى الآن
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-4 text-primary font-black text-sm hover:underline"
            >
              أضف أول عمل لك
            </button>
          </div>
        )}
      </section>

      <AddPortfolioModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
}
