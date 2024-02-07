import React, { useContext, useState, useEffect } from "react";


import Order from "./Order/Order";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ruLocale from 'dayjs/locale/ru';
import LoadingToRedirect from "../../../components/LoadingToRedirect";
import useOrders from "../../../hooks/orders";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { IOrder } from "../../../models/IOrder";
dayjs.locale(ruLocale);
dayjs.extend(customParseFormat)

const AllOrders = () => {

      // CONTEXT
      const authContext = useContext(AuthContext);
      const auth = authContext?.auth;

      const dispatch = useAppDispatch()
      const { allOrders } = useOrders(dispatch)
      const { user } = useAppSelector(state => state.userSlice)
      return allOrders.isLoading ? (<LoadingToRedirect />) : (
            <div className="all-orders">
                  {allOrders.data && allOrders.data.map((el: IOrder, index) => (
                        <Order
                              id={el.id}
                              isUserOrder={user?.id === el.userId}
                              key={index}
                              title={el.orderName}
                              status={el.status}
                              description={el.description}
                              role={auth ? auth?.user?.status : ""}
                              author={el.user.fullname}
                              budget={[el.budgetMin, el.budgetMax]}
                              servicePlace={el.placeOfService}
                              createdAt={dayjs(el.createdAt, { format: 'YYYY-MM-DD' }).format('D MMMM YYYY')} />
                  ))}

            </div>
      );
};

export default AllOrders;
