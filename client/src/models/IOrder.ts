interface User {
  fullname: string;
}
export interface IOrder {
  id: number;
  orderName: string;
  category: string;
  placeOfService: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  agreedBudget: number | null;
  createdAt: string;
  updatedAt: string;
  moderationComment: string | null;
  status: string;
  startExecutionDate: string;
  completionDate: string;
  plannedCompletionDate: string | null;
  userId: string;
  user: User;
}
