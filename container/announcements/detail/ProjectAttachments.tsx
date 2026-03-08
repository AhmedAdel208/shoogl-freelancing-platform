"use client";

import { FileText, Paperclip, ExternalLink, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

interface Attachment {
  id: string;
  fileUrl?: string;
  url?: string;
  fileName: string;
  type?: string;
}

interface ProjectAttachmentsProps {
  attachments?: Attachment[];
}

export default function ProjectAttachments({ attachments }: ProjectAttachmentsProps) {
  const { isRtl } = useTranslation();

  if (!attachments || attachments.length === 0) {
    return null;
  }

  const title = isRtl ? "الملفات المرفقة" : "Attached Files";

  return (
    <div className="pt-4 relative">
      <div className={`flex items-center gap-3 mb-4 ${isRtl ? 'flex-row' : 'flex-row-reverse justify-end'}`}>
        <h3 className="text-xl font-black text-heading font-cairo">
          {title}
        </h3>
        <div className="w-10 h-10 rounded-xl bg-card-bg border border-border flex items-center justify-center text-gray-medium shadow-xs">
           <Paperclip size={20} strokeWidth={2.5} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {attachments.map((file) => {
          const isImage = file.fileName && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.fileName);
          const fileUrl = file.url || file.fileUrl || "";
          
          return (
            <div 
              key={file.id} 
              className="group relative flex flex-col bg-card-bg rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 shadow-sm"
            >
              <div className="aspect-video relative w-full overflow-hidden bg-bg/50 flex items-center justify-center">
                {isImage && fileUrl ? (
                  <>
                    <Image
                      src={fileUrl}
                      alt={file.fileName || "attachment"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                      <a href={fileUrl} target="_blank" rel="noopener noreferrer"
                        className="bg-white/90 p-3 rounded-full text-gray-900 hover:bg-white hover:scale-110 transition-all shadow-lg active:scale-95">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-card-bg flex items-center justify-center text-gray-medium/50 border border-border shadow-inner">
                      <FileText size={24} />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-bg flex items-center justify-center shrink-0 border border-border shadow-xs">
                    {isImage ? <ImageIcon className="text-gray-medium/60" size={16} /> : <FileText className="text-gray-medium/60" size={16} />}
                  </div>
                  <span className="text-sm font-bold font-cairo text-gray-medium truncate">
                    {file.fileName || (isRtl ? "ملف مرفق" : "Attached file")}
                  </span>
                </div>
                
                <a 
                  href={fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 flex items-center justify-center gap-2 bg-primary/5 hover:bg-primary text-primary hover:text-white rounded-xl text-xs font-black font-cairo transition-all duration-300 shadow-xs border border-primary/10"
                >
                  <span>{isRtl ? "عرض" : "View"} {isImage ? (isRtl ? "الصورة" : "Image") : (isRtl ? "الملف" : "File")}</span>
                  <ExternalLink size={14} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
