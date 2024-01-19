export interface INotification {
  id?: number;
  message?: string;
  reason?: string;
  source?: string;
  type?: string;
  object?: string;
  subject?: string;
  isRead?: boolean;
  userId?: string;
  createdAt?: Date;
}
