import { Tabs, TabList, Tab, TabPanels, TabPanel, Heading, Text, Box } from '@chakra-ui/react';
import { FC, useState } from 'react'
import PublicAllUserOrders from '../Orders/AllOrders/PublicAllUserOrders';
import PrivateAllUserOrdersTabs from '../Orders/PrivateAllUserOrdersTabs';
import PrivateAllUserTasksTabs from '../Orders/PrivateAllUserTasksTabs';
import UserProjects from '../Projects/UserProjects';
import OutgoingResponses from './OutgoingResponses';
import IncomingResponses from './IncomingResponses';

interface ResponsesProps {

}

const Responses: FC<ResponsesProps> = ({ }) => {
      const [openedTabIndex, setOpenedTabIndex] = useState<number>(0)
      return (
            <Box mt={50}>
                  <Heading mb={4}>Отклики</Heading>
                  <Tabs onChange={(index) => setOpenedTabIndex(index)} flex={1} colorScheme='green' isLazy index={openedTabIndex}>
                        <TabList>
                              <Tab>Входящие</Tab>
                              <Tab>Исходящие</Tab>
                        </TabList>
                        <TabPanels mt={5} >

                              {/* ОТ ИСПОЛНИТЕЛЕЙ */}
                              <TabPanel p={0}>
                                    <Text mb={3}>Этот раздел отображает все отклики от исполнителей, которые поступили вам.</Text>
                                    <IncomingResponses />

                              </TabPanel>
                              {/*  ОТ ЗАКАЗЧИКА */}
                              <TabPanel p={0}>
                                    <Text mb={3}>В этом разделе представлены отклики, которые вы отправили в качестве исполнителя заказчикам.</Text>
                                    <OutgoingResponses />
                              </TabPanel>
                        </TabPanels>
                  </Tabs>
            </Box>
      )
}

export default Responses;