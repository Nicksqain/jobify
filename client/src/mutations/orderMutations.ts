// orderMutations.ts
import { useMutation, useQueryClient } from "react-query";
import { updateOrderStatus } from "../api/orderApi"; // замените на ваш реальный API файл

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { orderId: number; status: string; reason: string }) =>
      updateOrderStatus(data.orderId, {
        status: data.status,
        reason: data.reason,
      }),
    {
      onSuccess: () => {
        // После успешного выполнения мутации можно сбросить кэш запроса,
        // чтобы обновить данные в соответствии с изменениями
        queryClient.invalidateQueries(["orders"]);
      },
    }
  );
};
