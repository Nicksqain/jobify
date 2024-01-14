export interface INotification {
  id: number;
  message: string;
  isRead: boolean;
  userId: string;
  createdAt: Date;
}
