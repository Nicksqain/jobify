// orderMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../api/orderApi"; // замените на ваш реальный API файл

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      orderId: number;
      status: string;
      reason?: string | null;
      commentType?: string | null;
      moderatorCheckedBy?: string | null;
    }) =>
      updateOrderStatus(data.orderId, {
        status: data.status,
        reason: data.reason,
        commentType: data.commentType,
        moderatorCheckedBy: data.moderatorCheckedBy,
      }),

    onSettled: () => {
      // После успешного выполнения мутации можно сбросить кэш запроса,
      // чтобы обновить данные в соответствии с изменениями
      queryClient.invalidateQueries({ queryKey: ["orders", "userOrders"] });
    },
  });
};
