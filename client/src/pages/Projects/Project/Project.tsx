import { Stack, Card, VStack, Heading, Text, CardFooter, HStack, Link as ChakraLink } from '@chakra-ui/react';
import React, { FC } from 'react'
import ProjectCard from './ProjectCard';
import ExternalLinkIcon from '../../../assets/icons/ExternalLinkIcon';
import { Link } from 'react-router-dom';

interface ProjectProps {

}

const Project: FC<ProjectProps> = ({ }) => {
      return (
            <Stack>
                  <Card p={7}>
                        <Stack>
                              <VStack mb={5} align="start">
                                    <Heading size="lg">Постройка дома на земле</Heading>
                                    <Text>Прошу организовать строительство жилого дома на участке земли.</Text>
                              </VStack>
                              <Stack>
                                    <ProjectCard isCompleted />
                                    <ProjectCard />

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