"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useRef } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function HeroSearchBar() {
  const router = useRouter();
  const { isRtl } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(() => {
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push(`/announcements?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/announcements");
    }
  }, [searchQuery, router]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch],
  );

  return (
    <div className="relative group">
      <div
        className={`absolute -inset-px bg-linear-to-l from-primary to-teal-400 rounded-[18px] blur-sm transition-opacity duration-300 ${isFocused ? "opacity-50" : "opacity-0"}`}
      />
      <div
        className={`relative flex items-center backdrop-blur-xl rounded-2xl p-2 pr-5 gap-2 transition-all duration-300 ${
          isFocused
            ? "bg-white/15 border border-primary/30 shadow-xl"
            : "bg-white/10 border border-white/10"
        } ${isRtl ? "pr-5" : "pl-5"}`}
      >
        <div className="flex-1 relative min-h-14 flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={
              isRtl ? "اكتب ما تبحث عنه..." : "Type what you're looking for..."
            }
            dir={isRtl ? "rtl" : "ltr"}
            className={`w-full bg-transparent! border-none! outline-none text-white text-sm sm:text-base min-w-0 font-medium relative z-10 placeholder:text-white/50 ${isRtl ? "text-right" : "text-left"}`}
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-primary cursor-pointer text-white w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 shrink-0"
        >
          <Search className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}
