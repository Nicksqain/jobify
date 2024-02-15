import api from ".";

export const fetchProjects = () =>
  api.get(`/projects`).then((response) => response.data);

export const fetchUserProjects = async (userId: string) =>
  api.get(`/projects/${userId}`).then((response) => response.data);

export const createProject = async (data: {
  name: string;
  shortDescription: string;
  orderIds: number[];
}) => {
  try {
    const response = await api.post(`/projects`, data);
    return response.data.ok;
  } catch (error) {
    throw new Error("Task response creating error");
  }
};
