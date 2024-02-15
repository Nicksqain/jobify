import { IOrder } from "./IOrder";

export interface IProject {
  name: string;
  shortDescription: string;
  orders: IOrder[];
}
