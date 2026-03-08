"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "@/lib/api/chat";
import {
  startChatHub,
  onReceiveMessage,
  onUserOnline,
  onUserOffline,
  onMessageRead,
} from "@/lib/signalr/chatHub";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "@/common/toast";

const QUERY_KEYS = {
  conversations: ["chat-conversations"] as const,
  messages: (id: number) => ["chat-messages", id] as const,
  onlineUsers: ["chat-online-users"] as const,
};

export function useChat() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuthStore();
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [isTyping, setIsTyping] = useState<Record<number, boolean>>({});
  const hubStartedRef = useRef(false);

  // Ref always tracks the latest selected conversation (avoids stale closures)
  const selectedIdRef = useRef<number | null>(null);
  useEffect(() => {
    selectedIdRef.current = selectedConversationId;
  }, [selectedConversationId]);

  // ─── SignalR Connection (runs ONCE per auth session) ────────
  useEffect(() => {
    if (!isAuthenticated) return;

    let token: string | null = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
      if (!token) {
        try {
          const raw = localStorage.getItem("auth-storage");
          if (raw) token = JSON.parse(raw)?.state?.token || null;
        } catch {
          /* ignore */
        }
      }
    }
    if (!token) return;

    const cleanups: (() => void)[] = [];

    const bootstrap = async () => {
      try {
        const { onUserTyping } = await import("@/lib/signalr/chatHub");
        await startChatHub();
        hubStartedRef.current = true;

        // New message received
        cleanups.push(
          onReceiveMessage(() => {
            const activeId = selectedIdRef.current;
            if (activeId) {
              // User is viewing this chat → refresh messages + auto mark-as-read
              queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.messages(activeId),
              });
              chatApi
                .markAsRead(activeId)
                .then(() =>
                  queryClient.refetchQueries({
                    queryKey: QUERY_KEYS.conversations,
                  }),
                )
                .catch(() => {});
            } else {
              // User is NOT in a chat → just refresh conversations for badge
              queryClient.refetchQueries({
                queryKey: QUERY_KEYS.conversations,
              });
            }
          }),
        );

        // Online / Offline
        cleanups.push(
          onUserOnline((userId) => {
            const id = String(userId).toLowerCase();
            setOnlineUsers((prev) => {
              const n = new Set(prev);
              n.add(id);
              return n;
            });
          }),
        );
        cleanups.push(
          onUserOffline((userId) => {
            const id = String(userId).toLowerCase();
            setOnlineUsers((prev) => {
              const n = new Set(prev);
              n.delete(id);
              return n;
            });
          }),
        );

        // Typing indicator
        cleanups.push(
          onUserTyping((data) => {
            if (data.userId.toLowerCase() === user?.id?.toLowerCase()) return;
            setIsTyping((prev) => ({
              ...prev,
              [data.conversationId]: data.isTyping,
            }));
            if (data.isTyping) {
              setOnlineUsers((prev) => {
                const n = new Set(prev);
                n.add(data.userId.toLowerCase());
                return n;
              });
            }
          }),
        );

        // Message read receipts
        cleanups.push(
          onMessageRead((convId) => {
            queryClient.invalidateQueries({
              queryKey: QUERY_KEYS.messages(convId),
            });
            queryClient.refetchQueries({ queryKey: QUERY_KEYS.conversations });
          }),
        );
      } catch {
        /* connection error – silent */
      }
    };

    bootstrap();
    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [isAuthenticated, queryClient, user?.id]);

  // ─── Join / Leave conversation group (lightweight, no re-connect) ──
  useEffect(() => {
    if (!isAuthenticated || !selectedConversationId || !hubStartedRef.current)
      return;
    let mounted = true;

    (async () => {
      try {
        const { joinConversation } = await import("@/lib/signalr/chatHub");
        if (mounted) joinConversation(selectedConversationId);
      } catch {
        /* ignore */
      }
    })();

    return () => {
      mounted = false;
    };
  }, [selectedConversationId, isAuthenticated]);

  // ─── REST Queries ─────────────────────────────────────────────
  const conversationsQuery = useQuery({
    queryKey: QUERY_KEYS.conversations,
    queryFn: chatApi.getConversations,
    enabled: isAuthenticated,
    refetchInterval: 30_000,
    staleTime: 0,
  });

  const messagesQuery = useQuery({
    queryKey: QUERY_KEYS.messages(selectedConversationId!),
    queryFn: () => chatApi.getMessages(selectedConversationId!),
    enabled: isAuthenticated && selectedConversationId !== null,
  });

  const onlineUsersQuery = useQuery({
    queryKey: QUERY_KEYS.onlineUsers,
    queryFn: chatApi.getOnlineUsers,
    enabled: isAuthenticated,
    refetchInterval: 60_000,
  });

  const conversations = Array.isArray(conversationsQuery.data)
    ? conversationsQuery.data
    : [];
  const messages = Array.isArray(messagesQuery.data) ? messagesQuery.data : [];
  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId,
  );

  // ─── Mutations ────────────────────────────────────────────────
  const sendMutation = useMutation({
    mutationFn: ({
      receiverId,
      content,
      attachment,
    }: {
      receiverId: string;
      content: string;
      attachment?: File;
    }) => chatApi.sendMessage(receiverId, content, attachment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.conversations });
      if (selectedIdRef.current) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.messages(selectedIdRef.current),
        });
      }
    },
  });

  const markReadMutation = useMutation({
    mutationFn: (conversationId: number) => chatApi.markAsRead(conversationId),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.conversations });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (conversationId: number) =>
      chatApi.deleteConversation(conversationId),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.conversations });
      setSelectedConversationId(null);
      toast.success("تم حذف المحادثة بنجاح");
    },
    onError: () => {
      toast.error("فشل في حذف المحادثة. حاول مرة أخرى.");
    },
  });

  // ─── Sync online status from API ──────────────────────────────
  useEffect(() => {
    if (onlineUsersQuery.data) {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        onlineUsersQuery.data.forEach((id: string) =>
          next.add(String(id).toLowerCase()),
        );
        return next;
      });
    }
  }, [onlineUsersQuery.data]);

  // Sync online from conversation data
  useEffect(() => {
    if (conversations.length > 0) {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        let changed = false;
        conversations.forEach((c) => {
          if (c.isOnline) {
            const id = String(c.otherUserId).toLowerCase();
            if (!next.has(id)) {
              next.add(id);
              changed = true;
            }
          }
        });
        return changed ? next : prev;
      });
    }
  }, [conversations]);

  // ─── Auto-select from URL param (?user=xxx) ───────────────────
  const handledUserParams = useRef(new Set<string>());
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);

  useEffect(() => {
    const userToChatId = searchParams.get("user");
    if (userToChatId) {
      const paramLower = userToChatId.toLowerCase();
      // Don't allow chatting with yourself
      if (paramLower === user?.id?.toLowerCase()) return;

      if (!handledUserParams.current.has(paramLower)) {
        const target = conversations.find(
          (c) => String(c.otherUserId).toLowerCase() === paramLower,
        );
        if (target) {
          handledUserParams.current.add(paramLower);
          setSelectedConversationId(target.id);
          markReadMutation.mutate(target.id);
        } else if (conversationsQuery.isSuccess) {
          // Only set as pending if we've actually loaded conversations and verified 
          // that this user isn't one of them.
          handledUserParams.current.add(paramLower);
          setPendingUserId(paramLower);
        }
      }
    }
  }, [searchParams, conversations, conversationsQuery.isSuccess, user?.id]);

  // Auto mark-as-read when viewing a conversation with unread messages
  useEffect(() => {
    if (selectedConversationId && messages.length > 0) {
      if (
        selectedConversation?.unreadCount &&
        selectedConversation.unreadCount > 0
      ) {
        markReadMutation.mutate(selectedConversationId);
      }
    }
  }, [
    selectedConversationId,
    messages.length,
    selectedConversation?.unreadCount,
  ]);

  // ─── Actions ──────────────────────────────────────────────────
  const selectConversation = useCallback(
    async (id: number) => {
      const { joinConversation, leaveConversation } =
        await import("@/lib/signalr/chatHub");
      if (selectedIdRef.current) leaveConversation(selectedIdRef.current);
      setSelectedConversationId(id);
      joinConversation(id);
      // Mark as read immediately
      chatApi
        .markAsRead(id)
        .then(() =>
          queryClient.refetchQueries({ queryKey: QUERY_KEYS.conversations }),
        )
        .catch(() => {});
    },
    [queryClient],
  );

  const sendMessage = useCallback(
    (receiverId: string, content: string, attachment?: File) => {
      if (!content.trim() && !attachment) return;
      sendMutation.mutate({ receiverId, content, attachment });
    },
    [sendMutation],
  );

  const deleteConversation = useCallback(
    (conversationId: number) => {
      deleteMutation.mutate(conversationId);
    },
    [deleteMutation],
  );

  const refetchConversations = useCallback(() => {
    queryClient.refetchQueries({ queryKey: QUERY_KEYS.conversations });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.onlineUsers });
  }, [queryClient]);

  const sendTypingStatus = useCallback((status: boolean) => {
    const id = selectedIdRef.current;
    if (!id) return;
    import("@/lib/signalr/chatHub").then(({ sendTypingEvent }) => {
      sendTypingEvent(id, status);
    });
  }, []);

  return {
    conversations,
    messages,
    selectedConversation,
    selectedConversationId,
    pendingUserId,
    onlineUsers,
    isTyping: selectedConversationId ? isTyping[selectedConversationId] : false,
    currentUserId: user?.id ?? null,
    currentUserImage: (user as any)?.profilePictureUrl ?? undefined,
    isLoadingConversations:
      conversationsQuery.isLoading && conversations.length === 0,
    isFetchingConversations: conversationsQuery.isFetching,
    isLoadingMessages: messagesQuery.isLoading,
    isFetchingMessages: messagesQuery.isFetching,
    isInitialLoading:
      conversationsQuery.isLoading && conversations.length === 0,
    isSending: sendMutation.isPending,
    selectConversation,
    sendMessage,
    refetchConversations,
    sendTypingStatus,
    deleteConversation,
    isDeleting: deleteMutation.isPending,
    clearPendingUser: () => setPendingUserId(null),
  };
}
