import * as signalR from '@microsoft/signalr';

export interface NotificationHub {
  onReceiveNotification: (notification: any) => void;
  onNotificationRead: (notificationId: string) => void;
  onNotificationDeleted: (notificationId: string) => void;
}

class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;

  async startConnection(): Promise<void> {
    try {
      const token = localStorage.getItem('token'); // Get auth token
      const isProduction = process.env.NODE_ENV === "production";
      const hubUrl = isProduction ? "/notificationHub" : "https://shogol.runasp.net/notificationHub";
      
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl, {
          accessTokenFactory: () => token || '',
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: retryContext => {
            if (retryContext.previousRetryCount < this.maxReconnectAttempts) {
              return this.reconnectDelay;
            }
            return null;
          }
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();

      // Setup event handlers
      this.setupEventHandlers();

      // Start connection
      await this.connection.start();
      console.log('SignalR Connected');
      
      this.reconnectAttempts = 0;
    } catch (error) {
      console.error('SignalR Connection Error:', error);
      this.handleReconnect();
    }
  }

  private setupEventHandlers(): void {
    if (!this.connection) return;

    this.connection.onreconnecting(error => {
      console.log('SignalR Reconnecting...', error);
    });

    this.connection.onreconnected(connectionId => {
      console.log('SignalR Reconnected', connectionId);
      this.reconnectAttempts = 0;
    });

    this.connection.onclose(error => {
      console.log('SignalR Disconnected', error);
      this.handleReconnect();
    });
  }

  private async handleReconnect(): Promise<void> {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(async () => {
        try {
          await this.startConnection();
        } catch (error) {
          console.error('Reconnect failed:', error);
        }
      }, this.reconnectDelay);
    } else {
      console.error('Max reconnect attempts reached');
    }
  }

  async stopConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
    }
  }

  // Hub methods
  onReceiveNotification(callback: (notification: any) => void): void {
    if (this.connection) {
      this.connection.on('ReceiveNotification', callback);
    }
  }

  onNotificationRead(callback: (notificationId: string) => void): void {
    if (this.connection) {
      this.connection.on('NotificationRead', callback);
    }
  }

  onNotificationDeleted(callback: (notificationId: string) => void): void {
    if (this.connection) {
      this.connection.on('NotificationDeleted', callback);
    }
  }

  // Remove listeners
  offReceiveNotification(callback?: (notification: any) => void): void {
    if (this.connection) {
      if (callback) {
        this.connection.off('ReceiveNotification', callback);
      } else {
        this.connection.off('ReceiveNotification');
      }
    }
  }

  offNotificationRead(callback?: (notificationId: string) => void): void {
    if (this.connection) {
      if (callback) {
        this.connection.off('NotificationRead', callback);
      } else {
        this.connection.off('NotificationRead');
      }
    }
  }

  offNotificationDeleted(callback?: (notificationId: string) => void): void {
    if (this.connection) {
      if (callback) {
        this.connection.off('NotificationDeleted', callback);
      } else {
        this.connection.off('NotificationDeleted');
      }
    }
  }

  // Invoke hub methods
  async markAsRead(notificationId: string): Promise<void> {
    if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
      try {
        await this.connection.invoke('MarkAsRead', notificationId);
      } catch (error) {
        console.error('Error marking notification as read via SignalR:', error);
        throw error;
      }
    }
  }

  async deleteNotification(notificationId: string): Promise<void> {
    if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
      try {
        await this.connection.invoke('DeleteNotification', notificationId);
      } catch (error) {
        console.error('Error deleting notification via SignalR:', error);
        throw error;
      }
    }
  }

  async markAllAsRead(): Promise<void> {
    if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
      try {
        await this.connection.invoke('MarkAllAsRead');
      } catch (error) {
        console.error('Error marking all notifications as read via SignalR:', error);
        throw error;
      }
    }
  }

  getConnectionState(): signalR.HubConnectionState {
    return this.connection?.state || signalR.HubConnectionState.Disconnected;
  }

  isConnected(): boolean {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }
}

export const signalRService = new SignalRService();
