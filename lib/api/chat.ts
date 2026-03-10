import { apiClient } from "./apiClient";
import type { ChatMessage, Conversation } from "@/types/chat";

const BASE = "/chat";

export const chatApi = {
  /** Get all conversations with robust mapping for online status and user IDs */
  getConversations: async (): Promise<Conversation[]> => {
    try {
      const { data } = await apiClient.get(`${BASE}/conversations`);
      const raw = Array.isArray(data) ? data : data.conversations || data.items || [];
      
      return raw.map((c: any) => {
        const otherUserId = (c.otherUserId || c.OtherUserId || c.participantId || "").toLowerCase();
        return {
          id: c.id || c.Id,
          otherUserId,
          otherUserName: c.otherUserName || c.OtherUserName || c.participantName,
          otherUserImage: c.otherUserAvatar || c.OtherUserAvatar || c.otherUserImage,
          lastMessage: c.lastMessage || c.LastMessage,
          lastMessageTime: c.lastMessageAt || c.LastMessageAt || c.lastMessageDate,
          unreadCount: c.unreadCount || c.UnreadCount || 0,
          isOnline: c.isOnline || c.IsOnline || false,
        };
      });
    } catch (err) {
      console.error("Failed to get conversations:", err);
      return [];
    }
  },

  /** Get messages with robust mapping */
  getMessages: async (
    conversationId: number,
    pageNumber = 1,
    pageSize = 50
  ): Promise<ChatMessage[]> => {
    try {
      const { data } = await apiClient.get(
        `${BASE}/conversations/${conversationId}/messages`,
        { params: { pageNumber, pageSize } }
      );
      const raw = Array.isArray(data) ? data : data.messages || data.items || [];

      return raw.map((m: any) => ({
        id: m.id || m.Id,
        conversationId: m.conversationId || m.ConversationId,
        senderId: (m.senderId || m.SenderId || "").toLowerCase(),
        senderName: m.senderName || m.SenderName,
        senderAvatar: m.senderAvatar || m.SenderAvatar,
        content: m.content || m.Content,
        fileUrl: m.fileUrl || m.FileUrl || m.attachmentUrl,
        fileName: m.fileName || m.FileName,
        sentAt: m.sentAt || m.SentAt || m.createdAt,
        isRead: m.isRead || m.IsRead || false,
      }));
    } catch (err) {
      console.error("Failed to get messages:", err);
      return [];
    }
  },

  /** Send a message */
  sendMessage: async (
    receiverId: string,
    content: string,
    attachment?: File
  ): Promise<ChatMessage> => {
    const formData = new FormData();
    formData.append("ReceiverId", receiverId);
    if (content) formData.append("Content", content);
    if (attachment) formData.append("Attachment", attachment);

    const { data } = await apiClient.post(`${BASE}/send`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  /** Mark all messages in a conversation as read */
  markAsRead: async (conversationId: number): Promise<void> => {
    await apiClient.post(`${BASE}/conversations/${conversationId}/mark-read`);
  },



  /** Check if a specific user is online */
  getUserOnlineStatus: async (userId: string): Promise<boolean> => {
    const { data } = await apiClient.get(`${BASE}/user/${userId}/online-status`);
    return !!(data?.isOnline || data?.IsOnline || data);
  },

  /** Get all currently online users */
  getOnlineUsers: async (): Promise<string[]> => {
    try {
      const { data } = await apiClient.get(`${BASE}/online-users`);
 
      if (data && typeof data === "object" && "onlineUsers" in data) {
        return (data as any).onlineUsers || [];
      }
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },
};

