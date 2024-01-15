import React, { useEffect } from 'react';
import { fetchUserNotifications, markAsRead, selectError, selectNotifications, selectNotificationsLoading } from '../../slices/notification.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Box, List, ListItem, Text } from '@chakra-ui/react';
// import './notification.scss'

const Notifications = () => {
      const dispatch = useAppDispatch();
      const userId = useAppSelector((state) => state.userSlice.user?.id);
      const notifications = useAppSelector(selectNotifications);
      const loading = useAppSelector(selectNotificationsLoading);
      const error = useAppSelector(selectError);

      useEffect(() => {
            if (userId) {
                  dispatch(fetchUserNotifications());
            }
      }, [dispatch, userId]);

      const handleMarkAsRead = (notificationId: number) => {
            dispatch(markAsRead(notificationId));
      };

      return (
            <Box px={2}>
                  {loading && <p>Загрузка...</p>}
                  {error && <p>Ошибка: {error}</p>}
                  <List spacing={3}>
                        {notifications && notifications.map((notification) => (
                              <ListItem key={notification.id} className='notification'>
                                    <Text className='message'>{notification.message} </Text>
                                    {!notification.isRead && (
                                          <button onClick={() => handleMarkAsRead(notification.id)}>
                                                Отметить как прочитанное
                                          </button>
                                    )}
                              </ListItem>
                        ))}
                  </List>
            </Box>

      );
};

export default Notifications;