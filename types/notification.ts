export interface Notification {
  id: string | number;  
  title: string;
  message: string;
  type: 'project' | 'message' | 'review' | 'system' | 'payment' | 'JobCompleted' | 'ProposalReceived' | 'JobRequestCreated';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  relatedEntityId?: number;
  relatedEntityType?: string;
}

export interface NotificationsResponse {
  success: boolean;
  data: Notification[];
  message?: string;
}
