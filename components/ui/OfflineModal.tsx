"use client";

import { useState, useEffect } from "react";
import { Wifi, WifiOff, X } from "lucide-react";

export default function OfflineModal() {
  const [isOnline, setIsOnline] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      setShowModal(true);
      // Auto-hide after 3 seconds when back online
      setTimeout(() => {
        handleClose();
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowModal(true);
      setIsAnimating(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setShowModal(false);
    }, 300); // Match animation duration
  };

  if (!showModal) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] flex justify-center pointer-events-none ${
        isAnimating
          ? "animate-in slide-in-from-bottom duration-300"
          : "animate-out slide-out-to-bottom duration-300"
      }`}
    >
      <div
        className={`pointer-events-auto m-4 mb-6 sm:mb-8 w-full max-w-md ${
          isOnline ? "bg-emerald-500 text-white" : "bg-slate-900 text-white"
        } rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden`}
      >
        {/* Top accent line */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-white/30 rounded-full" />
        </div>

        {/* Content */}
        <div className="flex items-center gap-4 p-4 sm:p-5 pt-2 sm:pt-3">
          {/* Icon */}
          <div
            className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center ${
              isOnline ? "bg-white/20" : "bg-red-500/20"
            }`}
          >
            {isOnline ? (
              <Wifi className="w-6 h-6 sm:w-7 sm:h-7" />
            ) : (
              <WifiOff className="w-6 h-6 sm:w-7 sm:h-7" />
            )}
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-base sm:text-lg font-cairo">
              {isOnline ? "تم استعادة الاتصال" : "لا يوجد اتصال بالإنترنت"}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm font-bold font-cairo mt-0.5">
              {isOnline
                ? "يمكنك الآن المتابعة بشكل طبيعي"
                : "تحقق من اتصالك بالإنترنت وحاول مرة أخرى"}
            </p>
          </div>

          {/* Close button - only show when online */}
          {isOnline && (
            <button
              onClick={handleClose}
              className="shrink-0 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Retry button when offline */}
        {!isOnline && (
          <div className="px-4 sm:px-5 pb-4 sm:pb-5">
            <button
              onClick={() => {
                // Try to reload the page
                window.location.reload();
              }}
              className="w-full py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 rounded-xl sm:rounded-2xl font-bold font-cairo text-sm sm:text-base transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
