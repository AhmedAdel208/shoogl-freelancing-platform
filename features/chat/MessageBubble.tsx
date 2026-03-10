import type { ChatMessage } from "@/types/chat";
import { Check, CheckCheck, FileIcon } from "lucide-react";
import { getImageUrl } from "@/utils/image";

interface Props {
  message: ChatMessage;
  isMine: boolean;
  avatarUrl?: string;
}

export default function MessageBubble({ message, isMine, avatarUrl }: Props) {
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

  const isImage = (url?: string) => {
    if (!url) return false;
    return /\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?.*)?\\s*$/i.test(url);
  };

  return (
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
              {isImage(message.fileName || message.fileUrl) ? (
                <div className="relative rounded-xl overflow-hidden bg-bg/50 flex items-center justify-center min-w-[200px] border border-border/20">
                  <img
                    src={getImageUrl(message.fileUrl)}
                    alt={message.fileName || "مرفق"}
                    className="max-w-full h-auto max-h-[350px] object-contain cursor-pointer transition-transform hover:scale-[1.01]"
                    loading="lazy"
                    onClick={() => window.open(getImageUrl(message.fileUrl!), "_blank")}
                  />
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
  );
}
