"use client";

import { Search, RotateCcw } from "lucide-react";
import { useState } from "react";
import type { Conversation } from "@/types/chat";
import ConversationItem from "./ConversationItem";
import ConversationSkeleton from "./ConversationSkeleton";

interface Props {
  conversations: Conversation[];
  selectedId: number | null;
  onlineUsers: Set<string>;
  onSelect: (id: number) => void;
  onRefresh: () => void;
  isLoading: boolean;
  isFetching: boolean;
}

export default function ConversationList({
  conversations,
  selectedId,
  onlineUsers,
  onSelect,
  onRefresh,
  isLoading,
  isFetching,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = conversations.filter((c) =>
    c.otherUserName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-card-bg">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-black text-heading font-cairo">
            جميع الرسائل
          </h1>
          <button 
            onClick={onRefresh}
            disabled={isFetching}
            className="p-2 text-gray-medium hover:text-primary transition-colors hover:bg-bg rounded-xl disabled:opacity-50"
          >
            <RotateCcw size={20} className={isFetching ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-medium group-focus-within:text-primary transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث هنا"
            className="w-full bg-bg border border-border rounded-2xl py-3 pr-10 pl-4 text-right font-medium font-cairo focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-heading placeholder:text-gray-medium/50"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-border">
        {isLoading ? (
          <ConversationSkeleton />
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm font-bold text-gray-medium font-cairo">
              {search ? "لا توجد نتائج" : "لا توجد محادثات بعد"}
            </p>
          </div>
        ) : (
          filtered.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isSelected={selectedId === conv.id}
              isOnline={conv.isOnline || onlineUsers.has(conv.otherUserId)}
              onSelect={() => onSelect(conv.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
