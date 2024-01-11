import api from ".";

export const updateOrderStatus = async (
  orderId: number,
  data: { status: string; reason: string }
) => {
  try {
    const response = await api.patch(`/orders/${orderId}/status`, data);
    return response.data;
  } catch (error) {
    throw new Error("Error updating order status");
  }
};
