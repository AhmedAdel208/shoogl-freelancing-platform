import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
  HubConnectionState,
} from "@microsoft/signalr";

const isProduction = process.env.NODE_ENV === "production";
const HUB_URL = isProduction ? "/chatHub" : "https://shogol.runasp.net/chatHub";

let connection: HubConnection | null = null;

/** Read the JWT from wherever it's stored */
function getToken(): string {
  
  const direct = localStorage.getItem("token");
  if (direct) return direct;

  // Fallback: read from Zustand persist storage
  try {
    const raw = localStorage.getItem("auth-storage");
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed?.state?.token || "";
    }
  } catch { /* ignore parse errors */ }

  return "";
}

/** Build (or reuse) the SignalR connection with JWT auth */
function getConnection(): HubConnection {
  if (connection) return connection;

  connection = new HubConnectionBuilder()
    .withUrl(HUB_URL, {
      accessTokenFactory: () => getToken(),
    })
    .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
    .configureLogging(LogLevel.Warning)
    .build();

  return connection;
}

/** Start the hub if not already connected */
export async function startChatHub(): Promise<HubConnection> {
  const conn = getConnection();
  
  if (conn.state === HubConnectionState.Disconnected) {
    try {
      await conn.start();
      console.log("[SignalR] Connected ✓");
    } catch (err) {
      console.error("[SignalR] Connection failed:", err);
      // Don't throw to prevent crashing the app, just log
    }
  }
  return conn;
}

/** Stop the hub gracefully */
export async function stopChatHub(): Promise<void> {
  if (connection && 
      connection.state !== HubConnectionState.Disconnected && 
      connection.state !== HubConnectionState.Disconnecting) {
    try {
      await connection.stop();
      console.log("[SignalR] Disconnected");
    } catch (err) {
      console.warn("[SignalR] Stop failed:", err);
    }
  }
}

/** Subscribe to real-time events – returns unsubscribe cleanup fn */
export function onReceiveMessage(
  callback: (message: any) => void
): () => void {
  const conn = getConnection();
  // Listen on both event names — backend sends "messagesent"
  conn.on("ReceiveMessage", callback);
  conn.on("messagesent", callback);
  return () => {
    conn.off("ReceiveMessage", callback);
    conn.off("messagesent", callback);
  };
}

export function onUserOnline(
  callback: (userId: string) => void
): () => void {
  const conn = getConnection();
  const handler = (data: any) => {
    const id = typeof data === "object" ? data?.userId || data?.UserId || data?.id || data?.Id : data;
    if (id) callback(String(id).trim());
  };
  conn.on("UserOnline", handler);
  return () => conn.off("UserOnline", handler);
}

export function onUserOffline(
  callback: (userId: string) => void
): () => void {
  const conn = getConnection();
  const handler = (data: any) => {
    const id = typeof data === "object" ? data?.userId || data?.UserId || data?.id || data?.Id : data;
    if (id) callback(String(id).trim());
  };
  conn.on("UserOffline", handler);
  return () => conn.off("UserOffline", handler);
}

export function onUserTyping(
  callback: (data: { conversationId: number; userId: string; isTyping: boolean }) => void
): () => void {
  const conn = getConnection();
  const handler = (data: any) => {
    const conversationId = data?.conversationId || data?.ConversationId;
    const userId = data?.userId || data?.UserId;
    const isTyping = data?.isTyping || data?.IsTyping;
    if (conversationId && userId) {
      callback({ conversationId, userId: String(userId).trim(), isTyping: !!isTyping });
    }
  };
  conn.on("UserTyping", handler);
  return () => conn.off("UserTyping", handler);
}

/** Join a specific conversation group (required for typing/read receipts) */
export async function joinConversation(conversationId: number) {
  const conn = getConnection();
  if (conn.state === HubConnectionState.Connected) {
    try {
      await conn.invoke("JoinConversation", conversationId);
    } catch (err) {
      console.warn("[SignalR] Failed to join conversation:", err);
    }
  }
}

/** Leave a specific conversation group */
export async function leaveConversation(conversationId: number) {
  const conn = getConnection();
  if (conn.state === HubConnectionState.Connected) {
    try {
      await conn.invoke("LeaveConversation", conversationId);
    } catch (err) {
      console.warn("[SignalR] Failed to leave conversation:", err);
    }
  }
}

/** Indicate typing status to others in the conversation */
export async function sendTypingEvent(conversationId: number, isTyping: boolean) {
  const conn = getConnection();
  if (conn.state === HubConnectionState.Connected) {
    try {
      await conn.invoke("UserTyping", conversationId, isTyping);
    } catch (err) {
      // Best-effort, swallow if backend method name differs
      console.debug("[SignalR] Typing event not supported by backend:", err);
    }
  }
}

/** Check online status via hub invocation */
export async function checkUserOnlineStatus(userId: string): Promise<boolean> {
  const conn = getConnection();
  if (conn.state === HubConnectionState.Connected) {
    try {
      return await conn.invoke("CheckUserOnlineStatus", userId);
    } catch (err) {
      console.warn("[SignalR] Failed to check status:", err);
    }
  }
  return false;
}

export function onMessageRead(
  callback: (conversationId: number) => void
): () => void {
  const conn = getConnection();
  conn.on("MessageRead", callback);
  return () => conn.off("MessageRead", callback);
}
