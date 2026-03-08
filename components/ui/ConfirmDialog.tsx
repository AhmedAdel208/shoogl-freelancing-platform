"use client";

import { useState, useCallback } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

interface ConfirmDialogProps extends ConfirmOptions {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  variant = "danger",
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: "bg-red-500 hover:bg-red-600",
    warning: "bg-amber-500 hover:bg-amber-600",
    info: "bg-primary hover:bg-primary/90",
  };

  const iconStyles = {
    danger: "text-red-500 bg-red-100",
    warning: "text-amber-500 bg-amber-100",
    info: "text-primary bg-primary/10",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onCancel}
      />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-[90%] shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl ${iconStyles[variant]} flex items-center justify-center mb-4`}>
          <AlertTriangle className="w-7 h-7" />
        </div>

        {/* Content */}
        {title && (
          <h3 className="text-lg sm:text-xl font-black text-heading font-cairo mb-2">
            {title}
          </h3>
        )}
        <p className="text-gray-medium font-bold font-cairo leading-relaxed mb-6">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-border text-gray-medium font-bold font-cairo hover:bg-slate-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl text-white font-bold font-cairo transition-colors ${variantStyles[variant]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Hook for easy usage ───────────────────────────────────────
export function useConfirmDialog() {
  const [state, setState] = useState<{
    isOpen: boolean;
    options: ConfirmOptions;
    resolver: ((value: boolean) => void) | null;
  }>({
    isOpen: false,
    options: { message: "" },
    resolver: null,
  });

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        isOpen: true,
        options,
        resolver: resolve,
      });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    state.resolver?.(true);
    setState((prev) => ({ ...prev, isOpen: false, resolver: null }));
  }, [state.resolver]);

  const handleCancel = useCallback(() => {
    state.resolver?.(false);
    setState((prev) => ({ ...prev, isOpen: false, resolver: null }));
  }, [state.resolver]);

  const Dialog = useCallback(() => (
    <ConfirmDialog
      isOpen={state.isOpen}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      {...state.options}
    />
  ), [state.isOpen, state.options, handleConfirm, handleCancel]);

  return { confirm, Dialog };
}
