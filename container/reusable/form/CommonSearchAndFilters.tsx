"use client";

import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export interface FilterOption {
  value: string;
  label: string;
}

interface CommonSearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterShow: boolean;
  onFilterToggle: (show: boolean) => void;
  placeholder?: string;
  children?: React.ReactNode; 
}

export default function CommonSearchAndFilters({
  searchTerm,
  onSearchChange,
  filterShow,
  onFilterToggle,
  placeholder,
  children,
}: CommonSearchAndFiltersProps) {
  const { isRtl } = useTranslation();

  return (
    <div className="w-full space-y-4">
      {/* Main Search Bar */}
      <div className={`group relative flex flex-col sm:flex-row items-stretch gap-4 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className="relative flex-1">
          {/* Active Glow Effect */}
          <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          
          <div className="relative flex items-center bg-bg border border-border rounded-2xl shadow-xs group-focus-within:shadow-lg group-focus-within:border-primary/20 transition-all duration-300 overflow-hidden">
            <Search className={`absolute ${isRtl ? 'right-5' : 'left-5'} w-5 h-5 text-gray-medium group-focus-within:text-primary transition-colors`} />
            <input
              type="text"
              placeholder={placeholder || (isRtl ? "ابحث عن ما تريد..." : "Search for anything...")}
              className={`w-full bg-transparent py-4.5 ${isRtl ? 'pr-14 pl-6 text-right' : 'pl-14 pr-6 text-left'} focus:outline-none text-heading font-black font-cairo text-lg placeholder:text-gray-medium/40`}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <button
          type="button"
          onClick={() => onFilterToggle(!filterShow)}
          className={`flex items-center justify-center gap-3 px-10 py-4.5 rounded-2xl font-black font-cairo text-lg transition-all duration-300 active:scale-95 cursor-pointer border ${isRtl ? 'flex-row' : 'flex-row-reverse'}
            ${filterShow 
              ? 'bg-primary text-white border-primary shadow-xl shadow-primary/25' 
              : 'bg-bg text-gray-medium border-border hover:border-primary/30 hover:bg-primary/5 shadow-xs'
            }`}
        >
          <SlidersHorizontal size={22} strokeWidth={2.5} className={filterShow ? "text-white" : "text-primary"} />
          <span className="mb-px">{isRtl ? "تصفية" : "Filter"}</span>
        </button>
      </div>

      {/* Expanded Filters */}
      <div className={`grid transition-all duration-500 ease-in-out ${filterShow ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}>
        <div className="overflow-hidden">
          <div className="bg-bg/40 backdrop-blur-md border border-border rounded-[32px] p-8 grid grid-cols-1 md:grid-cols-3 gap-10 shadow-sm mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Sub-components
export const FilterField = ({ label, children }: { label: string; children: React.ReactNode }) => {
  const { isRtl } = useTranslation();
  return (
    <div className="space-y-3">
      <label className={`block text-heading font-black font-cairo text-[13px] uppercase tracking-wider opacity-70 ${isRtl ? 'text-right mr-1' : 'text-left ml-1'}`}>
        {label}
      </label>
      <div className="relative group/field">
        {children}
      </div>
    </div>
  );
};

export const FilterInput = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement> & { unit?: string }) => {
  const { isRtl } = useTranslation();
  return (
    <>
      <input
        {...props}
        className={`w-full bg-bg border border-border rounded-xl py-3.5 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-heading font-black font-cairo shadow-xs ${isRtl ? 'text-right' : 'text-left'} ${props.className}`}
      />
      {props.unit && (
        <span className={`absolute ${isRtl ? 'left-5' : 'right-5'} top-1/2 -translate-y-1/2 text-gray-medium/40 text-[11px] font-black font-cairo uppercase tracking-tighter`}>
          {props.unit}
        </span>
      )}
    </>
  );
};

export const FilterSelect = ({ options, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { options: any[] | readonly any[] }) => {
  const { isRtl } = useTranslation();
  return (
    <>
      <select
        {...props}
        className={`w-full bg-bg border border-border rounded-xl py-3.5 px-10 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-heading font-black font-cairo appearance-none shadow-xs cursor-pointer ${isRtl ? 'text-right' : 'text-left'} ${props.className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-bg font-bold font-cairo">
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className={`absolute ${isRtl ? 'left-5' : 'right-5'} top-1/2 -translate-y-1/2 text-primary pointer-events-none group-focus-within/field:rotate-180 transition-transform`} size={20} />
    </>
  );
};
