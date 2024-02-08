import React, { FC, useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext';
import { NavLink } from 'react-router-dom';
import Tabs from '../../components/ui/Tabs/Tabs';
import Tab from '../../components/ui/Tabs/Tab';
import AllUserOrders from './AllOrders/AllUserOrders';
import './orders.scss';
import AllOrders from './AllOrders/AllOrders';
import { Button, Heading } from '@chakra-ui/react';
import { isAdmin, isModerator } from '../../helpers/role';
import { useAppSelector } from '../../hooks/redux';
interface OrdersProps {

}

const Orders: FC<OrdersProps> = ({ }) => {
      const [orderer, setOrderer] = useState(false);
      // RTK STORE
      const { user } = useAppSelector(state => state.userSlice)

      //   STATE
      const [freelancer, setFreelancer] = useState(false);

      useEffect(() => {
            // CHECKING STATUS
            switch (user?.status) {
                  case "freelancer":
                        setFreelancer(true);
                        break;
                  case "orderer":
                        setOrderer(true);
                        break;
            }
      }, [user?.status]);

      return (
            <div>
                  <div className="orders min-container">

                        {(isAdmin(user) || isModerator(user)) && (
                              <div className="orders-search">
                                    <span>Проверьте задачи и изучите статистику</span>
                                    <NavLink to="/admin/moder/orders"><Button colorScheme='green'>Приступить к модерации</Button></NavLink>
                              </div>
                        )}
                        {(freelancer && (!isAdmin(user) || isModerator(user))) && (
                              <div className="orders-search">
                                    <span>Найти задание для выполнения заказа</span>
                                    <Button colorScheme='green'>Найти задание</Button>
                              </div>
                        )}


                        {(orderer && (!isAdmin(user) || isModerator(user))) && (
                              <div className="orders-search">
                                    <span>Создайте заказ и выберите исполнителя</span>
                                    <NavLink to="create">
                                          <Button colorScheme='green'>Создать задание</Button>
                                    </NavLink>
                              </div>
                        )}

                  </div>
                  <Heading mb={3}>Все задачи</Heading>
                  <AllOrders />
                  <Heading mb={3}>Ваши задачи</Heading>
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