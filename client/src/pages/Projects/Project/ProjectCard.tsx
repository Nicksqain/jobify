import { Card, HStack, Checkbox, VStack, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import ExternalLinkIcon from '../../../assets/icons/ExternalLinkIcon';

interface ProjectCardProps {
      isCompleted?: boolean;
}

const ProjectCard: FC<ProjectCardProps> = ({ isCompleted = false }) => {
      return (
            <Card p={5} variant="jSolid">

                  <HStack align="start" spacing={5} justifyContent="space-between">
                        <HStack align="start" spacing={5} >
                              <Checkbox size="lg" isDisabled={false} isChecked={isCompleted} colorScheme='green'></Checkbox>
                              <VStack align="start">
                                    <ChakraLink as={Link} to={"/user"} isExternal size="md"><HStack><Heading size="md">Постройка дома на земле</Heading> <ExternalLinkIcon /></HStack></ChakraLink>
                                    <Text>Прошу организовать строительство жилого дома на участке земли. </Text>
                              </VStack>
                        </HStack>
                        <VStack>
                              <Text fontSize="xl">250 000 KZT</Text>
                        </VStack>
                  </HStack>
                  <VStack>

                  </VStack>

            </Card>
      )
}

export default ProjectCard;