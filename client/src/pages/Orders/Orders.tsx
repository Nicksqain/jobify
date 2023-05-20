import React, { FC, useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext';
import { NavLink } from 'react-router-dom';
import Tabs from '../../components/ui/Tabs/Tabs';
import Tab from '../../components/ui/Tabs/Tab';
import AllOrders from './AllOrders/AllOrders';
import './orders.scss';
interface OrdersProps {

}

const Orders: FC<OrdersProps> = ({ }) => {
      const [orderer, setOrderer] = useState(false);
      // CONTEXT
      const authContextValue = useContext(AuthContext);
      const auth = authContextValue?.auth;
      //   STATE
      const [freelancer, setFreelancer] = useState(false);
      useEffect(() => {
            // CHECKING STATUS
            switch (auth?.user?.status) {
                  case "freelancer":
                        setFreelancer(true);
                        break;
                  case "orderer":
                        setOrderer(true);
                        break;
            }
      }, [auth?.user?.status]);
      return (
            <div>
                  <div className="orders min-container">
                        <div className="orders-search">
                              {freelancer && (
                                    <>
                                          <span>Найти задание для выполнения заказа</span>
                                          <button>Find a task</button>
                                    </>
                              )}
                              {orderer && (
                                    <>
                                          <span>Создайте заказ и выберите исполнителя</span>
                                          <NavLink to="/create">
                                                <button>Create a task</button>
                                          </NavLink>
                                    </>
                              )}
                        </div>
                  </div>
                  <Tabs>
                        <Tab title="All orders">
                              <AllOrders />
                        </Tab>
                        <Tab title="In progress">В процессе</Tab>
                  </Tabs>
            </div>
      );
}

export default Orders;