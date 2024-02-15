import { Stack, Card, VStack, Heading, Text, CardFooter, HStack, Link as ChakraLink } from '@chakra-ui/react';
import { FC } from 'react'
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';
import { IOrder } from '../../../models/IOrder';

interface ProjectProps {
      name: string;
      shortDescription: string;
      orders: IOrder[];
}

const Project: FC<ProjectProps> = (props) => {
      return (
            <Stack>
                  <Card p={7}>
                        <Stack>
                              <VStack mb={5} align="start">
                                    <Heading size="lg">{props.name}</Heading>
                                    <Text>{props.shortDescription}</Text>
                              </VStack>
                              <Stack>
                                    {props.orders && props.orders.map(el => (
                                          <ProjectCard key={el.id} isCompleted={el.status === "completed"} />
                                    ))}

                              </Stack>
                        </Stack>
                        <CardFooter p={0} pt={5}>
                              <Stack flexDir="row" justifyContent="end" width="100%">
                                    <ChakraLink as={Link} to={"/user/846d6943-9851-46be-9745-79e7c6173dcb#projects"} isExternal size="md"><HStack>
                                          <Text as="small" fontSize="sm" opacity={0.2}>Все проекты заказчика</Text></HStack></ChakraLink>
                                    <ChakraLink as={Link} to={"/user/846d6943-9851-46be-9745-79e7c6173dcb#orders"} isExternal size="md"><HStack>
                                          <Text as="small" fontSize="sm" opacity={0.2}>Все задания заказчика</Text></HStack></ChakraLink>
                              </Stack>
                        </CardFooter>
                  </Card>
            </Stack>
      )
}

export default Project;