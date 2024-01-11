import React, { FC, useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext';
import { NavLink } from 'react-router-dom';
import Tabs from '../../components/ui/Tabs/Tabs';
import Tab from '../../components/ui/Tabs/Tab';
import AllUserOrders from './AllOrders/AllUserOrders';
import './orders.scss';
import AllOrders from './AllOrders/AllOrders';
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
                                          <button className='primary-button'>Найти задание</button>
                                    </>
                              )}
                              {orderer && (
                                    <>
                                          <span>Создайте заказ и выберите исполнителя</span>
                                          <NavLink to="create">
                                                <button className='primary-button'>Создать задание</button>
                                          </NavLink>
                                    </>
                              )}
                        </div>
                  </div>
                  <h1>All orders</h1>
                  <AllOrders />
                  <h1>All user orders</h1>
                  <AllUserOrders />

                  {/* <Tabs>
                        <Tab title="Все заказы">
                              <AllUserOrders />
                        </Tab>
                        <Tab title="В работе">В процессе</Tab>
                        <Tab title="Отмененные">Отмененные</Tab>
                  </Tabs> */}
            </div>
      );
}

export default Orders;