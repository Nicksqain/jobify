import React, { useContext, useState, useEffect } from "react";


import Order from "./Order/Order";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ruLocale from 'dayjs/locale/ru';
import LoadingToRedirect from "../../../components/LoadingToRedirect";
import useOrders from "../../../hooks/orders";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { IOrder } from "../../../models/IOrder";
dayjs.locale(ruLocale);
dayjs.extend(customParseFormat)

const AllUserOrders = () => {

  const dispatch = useAppDispatch()
  const { allUserOrders } = useOrders(dispatch)
  const { user } = useAppSelector((state) => state.userSlice)

  return allUserOrders.isLoading ? (<LoadingToRedirect />) : (
    <div className="all-orders">
      {allUserOrders.data?.map((el: IOrder, index) => (
        <Order
          id={el.id}
          key={index}
          title={el.orderName}
          description={el.description}
          status={el.status}
          role={user ? user?.status : ""}
          author={el.user.fullname}
          budget={[el.budgetMin, el.budgetMax]}
          servicePlace={el.placeOfService}
          createdAt={dayjs(el.createdAt, { format: 'YYYY-MM-DD' }).format('D MMMM YYYY')} />
      ))}

    </div>
  );
};

export default AllUserOrders;
