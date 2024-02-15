import api from ".";

export const fetchOutgoingResponses = async (userId: string) =>
  api.get(`/responses/outgoing/${userId}`).then((response) => response.data);

export const fetchIncomingResponses = async (userId: string) =>
  api.get(`/responses/incoming/${userId}`).then((response) => response.data);
