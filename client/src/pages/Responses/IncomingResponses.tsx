import React, { FC } from 'react'
import { fetchUserProjects } from '../../api/projectApi';
import { useAppSelector } from '../../hooks/redux';
import { fetchIncomingResponses } from '../../api/responsesApi';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@chakra-ui/react';
import Response from './Response';
import { IResponse } from '../../models/IResponse';

interface IncomingResponsesProps {

}

const IncomingResponses: FC<IncomingResponsesProps> = ({ }) => {
      const { user } = useAppSelector(state => state.userSlice)

      const {
            data,
            isLoading,
            isError,
            isSuccess,
      } = useQuery<IResponse[]>({
            queryKey: ["userIncomingResponses"],
            queryFn: () => fetchIncomingResponses(user?.id as string),
      });
      return (
            <div>
                  {
                        (isError) &&
                        <Text>Не удалось получить выбранные отклики!</Text>

                  }
                  {
                        (data && data.length <= 0) &&
                        <Text>Список выбранных откликов пуст!</Text>

                  }
                  {
                        isLoading ? <Text>Загрузка</Text> :

                              data?.map((el, index) =>
                                    <Response key={index} createdAt={el.createdAt} User={el.User} order={el.order} accepted={el.accepted} executionCost={el.executionCost} executionDate={el.executionDate} message={el.message} />
                              )
                  }
            </div>
      )
}

export default IncomingResponses;