// use allOrders.ts
import { useQuery } from "@tanstack/react-query";
import { IOrder } from "../models/IOrder";
import { fetchAllOrders, fetchAllUserOrders } from "../api/fetchData";
import { useAppDispatch, useAppSelector } from "./redux";
import { setAllOrders, setAllUserOrders } from "../slices/order.slice";
import { AppDispatch } from "../store/store";
import { useEffect } from "react";

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
    isSuccess: isAllOrdersSuccess,
  } = useQuery<IOrder[]>({
    queryKey: ["orders"],
    queryFn: () => fetchAllOrders(queryCfg),
  });
  useEffect(() => {
    if (isAllOrdersSuccess) {
      dispatch(setAllOrders(allOrders as IOrder[]));
    }
  }, [isAllOrdersSuccess]);
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
    isSuccess: isAllUserOrdersSuccess,
  } = useQuery<IOrder[]>({
    queryKey: ["userOrders", user?.id],
    queryFn: () => fetchAllUserOrders(user?.id ?? "", queryCfg),
    staleTime: 0,
  });
  useEffect(() => {
    if (isAllUserOrdersSuccess) {
      dispatch(setAllUserOrders(orders as IOrder[]));
    }
  }, [isAllUserOrdersSuccess]);
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
