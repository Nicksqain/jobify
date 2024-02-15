import { IOrder } from "./IOrder";
import { IUser } from "./IUser";

export interface IResponse {
  executionCost: number;
  executionDate: string | Date;
  message: string;
  createdAt: string | Date;
  accepted: false;
  orderId?: number;
  userId?: string;
  order: IOrder;
  User: IUser;
}
