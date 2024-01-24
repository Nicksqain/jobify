import { Avatar, Box, Flex, Heading, IconButton, ListItem, Text, Wrap } from '@chakra-ui/react';
import React, { FC } from 'react'
import { INotification } from '../../../models/INotifiCation';
import { useAppDispatch } from '../../../hooks/redux';
import { markAsReadAsync } from '../../../slices/notification.slice';
import ModerationIcon from '../../../assets/icons/ModerationIcon';
import dayjs from 'dayjs';

interface VariantedNotificationProps extends INotification {

}

const VariantedNotification: FC<VariantedNotificationProps> = ({ id, message, isRead, createdAt, reason, source, type, userId, object, subject }) => {
      const dispatch = useAppDispatch();
      const handleMarkAsRead = (notificationId: number) => {
            dispatch(markAsReadAsync(notificationId));
      };
      switch (type) {
            case 'task_rejected':
                  return (
                        <ListItem
                              key={id} className='notification'>
                              <Flex gap={1}>
                                    <Flex flex='1' gap='4' alignItems='center'>
                                          <Avatar size='md' iconLabel='check' p={2} icon={<ModerationIcon />} />

                                          <Box>
                                                <Heading size='sm' mb={1}>Отклоненная задача</Heading>
                                                <Text>Ваша задача <Text as={'b'}>{object}</Text> не прошла модерацию по причине: <Text as={'b'}>{reason}</Text></Text>
                                                <Box textAlign="right">{dayjs(createdAt).format('DD MMM в HH:mm')}</Box>
                                          </Box>

                                    </Flex>
                                    {!isRead && (

                                          <IconButton
                                                // variant='ghost'
                                                colorScheme='gray'
                                                aria-label='See menu'
                                                onClick={() => handleMarkAsRead(id as number)}
                                                icon={<svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width="24"
                                                      height="24"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                >
                                                      <path
                                                            stroke="#ccc"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 12l4.95 4.95L22.556 6.343M2.05 12.05L7 17m5.303-5.303l5.304-5.303"
                                                      ></path>
                                                </svg>}
                                          />
                                    )}
                              </Flex>
                        </ListItem>
                  )

            default:
                  return (
                        <ListItem
                              key={id} className='notification'>
                              <Flex gap={1}>
                                    <Flex flex='1' gap='4' alignItems='center'>
                                          <Avatar size='md' iconLabel='check' p={2} icon={<ModerationIcon />} />
                                          <Box>

                                                {message && <Text className='message'>{message}</Text>}
                                                {/* <Box textAlign="right">{dayjs(createdAt).format('DD MMM в HH:mm')}</Box> */}
                                          </Box>

                                    </Flex>
                                    {!isRead && (
                                          <IconButton
                                                // variant='ghost'
                                                colorScheme='gray'
                                                aria-label='See menu'
                                                onClick={() => handleMarkAsRead(id as number)}
                                                icon={<svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width="24"
                                                      height="24"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                >
                                                      <path
                                                            stroke="#ccc"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 12l4.95 4.95L22.556 6.343M2.05 12.05L7 17m5.303-5.303l5.304-5.303"
                                                      ></path>
                                                </svg>}
                                          />
                                    )}
                              </Flex>
                        </ListItem>
                  )

      }

}

interface NotificationProps {
      notification: INotification
}
const Notification: FC<NotificationProps> = ({ notification }) => {
      return (
            <VariantedNotification {...notification} />
      )
}

export default Notification;