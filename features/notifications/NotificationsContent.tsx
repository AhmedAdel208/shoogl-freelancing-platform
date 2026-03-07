"use client";

import { Bell, CheckCheck, Inbox } from "lucide-react";
import { formatTimeAgo } from "@/utils/date";
import { useNotifications } from "@/hooks/notifications/useNotifications";

export default function NotificationsContent() {
  const {
    unreadNotifications,
    unreadCount,
    isLoading,
    isMarkingAllRead,
    handleMarkAllRead,
    handleNotificationClick,
  } = useNotifications();

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

      {/* List */}
      <div className="space-y-4">
        {unreadNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-card-bg border border-border rounded-2xl shadow-sm">
            <Inbox className="w-16 h-16 text-gray-medium mb-4" />
            <p className="text-gray-medium font-bold">لا توجد إشعارات حتى الآن</p>
          </div>
        ) : (
          unreadNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`flex items-center justify-between p-4 sm:p-5 bg-card-bg border rounded-lg transition-all duration-300 cursor-pointer ${
                notification.isRead
                  ? "border-border hover:border-gray-medium hover:shadow-sm"
                  : "border-primary/30 hover:border-primary/50 shadow-[0_2px_10px_rgb(0,0,0,0.04)]"
              }`}
            >
              {/* Right Side: Bell Icon */}
              <div className="w-8 sm:w-10 flex justify-center text-gray-medium shrink-0">
                <Bell size={20} className={notification.isRead ? "text-gray-medium/50" : "text-gray-medium"} />
              </div>

              {/* Center Content */}
              <div className="flex-1 text-center px-4">
                <h3 className={`text-sm sm:text-base mb-1 ${notification.isRead ? "font-bold text-gray-medium" : "font-black text-heading"}`}>
                  {notification.title}
                </h3>
                <p className={`text-xs sm:text-sm mb-2 ${notification.isRead ? "text-gray-medium/80" : "text-gray-medium"}`}>
                  {notification.message}
                </p>
                <div className="text-[11px] text-gray-medium/60 font-medium">
                  {formatTimeAgo(notification.createdAt)}
                </div>
              </div>

              {/* Left Side: Unread Dot indicator */}
              <div className="w-8 sm:w-10 flex items-center justify-center shrink-0">
                {!notification.isRead && (
                  <div className="w-2 h-2 rounded-full bg-primary shadow-sm shadow-primary/40 animate-pulse" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
