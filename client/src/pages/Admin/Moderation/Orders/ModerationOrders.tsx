
import React, { FC, useContext, useState, useEffect } from "react";



import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ruLocale from 'dayjs/locale/ru';
import { useQuery } from "react-query";
import LoadingToRedirect from "../../../../components/LoadingToRedirect";
import { AuthContext } from "../../../../context/authContext";
import Order from "../../../Orders/AllOrders/Order/Order";

dayjs.locale(ruLocale);
dayjs.extend(customParseFormat)
interface ModerationOrdersProps {

}

const ModerationOrders: FC<ModerationOrdersProps> = ({ }) => {
      // CONTEXT
      const authContext = useContext(AuthContext);
      const auth = authContext?.auth;
      const [orders, setOrders] = useState([])

      const { isLoading, error, data } = useQuery('allPendingOrders', async () => {
            const response = await axios.get(`${import.meta.env.VITE_APP_API}/orders?status=pending_approval`);
            return response.data;
      });
      // const { data } = await axios.get(`${import.meta.env.VITE_APP_API}/orders`)

      useEffect(() => {
            if (data) {
                  setOrders(data);
            }
      }, [data]);
      useEffect(() => {
            console.log(orders)
      }, [orders])
      return isLoading ? (<LoadingToRedirect />) : (
            <div className="Moderation">
                  <h1>Модерация заказов</h1>
                  <div className="all-orders">
                        {orders && orders.map((el: any, index) => (
                              <Order
                                    isUserOrder={false}
                                    key={index}
                                    title={el.orderName}
                                    description={el.description}
                                    role={auth ? auth?.user?.status : ""}
                                    author={el.user.fullname}
                                    budget={[el.budgetMin, el.budgetMax]}
                                    servicePlace={el.placeOfService}
                                    createdAt={dayjs(el.createdAt, { format: 'YYYY-MM-DD' }).format('D MMMM YYYY в H:mm')} />
                        ))}

                  </div>
            </div>
      );
}

export default ModerationOrders;