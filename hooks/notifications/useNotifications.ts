import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { notificationsApi } from "@/lib/api/notifications";
import { useAuthStore } from "@/stores/useAuthStore";

const QUERY_KEY = ["notifications"];

export const useNotifications = () => {
  const { isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  // 1. Fetch exact notifications from your elegant API
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: notificationsApi.getNotifications,
    enabled: isAuthenticated,
    refetchInterval: 15000, // Poll every 15s to stay fresh across devices
  });

  // Filter to only show UNREAD notifications (so "seen" messages disappear)
  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const unreadCount = unreadNotifications.length;

  // 2. Mutations for instant UX interactions
  const markAsReadMutation = useMutation({
    mutationFn: (id: string | number) => notificationsApi.markAsRead(id),
    onMutate: async (id) => {
      // Optimistic Update for list
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });
      const previous = queryClient.getQueryData<any[]>(QUERY_KEY);
      if (previous) {
        queryClient.setQueryData(
          QUERY_KEY,
          previous.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
      }
      
      // Optimistic Update for Top Badge
      await queryClient.cancelQueries({ queryKey: ["notifications-unread-count"] });
      queryClient.setQueryData(["notifications-unread-count"], (prev: number) => Math.max(0, (prev || 0) - 1));

      return { previous };
    },
    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(QUERY_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["notifications-unread-count"] });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onMutate: async () => {
      // Optimistic Update for list
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });
      const previous = queryClient.getQueryData<any[]>(QUERY_KEY);
      if (previous) {
        queryClient.setQueryData(
          QUERY_KEY,
          previous.map((n) => ({ ...n, isRead: true }))
        );
      }

      // Optimistic Update for Top Badge
      await queryClient.cancelQueries({ queryKey: ["notifications-unread-count"] });
      queryClient.setQueryData(["notifications-unread-count"], 0);

      return { previous };
    },
    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(QUERY_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["notifications-unread-count"] });
    },
  });

  const handleMarkAllRead = () => {
    if (unreadCount > 0) {
      markAllReadMutation.mutate();
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.isRead) {
      markAsReadMutation.mutate(notification.id);
    }

    // Dynamic Routing based on notification
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    } else {
      const type = notification.type?.toLowerCase() || "";
      if (type.includes("message")) {
        router.push("/messages");
      } else if (type.includes("proposal") || type.includes("request")) {
        router.push("/requests");
      } else if (type.includes("project")) {
        router.push("/projects");
      } 
    }
  };

  return {
    unreadNotifications,
    unreadCount,
    isLoading,
    isMarkingAllRead: markAllReadMutation.isPending,
    handleMarkAllRead,
    handleNotificationClick,
  };
};
