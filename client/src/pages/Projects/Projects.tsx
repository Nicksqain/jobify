import { Box, Button, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react'
import Project from './Project/Project';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../hooks/redux';
import { fetchProjects } from '../../api/projectApi';
import { IProject } from '../../models/IProject';

interface ProjectsProps {

}

const Projects: FC<ProjectsProps> = ({ }) => {
      const { user } = useAppSelector(state => state.userSlice)

      const {
            data,
            isLoading,
            isError,
            isSuccess,
      } = useQuery<IProject[]>({
            queryKey: ["allProjects"],
            queryFn: () => fetchProjects(),
      });


      return (
            <Box mb={50}>
                  <Stack mt={55} spacing={10}>
                        <HStack mb={10} justifyContent="space-between"><Heading size="md">Проекты</Heading>
                              <Link to={"/projects/create"}><Button>Создать проект</Button></Link>
                        </HStack>
                        {
                              (isError || (data && data.length <= 0)) &&
                              <Text>Не удалось получить проекты!</Text>

                        }
                        {
                              data?.map(el =>
                                    <Project name={el.name} shortDescription={el.shortDescription} orders={el.orders} />
                              )
                        }

                  </Stack>
            </Box>
      )
}



export default Projects;