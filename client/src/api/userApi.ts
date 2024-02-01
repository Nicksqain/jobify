import api from ".";

export const fetchUserInfo = (userId: string) =>
  api.get(`/users/${userId}`).then((response) => response.data);
