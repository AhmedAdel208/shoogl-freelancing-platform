"use client";

import { ArrowRight } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { getImageUrl } from "@/utils/image";

interface Props {
  name: string;
  image?: string;
  isOnline: boolean;
  lastSeen?: string;
  onBack: () => void;
}

export default function ChatHeader({
  name,
  image,
  isOnline,
  lastSeen,
  onBack,
}: Props) {
  return (
    <div className="px-4 sm:px-6 sticky top-[2%] py-4 bg-card-bg/80 backdrop-blur-md border-b border-border flex items-center gap-3 sm:gap-4">
      <button
        onClick={onBack}
        className="md:hidden p-2 -mr-2 text-gray-medium hover:text-heading transition-colors"
      >
        <ArrowRight size={24} />
      </button>

      <UserAvatar name={name} image={getImageUrl(image)} isOnline={isOnline} size="sm" />

      <div>
        <h2 className="text-sm sm:text-base font-black text-heading font-cairo leading-tight">
          {name}
        </h2>
        <p
          className={`text-[10px] sm:text-[11px] font-bold font-cairo ${
            isOnline ? "text-emerald-500" : "text-gray-medium/60"
          }`}
        >
          {isOnline ? "متصل الآن" : lastSeen || "غير متصل"}
        </p>
      </div>
    </div>
  );
}
