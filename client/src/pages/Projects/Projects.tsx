import { Box, Button, Card, Checkbox, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import React, { FC } from 'react'
import ProjectCard from './Project/ProjectCard';
import Project from './Project/Project';
import { Link } from 'react-router-dom';

interface ProjectsProps {

}

const Projects: FC<ProjectsProps> = ({ }) => {
      return (
            <Box mb={50}>
                  <Stack mt={55} spacing={10}>

                        <HStack mb={10} justifyContent="space-between"><Heading size="md">Проекты</Heading>
                              <Link to={"/projects/create"}><Button>Создать проект</Button></Link>
                        </HStack>
                        <Project />
                        <Project />

                  </Stack>
            </Box>
      )
}

export default Projects;