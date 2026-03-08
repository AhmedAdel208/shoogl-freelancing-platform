"use client";

import type { ChatMessage } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import { useEffect, useRef } from "react";

interface Props {
  messages: ChatMessage[];
  currentUserId: string | null;
  currentUserImage?: string;
  otherUserImage?: string;
  isTyping?: boolean;
  isLoading: boolean;
}

export default function MessageList({ 
  messages, 
  currentUserId, 
  currentUserImage,
  otherUserImage,
  isTyping,
  isLoading 
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages.length, isTyping, isLoading]);

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col gap-4 p-4 sm:p-6 bg-bg/5 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`flex items-end gap-2 ${i % 2 === 0 ? "flex-row self-start" : "flex-row-reverse self-end"}`}>
            <div className="w-7 h-7 rounded-full bg-gray-medium/10 animate-pulse shrink-0" />
            <div className={`h-10 w-32 sm:w-48 bg-gray-medium/5 animate-pulse rounded-2xl ${i % 2 === 0 ? "rounded-tr-none" : "rounded-tl-none"}`} />
          </div>
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-center bg-bg/5">
        <p className="text-sm font-bold text-gray-medium font-cairo bg-card-bg/20 px-6 py-3 rounded-2xl border border-border/50">
          لا توجد رسائل بعد. ابدأ المحادثة الآن! 👋
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 bg-bg/10 scrollbar-thin scrollbar-thumb-border">
      <div className="max-w-4xl mx-auto flex flex-col">
        {messages.map((msg) => {
          const isMine = msg.senderId === currentUserId;
          return (
            <MessageBubble
              key={msg.id}
              message={msg}
              isMine={isMine}
              avatarUrl={isMine ? currentUserImage : otherUserImage}
            />
          );
        })}
        {isTyping && (
          <div className="flex items-end gap-2 mb-4 self-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="shrink-0">
              {otherUserImage ? (
                <img
                  src={otherUserImage}
                  alt="Typing"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shadow-sm border border-border"
                  loading="lazy"
                />
              ) : (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-card-bg flex items-center justify-center shadow-sm border border-border">
                  <span className="text-gray-medium text-[10px] font-black italic">...</span>
                </div>
              )}
            </div>
            <div className="bg-card-bg border border-border text-heading rounded-2xl rounded-tr-none px-3 py-2 shadow-sm flex items-center gap-1 w-fit mt-1">
              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
