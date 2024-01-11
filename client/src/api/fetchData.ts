import api from "./";

export const fetchAllOrders = () =>
  api.get("/orders").then((response) => response.data);

export const fetchAllUserOrders = (userId: string) =>
  api.get(`/orders/${userId}`).then((response) => response.data);
