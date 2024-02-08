import { Tabs, TabList, Tab, TabPanels, TabPanel, Heading, Text, TabIndicator } from '@chakra-ui/react';
import React, { FC } from 'react'
import PrivateAllUserOrders from './PrivateAllUserOrders';
import { useAppSelector } from '../../hooks/redux';

interface PrivateAllUserTasksTabsProps {

}

const PrivateAllUserTasksTabs: FC<PrivateAllUserTasksTabsProps> = ({ }) => {
      const { user } = useAppSelector(state => state.userSlice)
      return (
            <Tabs flex={1} position="relative" variant="unstyled" colorScheme='green' isLazy>
                  <TabList>
                        <Tab>В работе</Tab>
                        <Tab>Выполненные</Tab>
                  </TabList>
                  <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg="green.700"
                        borderRadius="1px"
                  />
                  <TabPanels mt={5} >
                        <TabPanel p={0}>

                              <PrivateAllUserOrders queryCfg={{ inProgressBy: user?.id }} />

                        </TabPanel>
                        <TabPanel p={0}>
                              <PrivateAllUserOrders queryCfg={{ completedBy: user?.id }} />
                        </TabPanel>
                  </TabPanels>
            </Tabs>
      )
}

export default PrivateAllUserTasksTabs;