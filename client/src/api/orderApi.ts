import api from ".";

export const createTaskResponse = async (
  orderId: number,
  data: {
    executionCost: number;
    executionDate: Date;
    message: string;
  }
) => {
  try {
    const response = await api.post(`/orders/${orderId}/response`, data);
    return response.data.ok;
  } catch (error) {
    throw new Error("Task response creating error");
  }
};

export const updateOrderStatus = async (
  orderId: number,
  data: {
    status: string;
    reason?: string | null;
    commentType?: string | null;
    moderatorCheckedBy?: string | null;
  }
) => {
  try {
    const response = await api.patch(`/orders/${orderId}/status`, data);
    return response.data;
  } catch (error) {
    throw new Error("Error updating order status");
  }
};
