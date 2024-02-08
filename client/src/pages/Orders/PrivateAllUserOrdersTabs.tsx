import { Tabs, TabList, Tab, TabPanels, TabPanel, Heading, Text, TabIndicator } from '@chakra-ui/react';
import React, { FC } from 'react'
import PrivateAllUserOrders from './PrivateAllUserOrders';
import { useAppSelector } from '../../hooks/redux';

interface PrivateAllUserOrdersProps {

}

const PrivateAllUserOrdersTabs: FC<PrivateAllUserOrdersProps> = ({ }) => {
      const { user } = useAppSelector(state => state.userSlice)
      return (
            <Tabs flex={1} position="relative" variant="unstyled" colorScheme='green' isLazy>
                  <TabList>
                        <Tab>Опубликованные</Tab>
                        <Tab>В работе</Tab>
                        <Tab>Выполненные</Tab>
                        <Tab>Отклоненные</Tab>
                        <Tab>Ожидающие заказы</Tab>
                  </TabList>
                  <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg="green.700"
                        borderRadius="1px"
                  />
                  <TabPanels mt={5} >
                        <TabPanel p={0}>
                              {/* Активные заказы = published */}
                              <PrivateAllUserOrders queryCfg={{ createdBy: user?.id }} />
                        </TabPanel>
                        <TabPanel p={0}>
                              {/* Заказы в работе = inprogress */}
                              <PrivateAllUserOrders queryCfg={{ status: 'inprogress', createdBy: user?.id }} />
                        </TabPanel>
                        <TabPanel p={0}>
                              {/* Выполненные заказы = completed */}
                              <PrivateAllUserOrders queryCfg={{ status: 'completed', createdBy: user?.id }} />
                        </TabPanel>
                        <TabPanel p={0}>
                              {/* Отклоненные заказы = rejected */}
                              <PrivateAllUserOrders queryCfg={{ status: 'rejected', createdBy: user?.id }} />
                        </TabPanel>
                        <TabPanel p={0}>
                              {/* Ожидающие заказы = pending_approval */}
                              <PrivateAllUserOrders queryCfg={{ status: 'pending_approval', createdBy: user?.id }} />
                        </TabPanel>
                  </TabPanels>
            </Tabs>
      )
}

export default PrivateAllUserOrdersTabs;