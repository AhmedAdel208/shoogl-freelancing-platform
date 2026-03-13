"use client";

import { useState, useRef } from "react";
import { Paperclip, Send, X } from "lucide-react";

interface Props {
  onSend: (content: string, attachment?: File) => void;
  isSending: boolean;
  onTyping?: (isTyping: boolean) => void;
}

export default function ChatInput({ onSend, isSending, onTyping }: Props) {
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (onTyping) {
      onTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        onTyping(false);
      }, 2000);
    }
  };

  const handleSend = () => {
    if (!text.trim() && !attachment) return;
    onSend(text.trim(), attachment || undefined);
    setText("");
    setAttachment(null);
    if (onTyping) {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      onTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 sticky bottom-6  w-full sm:w-[95%] lg:w-[90%] mx-auto bg-card-bg/50 backdrop-blur-md  space-y-3">
      {/* Attachment preview */}
      {attachment && (
        <div className="flex items-center gap-3 p-3 bg-bg rounded-xl border border-border animate-in slide-in-from-bottom-2">
          <div className="flex-1 text-right">
            <p className="text-xs font-bold text-heading font-cairo truncate break-all">
              {attachment.name}
            </p>
            <p className="text-[10px] text-gray-medium font-cairo">
              {(attachment.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <button
            onClick={() => setAttachment(null)}
            className="p-1 text-gray-medium hover:text-red-500 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Input row */}
      <div className="relative flex items-center gap-3 sm:gap-4">
        <div className="flex-1 relative flex items-center bg-bg rounded-2xl border border-border px-3 sm:px-4 group focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all shadow-inner">
          <button
            onClick={() => fileRef.current?.click()}
            className="p-3 text-gray-medium hover:text-primary transition-colors cursor-pointer"
          >
            <Paperclip size={18} />
          </button>
          <input
            type="text"
            autoFocus
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 bg-transparent border-none outline-none py-3 sm:py-4 px-2 text-right text-heading font-medium font-cairo text-sm placeholder:text-gray-medium/40"
          />
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setAttachment(file);
              e.target.value = "";
            }}
          />
        </div>

        <button
          onClick={handleSend}
          disabled={isSending || (!text.trim() && !attachment)}
          className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer ${
            text.trim() || attachment
              ? "bg-primary text-white shadow-primary/30 hover:scale-105 active:scale-95"
              : "bg-gray-medium/10 text-gray-medium/40 shadow-none cursor-not-allowed"
          }`}
        >
          {isSending ? (
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send size={20} className="-rotate-135" />
          )}
        </button>
      </div>
    </div>
  );
}
