
import React, { FC } from 'react'
import { fetchIncomingResponses, fetchOutgoingResponses } from '../../api/responsesApi';
import { useAppSelector } from '../../hooks/redux';
import { IResponse } from '../../models/IResponse';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@chakra-ui/react';
import Response from './Response';

interface OutgoingResponsesProps {

}

const OutgoingResponses: FC<OutgoingResponsesProps> = ({ }) => {
      const { user } = useAppSelector(state => state.userSlice)

      const {
            data,
            isLoading,
            isError,
            isSuccess,
      } = useQuery<IResponse[]>({
            queryKey: ["userOutgoingResponses"],
            queryFn: () => fetchOutgoingResponses(user?.id as string),
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

export default OutgoingResponses;