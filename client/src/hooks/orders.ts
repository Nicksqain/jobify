// use allOrders.ts
import { useQuery } from "react-query";
import { IOrder } from "../models/IOrder";
import { fetchAllOrders, fetchAllUserOrders } from "../api/fetchData";
import { useAppDispatch, useAppSelector } from "./redux";
import { setAllOrders, setAllUserOrders } from "../slices/order.slice";
import { AppDispatch } from "../store/store";

export default function useOrders(
  dispatch: AppDispatch,
  userId?: string,
  queryCfg?: { [key: string]: any }
) {
  // All orders
  //   load all orders from state
  const { allOrders: allOrdersFromRedux } = useAppSelector(
    (state) => state.orderSlice
  );

  const {
    data: allOrders,
    isLoading: isLoadingAllOrders,
    isError: isAllOrdersError,
  } = useQuery<IOrder[]>(["orders"], () => fetchAllOrders(queryCfg), {
    cacheTime: 0,
    onSuccess: (data) => {
      dispatch(setAllOrders(data));
    },
  });

  //   All user orders
  //   load user orders from state
  const { allUserOrders: allUserOrdersFromRedux } = useAppSelector(
    (state) => state.orderSlice
  );
  const { user } = useAppSelector((state) => state.userSlice);

  const {
    data: orders,
    isLoading: isLoadingUserOrders,
    isError: isUserOrdersError,
  } = useQuery<IOrder[]>(
    ["userOrders", user?.id],
    () => fetchAllUserOrders(user?.id ?? "", queryCfg),
    {
      cacheTime: 0,
      onSuccess: (data) => {
        dispatch(setAllUserOrders(data));
      },
    }
  );
  return {
    allOrders: {
      data: allOrders || allOrdersFromRedux,
      isLoading: isLoadingAllOrders,
      isError: isAllOrdersError,
    },
    allUserOrders: {
      data: orders || allUserOrdersFromRedux,
      isLoading: isLoadingUserOrders,
      isError: isUserOrdersError,
    },
  };
}
