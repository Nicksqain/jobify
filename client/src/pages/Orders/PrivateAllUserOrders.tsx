import React, { useContext, useState, useEffect, FC } from "react";


import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ruLocale from 'dayjs/locale/ru';
import { useQuery } from "@tanstack/react-query";
import { fetchAllOrders } from "../../api/fetchData";
import LoadingToRedirect from "../../components/LoadingToRedirect";
import { useAppSelector } from "../../hooks/redux";
import { IOrder } from "../../models/IOrder";
import PublicOrder from "./AllOrders/PublicOrder/PublicOrder";
import PrivateOrder from "./AllOrders/PrivateOrder/PrivateOrder";
dayjs.locale(ruLocale);
dayjs.extend(customParseFormat)

interface PrivateAllUserOrdersProps {
      userId?: string
      queryCfg?: { [key: string]: any };
}
const PrivateAllUserOrders: FC<PrivateAllUserOrdersProps> = ({ userId, queryCfg }) => {
      const [fetchedOrders, setFetchedOrders] = useState<IOrder[]>([])

      const { user } = useAppSelector((state) => state.userSlice)
      const allOrders = useQuery<IOrder[]>({ queryKey: ["profileUserOrders", queryCfg], queryFn: () => fetchAllOrders(queryCfg) });

      return allOrders.isLoading ? (
            <LoadingToRedirect />
      ) : (
            <div className="all-orders">
                  {allOrders.data && allOrders.data?.length > 0 ? (
                        allOrders.data.map((el: IOrder, index) => (
                              <PrivateOrder
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

export default PrivateAllUserOrders;
