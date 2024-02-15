import { Box, Button, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react'
import Project from './Project/Project';
import { Link } from 'react-router-dom';
import { fetchUserProjects } from '../../api/projectApi';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../hooks/redux';
import { IProject } from '../../models/IProject';

interface ProjectsProps {

}

const UserProjects: FC<ProjectsProps> = ({ }) => {
      const { user } = useAppSelector(state => state.userSlice)

      const {
            data,
            isLoading,
            isError,
            isSuccess,
      } = useQuery<IProject[]>({
            queryKey: ["userProjects"],
            queryFn: () => fetchUserProjects(user?.id as string),
      });
      return (
            <Box mb={50}>
                  <Stack spacing={5}>
                        <HStack mb={0} justifyContent="space-between"><Heading size="md">Проекты</Heading>
                              <Link to={"/projects/create"}><Button>Создать проект</Button></Link>
                        </HStack>

                        {
                              (isError || (data && data.length <= 0)) &&
                              <Text>Не удалось получить проекты!</Text>

                        }
                        <Stack spacing={10}>
                              {
                                    isLoading ? <Text>Загрузка</Text> :

                                          data?.map(el =>
                                                <Project name={el.name} shortDescription={el.shortDescription} orders={el.orders} />
                                          )
                              }
                        </Stack>

                  </Stack>
            </Box>
      )

}

export default UserProjects;