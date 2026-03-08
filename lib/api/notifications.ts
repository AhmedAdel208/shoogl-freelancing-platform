import { apiClient } from "./apiClient";
import { Notification } from "@/types/notification";

const BASE = "/Notification";

export const notificationsApi = {
  /** Get all notifications */
  getNotifications: async (): Promise<Notification[]> => {
    try {
      const { data } = await apiClient.get(BASE);
      // The API returns an array directly, or an object containing items
      const raw = Array.isArray(data) ? data : data.notifications || data.items || data || [];
      return Array.isArray(raw) ? raw : [];
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      return [];
    }
  },

  /** Get unread count */
  getUnreadCount: async (): Promise<number> => {
    try {
      const { data } = await apiClient.get(`${BASE}/unread-count`);
      return typeof data === 'number' ? data : data.count || data.unreadCount || 0;
    } catch {
      return 0;
    }
  },

  /** Mark notification as read */
  markAsRead: async (notificationId: string | number): Promise<void> => {
    await apiClient.post(`${BASE}/${notificationId}/mark-read`);
  },

  /** Mark all as read */
  markAllAsRead: async (): Promise<void> => {
    await apiClient.post(`${BASE}/mark-all-read`);
  },
};
