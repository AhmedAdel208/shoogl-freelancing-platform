"use client";

import { formatLastSeen } from "@/utils/date";
import type { Conversation } from "@/types/chat";
import UserAvatar from "./UserAvatar";
import { getImageUrl } from "@/utils/image";

interface Props {
  conversation: Conversation;
  isSelected: boolean;
  isOnline: boolean;
  onSelect: () => void;
}

export default function ConversationItem({
  conversation: conv,
  isSelected,
  isOnline,
  onSelect,
}: Props) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 mb-1 group border ${
        isSelected
          ? "bg-primary/10 border-primary/20"
          : "hover:bg-bg border-transparent"
      }`}
    >
      <UserAvatar
        name={conv.otherUserName}
        image={getImageUrl(conv.otherUserImage)}
        isOnline={isOnline}
        size="md"
      />

      <div className="flex-1 text-right overflow-hidden">
        <div className="flex items-center justify-between mb-1">
          <span
            className={`font-black font-cairo text-sm transition-colors md:truncate ${
              isSelected ? "text-primary" : "text-heading"
            }`}
          >
            {conv.otherUserName}
          </span>
          <span className="text-[10px] font-bold text-gray-medium/60 mr-2 shrink-0">
            {formatLastSeen(conv.lastMessageTime)}
          </span>
        </div>
        <p className={`text-[11px] truncate font-cairo ${conv.unreadCount > 0 ? "font-black text-primary" : "font-bold text-gray-medium"}`}>
          {conv.lastMessage || "مرفق..."}
        </p>
      </div>

      {conv.unreadCount > 0 && (
        <div className="min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-primary text-white text-[10px] font-black rounded-full shadow-lg shadow-primary/20">
          {conv.unreadCount}
        </div>
      )}
    </button>
  );
}
