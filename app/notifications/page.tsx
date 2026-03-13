"use client";

import { useEffect } from "react";
import NotificationsContent from "@/features/notifications/NotificationsContent";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import { useNotifications } from "@/hooks/notifications/useNotifications";

const NotificationsPage = () => {
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

  return (
    <div className="min-h-screen bg-bg" dir="rtl">
      <div className="sticky top-0 z-50">
        <Gradientline />
        <LinksHeader />
      </div>
      <main className="flex-1 max-w-7xl mx-auto w-full">
        <NotificationsContent
          notifications={notifications}
          unreadCount={unreadCount}
          isLoading={isLoading}
          isMarkingAllRead={isMarkingAllRead}
          handleMarkAllRead={handleMarkAllRead}
          handleNotificationClick={handleNotificationClick}
          refetch={refetch}
        />
      </main>
    </div>
  );
};

export default NotificationsPage;
