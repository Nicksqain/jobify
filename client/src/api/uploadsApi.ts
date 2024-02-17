import api from ".";

export const uploadProfileAvatar = async (userId: string, formData: FormData) =>
  api
    .post(`/uploads/avatar/${userId}`, formData)
    .then((response) => response.data);

export const fetchAvatarUrl = (userId: string) =>
  api.get(`/uploads/avatar/${userId}`).then((response) => response.data);
