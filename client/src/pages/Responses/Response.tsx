import { Stack, Card, VStack, Heading, CardFooter, HStack, Text, Box, Badge } from '@chakra-ui/react';
import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import ProjectCard from '../Projects/Project/ProjectCard';
import dayjs from 'dayjs';
import { IResponse } from '../../models/IResponse';

interface ResponseProps extends IResponse {
}

const Response: FC<ResponseProps> = (props) => {
      return (
            <Stack>
                  <Card p={7}>
                        <Stack>
                              <HStack mb={5} align="start" justifyContent={'space-between'}>
                                    <Heading size="lg">{props.order.orderName}</Heading>
                                    <Badge ml='1' fontSize='1em' colorScheme={props.accepted ? "green" : undefined}>
                                          {props.accepted ? "Принят" : "Ожидание"}
                                    </Badge>
                              </HStack>
                              <HStack spacing={10} alignItems="start">
                                    <Box>

                                          <Box>
                                                <Heading size="sm">Стоимость выполнения</Heading>
                                                <Text>{props.executionCost}</Text>
                                          </Box>
                                          <Box>
                                                <Heading size="sm">Планируемая дата выполнения</Heading>
                                                <Text>{dayjs(props.executionDate).format("DD.MM.YYYY")}</Text>
                                          </Box>
                                          <Box>
                                                <Heading size="sm">Заказчик</Heading>
                                                <Text>{props.User.fullname}</Text>
                                          </Box>
                                    </Box>
                                    <Box>
                                          <Heading size="sm">Сообщение</Heading>
                                          <Text>{props.message}</Text>
                                    </Box>
                              </HStack>
                        </Stack>
                  </Card>
            </Stack>
      )
}

export default Response;