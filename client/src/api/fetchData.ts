import api from "./";

export const fetchAllOrders = () =>
  api.get("/orders").then((response) => response.data);

export const fetchAllUserOrders = (userId: string) =>
  api.get(`/orders/${userId}`).then((response) => response.data);

export const fetchAllUserNotifications = (userId: string) =>
  api.get(`/notifications/${userId}`).then((response) => response.data);
