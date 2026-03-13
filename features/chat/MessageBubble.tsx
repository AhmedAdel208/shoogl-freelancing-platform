"use client";

import { useState } from "react";
import type { ChatMessage } from "@/types/chat";
import { Check, CheckCheck, FileIcon, X, Download, ZoomIn } from "lucide-react";
import { getImageUrl } from "@/utils/image";

interface Props {
  message: ChatMessage;
  isMine: boolean;
  avatarUrl?: string;
}

export default function MessageBubble({ message, isMine, avatarUrl }: Props) {
  const [showPreview, setShowPreview] = useState(false);

  const formatTime = (dateStr: string): string => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr.endsWith("Z") || dateStr.includes("+") ? dateStr : dateStr + "Z");
      if (isNaN(date.getTime())) return "";

      const parts = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).formatToParts(date);

      const hours = parts.find((p) => p.type === "hour")?.value;
      const minutes = parts.find((p) => p.type === "minute")?.value;
      const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value;

      return `${hours}:${minutes} ${dayPeriod?.toLowerCase() === "pm" ? "م" : "ص"}`;
    } catch {
      return "";
    }
  };

  const time = formatTime(message.sentAt);

  const isImage = (fileNameOrUrl?: string, fileUrl?: string) => {
    if (!fileNameOrUrl && !fileUrl) return false;
    const toCheck = fileNameOrUrl || fileUrl || "";
    // Check common image extensions (handles query params, whitespace, etc.)
    if (/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|tiff?)(\?.*)?$/i.test(toCheck.trim())) return true;
    // Also check the fileUrl separately if fileName didn't match
    if (fileUrl && /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|tiff?)(\?.*)?$/i.test(fileUrl.trim())) return true;
    // Check for common image content-type hints in the URL
    if (fileUrl && /image\//i.test(fileUrl)) return true;
    return false;
  };

  const imageDetected = isImage(message.fileName, message.fileUrl);
  const resolvedImageUrl = message.fileUrl ? getImageUrl(message.fileUrl) : "";

  return (
    <>
      <div
        className={`flex items-end gap-2 mb-4 animate-in fade-in zoom-in-95 duration-200 ${
          isMine ? "flex-row self-start" : "flex-row-reverse self-end"
        }`}
      >
        <div className="shrink-0 mb-1">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="User avatar"
              className="w-7 h-7 rounded-full object-cover shadow-sm border border-border"
              loading="lazy"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-card-bg flex items-center justify-center shadow-sm border border-border">
               <svg className="w-4 h-4 text-gray-medium" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            </div>
          )}
        </div>

        <div className={`max-w-[85%] flex flex-col ${isMine ? "items-start" : "items-end"}`}>
          <div
            className={`relative px-3.5 py-2 rounded-2xl mt-4 shadow-sm text-sm font-cairo ${
              isMine
                ? "bg-slate-800 dark:bg-primary-dark/80 text-white rounded-tr-none"
                : "bg-card-bg border border-border text-heading rounded-tl-none"
            }`}
          >
            {/* Attachment */}
            {message.fileUrl && (
              <div className="mb-2">
                {imageDetected ? (
                  <div
                    className="relative rounded-xl overflow-hidden bg-bg/50 flex items-center justify-center min-w-[200px] border border-border/20 group cursor-pointer"
                    onClick={() => setShowPreview(true)}
                  >
                    <img
                      src={resolvedImageUrl}
                      alt={message.fileName || "مرفق"}
                      className="max-w-full h-auto max-h-[350px] object-contain transition-all duration-300 group-hover:scale-[1.02] group-hover:brightness-90"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 rounded-full p-3 backdrop-blur-sm">
                        <ZoomIn size={24} className="text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    href={getImageUrl(message.fileUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                      isMine ? "bg-white/10 border-white/20 hover:bg-white/20" : "bg-bg border-border hover:bg-bg/80"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isMine ? "bg-white/20" : "bg-primary/10"}`}>
                      <FileIcon size={20} className={isMine ? "text-white" : "text-primary"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-black truncate ${isMine ? "text-white" : "text-heading"}`}>
                        {message.fileName || "ملف مرفق"}
                      </p>
                    </div>
                  </a>
                )}
              </div>
            )}

            {/* Text content */}
            {message.content && (
              <p className="font-bold leading-relaxed break-all whitespace-pre-wrap">
                {message.content}
              </p>
            )}

            {/* Footer info */}
            <div className={`flex items-center gap-1.5 mt-1 ${isMine ? "justify-end" : "justify-start"}`}>
              <span className={`text-[10px] font-bold ${isMine ? "text-white/60" : "text-gray-medium/60"}`}>
                {time}
              </span>
              {isMine && (
                <div className="flex">
                  {message.isRead ? (
                    <CheckCheck size={12} className="text-emerald-400" />
                  ) : (
                    <Check size={12} className="text-white/40" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Lightbox Modal */}
      {showPreview && resolvedImageUrl && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowPreview(false)}
        >
          {/* Top toolbar */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <a
                href={resolvedImageUrl}
                download={message.fileName || "image"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm border border-white/10"
              >
                <Download size={20} />
              </a>
            </div>
            <button
              onClick={() => setShowPreview(false)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm border border-white/10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={resolvedImageUrl}
              alt={message.fileName || "صورة"}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            {/* File name footer */}
            {message.fileName && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/60 to-transparent rounded-b-lg">
                <p className="text-white/80 text-xs font-cairo font-bold text-center truncate">
                  {message.fileName}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
