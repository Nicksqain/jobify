import React, { useContext, useState, useEffect, FC } from "react";


import Order from "./Order/Order";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ruLocale from 'dayjs/locale/ru';
import LoadingToRedirect from "../../../components/LoadingToRedirect";
import useOrders from "../../../hooks/orders";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { IOrder } from "../../../models/IOrder";
import PublicOrder from "./PublicOrder/PublicOrder";
import { useQuery } from "@tanstack/react-query";
import { fetchAllOrders } from "../../../api/fetchData";
import { Heading } from "@chakra-ui/react";
dayjs.locale(ruLocale);
dayjs.extend(customParseFormat)

interface PublicAllUserOrdersProps {
      userId?: string
      queryCfg?: { [key: string]: any };
}
const PublicAllUserOrders: FC<PublicAllUserOrdersProps> = ({ userId, queryCfg }) => {
      const [fetchedOrders, setFetchedOrders] = useState<IOrder[]>([])

      const { user } = useAppSelector((state) => state.userSlice)
      const allOrders = useQuery<IOrder[]>({ queryKey: ["profileUserOrders"], queryFn: () => fetchAllOrders(queryCfg) });

      return allOrders.isLoading ? (
            <LoadingToRedirect />
      ) : (
            <div className="all-orders">
                  {allOrders.data && allOrders.data?.length > 0 ? (
                        allOrders.data.map((el: IOrder, index) => (
                              <PublicOrder
                                    id={el.id}
                                    key={index}
                                    title={el.orderName}
                                    description={el.description}
                                    status={el.status}
                                    role={user ? user?.status : ""}
                                    author={el.user.fullname}
                                    budget={[el.budgetMin, el.budgetMax]}
                                    servicePlace={el.placeOfService}
                                    createdAt={dayjs(el.createdAt, { format: 'YYYY-MM-DD' }).format('D MMMM YYYY')}
                              />
                        ))
                  ) : (
                        <p>Нет доступных заказов.</p>
                  )}
            </div>
      );

};

export default PublicAllUserOrders;
