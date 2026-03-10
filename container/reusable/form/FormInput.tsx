import type { FormInputProps } from "@/types/form";
import { useId } from "react";

export default function FormInput({
  label,
  type,
  placeholder,
  icon,
  error,
  registration,
  className = "",
  required = false,
  rows,
}: FormInputProps) {
  const errorId = useId();

  const baseInputClasses = "w-full bg-bg/50 border border-border rounded-2xl px-5 py-4 text-right text-heading placeholder:text-gray-medium/40 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all group-hover:border-primary/40 shadow-inner";
  const errorClasses = error ? "border-red-500/50 ring-4 ring-red-500/10 bg-red-500/5" : "";

  return (
    <div className={`text-right ${className}`}>
      {label && (
        <label className="block text-slate-700 mb-2.5 text-[15px] font-black font-cairo mr-1">
          {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative group">
        {type === "textarea" ? (
          <textarea
            placeholder={placeholder}
            {...registration}
            rows={rows || 5}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? errorId : undefined}
            className={`${baseInputClasses} ${errorClasses} resize-none ${icon ? 'pr-12' : ''} font-cairo`}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            {...registration}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? errorId : undefined}
            className={`${baseInputClasses} ${errorClasses} ${icon ? 'pr-12' : ''} font-cairo`}
          />
        )}
        {icon && (
          <div className={`absolute right-4 ${type === 'textarea' ? 'top-6' : 'top-1/2 -translate-y-1/2'} text-gray-medium transition-colors group-focus-within:text-primary z-20 pointer-events-none`}>
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} className="text-red-500 text-sm mt-1 animate-in fade-in duration-200">
          {error}
        </p>
      )}
    </div>
  );
}
