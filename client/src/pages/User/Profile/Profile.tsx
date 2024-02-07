import { Avatar, Box, Card, CardBody, CardHeader, HStack, Text, Heading, Badge, Button, Stack, SimpleGrid, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react'
import { useAppSelector } from '../../../hooks/redux';
import dayjs from 'dayjs';
import { getUserStatus, isFreelancer, isOrderer } from '../../../helpers/role';
import { Link, useLocation, useParams } from 'react-router-dom';
import PublicAllUserOrders from '../../Orders/AllOrders/PublicAllUserOrders';
import { useQuery } from '@tanstack/react-query';
import { IUser } from '../../../models/IUser';
import { fetchUserInfo } from '../../../api/userApi';
import LoadingToRedirect from '../../../components/LoadingToRedirect';
import PrivateAllUserOrdersTabs from '../../Orders/PrivateAllUserOrdersTabs';
import PrivateAllUserTasksTabs from '../../Orders/PrivateAllUserTasksTabs';

interface ProfileProps {

}

const Profile: FC<ProfileProps> = ({ }) => {
      const { user } = useAppSelector(state => state.userSlice)
      const { userId } = useParams()
      const location = useLocation()
      const hash = location.hash
      const [openedTabIndex, setOpenedTabIndex] = useState<number>(0)
      useEffect(() => {
            switch (hash) {
                  case "#tasks":
                        setOpenedTabIndex(1)
                        break;
                  case "#orders":
                        setOpenedTabIndex(2)
                        break;
                  case "#projects":
                        setOpenedTabIndex(3)
                        break;
                  case "#settings":
                        setOpenedTabIndex(4)
                        break;
                  default:
                        setOpenedTabIndex(0)
                        break;
            }
      }, [location, hash])

      const userInfoQuery = useQuery<IUser>({
            queryKey: ['profileUserOrders', userId],
            queryFn: () => (userId ? fetchUserInfo(userId) : Promise.resolve([])),

      });
      console.log(userInfoQuery)
      return userInfoQuery.isLoading ? (
            <LoadingToRedirect />
      )
            : userInfoQuery.data && (
                  <Stack mt={50}>
                        <Card size="lg" mb={5}>
                              <CardBody>
                                    <HStack alignItems="start" spacing={6} wrap="wrap">
                                          <Avatar mt={-50} size="2xl" name={userInfoQuery.data?.fullname} src='https://sun9-2.userapi.com/impg/NLw60LaO3eJ_WjCqjynwSvAXH0PyXvl_kXHdcw/VlRqYiewJXk.jpg?size=400x400&quality=95&sign=2396d3c2016207dd20176e71088c237f&type=album' />
                                          <Box>
                                                <Text mb={2}>На сервисе с {dayjs(userInfoQuery.data.createdAt).format("DD MMMM YYYY").toString()}</Text>
                                                <Heading size="2xl" mb={1}>{userInfoQuery.data?.fullname}</Heading>
                                                <Badge fontSize='0.8em'>{getUserStatus(userInfoQuery.data)}</Badge>
                                                <Stack spacing={2} mt={6} direction="row" align='center' wrap="wrap">
                                                      {isOrderer(user) ?
                                                            <>
                                                                  <Button as={Link} to={"/orders/create"} colorScheme='green' size='md'>
                                                                        Создать заказ
                                                                  </Button>
                                                                  <Button as={Link} to={"/"} size='md'>
                                                                        Найти задание
                                                                  </Button>

                                                            </> :
                                                            <>
                                                                  <Button as={Link} to={"/"} colorScheme='green' size='md'>
                                                                        Найти задание
                                                                  </Button>
                                                                  <Button as={Link} to={"/orders/create"} size='md'>
                                                                        Создать заказ
                                                                  </Button>
                                                            </>
                                                      }
                                                </Stack>
                                          </Box>
                                    </HStack>
                              </CardBody>
                        </Card>
                        <Stack spacing={6} direction="row" alignItems="start">
                              <Tabs onChange={(index) => setOpenedTabIndex(index)} flex={1} colorScheme='green' isLazy index={openedTabIndex}>
                                    <TabList>
                                          <Tab>Обо мне</Tab>
                                          <Tab>{userId === user?.id ?
                                                "Мои задачи" : "Выполненные задачи"}</Tab>

                                          <Tab>{userId === user?.id ?
                                                "Мои заказы" : "Выполненные заказы"}</Tab>
                                          {userId === user?.id && <Tab>Мои проекты</Tab>}
                                          <Tab>Настройки</Tab>
                                    </TabList>
                                    <TabPanels mt={5} >

                                          {/* ОБО МНЕ */}
                                          <TabPanel p={0}>
                                                <Heading size="xl" mb={3}>Обо мне</Heading>
                                                <Text>Стэк: Marvel, Miro, Figma, Principle. (использую также Sketch, Illustrator) После длительной разработки большой дизайн-системы с интеграцией дизайн -токенов, придерживаюсь системных подходов в работе. Эстимирую даже маленькие задачи, объемные декомпонизирую.При необходимости фасилитирую встречи, чтобы они были более продуктивными.🙂
                                                      Продукты на релизе: Ростехнадзор РФ, Vexel, Inmenu, Наставник, Saportino, Fango и другие.
                                                      Проектирование интерфейсов мобильных приложений, крупных порталов и сервисов, CRM-систем, Разработка и поддержание Dashboard со сложной структурой и логикой.
                                                      В целом в проектировании взаимодействия и в визуальной составляющей интерфейсов стремлюсь к доказательному дизайну. Могу аргументировать свои решения опираясь на эвристику и свой опыт.Портфолио:
                                                      Некоторые из проектов попадают под NDA, готов показать на очном собеседовании или путем шара экрана в zoom</Text>
                                          </TabPanel>
                                          {/* МОИ ЗАДАЧИ */}
                                          <TabPanel p={0}>
                                                {userId === user?.id && <Text p={2} size="md">Здесь отображаются заказы, в которых вы приняли участие в качестве исполнителя</Text>}

                                                {userId === user?.id ? <PrivateAllUserTasksTabs /> :
                                                      <PublicAllUserOrders userId={userId} queryCfg={{ completedBy: userId }} />}
                                          </TabPanel>
                                          {/* Мои заказы */}
                                          <TabPanel p={0}>
                                                {userId === user?.id && <Text p={2} size="md">Этот раздел содержит все заказы, которые вы создали в качестве заказчика.</Text>}

                                                {userId === user?.id ? <PrivateAllUserOrdersTabs /> :
                                                      <PublicAllUserOrders userId={userId} queryCfg={{ completedBy: userId }} />}
                                          </TabPanel>
                                          {userId === user?.id && <TabPanel p={0}>Мои проекты</TabPanel>}
                                          <TabPanel p={0}>Настройки</TabPanel>
                                    </TabPanels>
                              </Tabs>
                        </Stack>



                  </Stack>
            )
}

export default Profile;