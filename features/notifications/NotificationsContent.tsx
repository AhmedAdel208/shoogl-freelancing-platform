"use client";

import { useEffect } from "react";
import { Bell, CheckCheck, Inbox, ChevronRight } from "lucide-react";
import { formatTimeAgo } from "@/utils/date";
import { useNotifications } from "@/hooks/notifications/useNotifications";

export default function NotificationsContent() {
  const {
    notifications,
    unreadCount,
    isLoading,
    isMarkingAllRead,
    handleMarkAllRead,
    handleNotificationClick,
    refetch,
  } = useNotifications();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 font-cairo">
      {/* Header Match */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-10 gap-6">
        <div className="text-center sm:text-right">
          <h1 className="text-3xl font-black text-heading mb-1">الإشعارات</h1>
          <p className="text-gray-medium font-medium text-sm">
            {unreadCount > 0 ? `لديك ${unreadCount} إشعارات غير مقروءة` : "ليس لديك إشعارات جديدة"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="p-2.5 rounded-xl border border-border text-gray-medium hover:text-primary hover:border-primary/30 transition-all active:scale-95"
            title="تحديث"
          >
            <Bell size={18} />
          </button>
          <button
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0 || isMarkingAllRead}
            className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-bold transition-all duration-300 ${
              unreadCount > 0
                ? "border-primary text-primary hover:bg-primary/5 active:scale-95"
                : "border-border text-gray-medium cursor-not-allowed"
            }`}
          >
            <CheckCheck size={18} />
            تعيين الكل كمقروء
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-card-bg border border-border rounded-2xl shadow-sm">
            <Inbox className="w-16 h-16 text-gray-medium mb-4" />
            <p className="text-gray-medium font-bold">لا توجد إشعارات حتى الآن</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`flex items-center justify-between p-4 sm:p-5 bg-card-bg border rounded-2xl transition-all duration-300 cursor-pointer group ${
                notification.isRead
                  ? "border-border/60 hover:border-primary/40 hover:shadow-md"
                  : "border-primary/30 bg-primary/2 hover:border-primary/50 shadow-[0_4px_15px_rgb(0,0,0,0.05)]"
              }`}
            >
              {/* Right Side: Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                notification.isRead ? "bg-slate-100 text-slate-400" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
              }`}>
                <Bell size={22} strokeWidth={notification.isRead ? 2 : 2.5} />
              </div>

              {/* Center Content */}
              <div className="flex-1 text-right px-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-base wrap-break-word ${notification.isRead ? "font-bold text-slate-600" : "font-black text-slate-900"}`}>
                    {notification.title}
                  </h3>
                  <div className="text-[10px] text-slate-400 font-bold bg-slate-50 px-2 py-0.5 rounded-full">
                    {formatTimeAgo(notification.createdAt)}
                  </div>
                </div>
                <p className={`text-sm leading-relaxed wrap-break-word ${notification.isRead ? "text-slate-500/80" : "text-slate-600"}`}>
                  {notification.message}
                </p>
              </div>

              {/* Left Side: indicator */}
              <div className="w-6 flex items-center justify-center shrink-0">
                {!notification.isRead ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-lg shadow-primary/40 animate-pulse" />
                ) : (
                  <ChevronRight size={18} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
