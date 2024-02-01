import api from "./";

export const fetchAllOrders = (queryCfg?: { [key: string]: any }) => {
  const params = new URLSearchParams(queryCfg).toString();
  const queryParams = params ? `?${params}` : "";
  return api.get(`/orders/${queryParams}`).then((response) => response.data);
};

export const fetchAllUserOrders = (
  userId: string,
  queryCfg?: { [key: string]: any }
) => {
  const params = new URLSearchParams(queryCfg).toString();
  const queryParams = params ? `?${params}` : "";
  return api
    .get(`/orders/${userId}${queryParams}`)
    .then((response) => response.data);
};

export const fetchAllUserNotifications = (userId: string) =>
  api.get(`/notifications/${userId}`).then((response) => response.data);
