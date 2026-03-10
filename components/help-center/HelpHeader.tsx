"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export default function HelpHeader() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative overflow-hidden">

      {/* Animated Blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-32 text-center">

        <h1
          className="text-6xl font-black leading-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700"
        >
          مركز المساعدة
        </h1>

        <p
          className="text-xl text-blue-100 max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both"
        >
          كل الإجابات اللي تحتاجها في مكان واحد
        </p>

        {/* Glass Search */}
        <div
          className="relative max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both"
        >
          <div className="absolute inset-0 bg-white/20 blur-2xl rounded-2xl"></div>

          <div className="relative flex items-center bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl">
            <Search className="mr-4 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن سؤال..."
              className="w-full py-5 px-4 text-gray-900 bg-transparent outline-none rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}