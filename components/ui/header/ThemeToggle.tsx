"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-11 h-11 flex items-center justify-center rounded-[18px] bg-light-white border border-border/50 shadow-sm" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`group relative w-10 h-10 flex items-center justify-center rounded-[18px] transition-all duration-400 active:scale-95 shadow-sm border border-border/50 overflow-hidden ${
        isDark ? "bg-card-bg hover:bg-light-white" : "bg-light-white hover:bg-gray-100"
      }`}
      aria-label="Toggle Dark Mode"
    >
      <div className="relative z-10 flex items-center justify-center">
        {!isDark ? (
          <Moon
            size={22}
            className="text-gray-medium group-hover:-rotate-12 transition-transform duration-300"
            strokeWidth={2.2}
            fill="currentColor"
            fillOpacity={0.2}
          />
        ) : (
          <Sun
            size={24}
            className="text-accent group-hover:rotate-45 transition-transform duration-500"
            strokeWidth={2.2}
          />
        )}
      </div>

      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[18px] pointer-events-none" />
    </button>
  );
}
