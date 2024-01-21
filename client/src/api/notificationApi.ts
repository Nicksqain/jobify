import api from "./";

export const markNotificationAsRead = (notificationId: number) =>
  api
    .patch(`/notifications/${notificationId}`)
    .then((response) => response.data);
