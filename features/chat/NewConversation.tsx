"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

interface NewConversationProps {
  onSend: (content: string) => void;
  isSending: boolean;
}

export default function NewConversation({
  onSend,
  isSending,
}: NewConversationProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-bg/30 backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card-bg/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold font-cairo text-gray-900">محادثة جديدة</h3>
            <p className="text-sm text-gray-500 font-cairo">
              ابدأ محادثة مع هذا المستخدم
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center text-primary/30">
          <Send size={40} className="-rotate-12" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-cairo mb-2">
            ابدأ المحادثة
          </h3>
          <p className="text-gray-500 font-medium font-cairo max-w-sm">
            أرسل رسالتك الأولى للبدء في التواصل مع هذا المستخدم
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card-bg">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 px-4 py-3 rounded-xl border border-border bg-bg font-cairo focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            disabled={isSending}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim() || isSending}
            className="px-6 py-3 bg-primary text-white rounded-xl font-bold font-cairo hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {isSending ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send size={18} />
            )}
            إرسال
          </button>
        </div>
      </div>
    </div>
  );
}
