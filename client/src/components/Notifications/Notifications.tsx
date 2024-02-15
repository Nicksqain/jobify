import { Fragment, useEffect } from 'react';
import { fetchUserNotifications, selectError, selectNotifications, selectNotificationsLoading } from '../../slices/notification.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Box, Center, Divider, Flex, Heading, List, Spacer } from '@chakra-ui/react';
import Notification from './Notification/Notification';

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

      return (
            <Box p={4} maxWidth={'30em'}>
                  {notifications !== undefined && notifications.length > 0 && (
                        <Flex mb={3} align='baseline' gap={2} wrap={'wrap'}>
                              <Box><Heading size={'md'}>Уведомления</Heading></Box>
                              <Spacer />
                              <Center color="gray.500">Отметить всё как прочитанное</Center>
                        </Flex>
                  )}

                  {notifications !== undefined && notifications.length > 0 ? (
                        <List spacing={3}>
                              {notifications.map((notification, index) => (
                                    <Fragment key={index}>
                                          <Notification notification={notification} />
                                          {index !== notifications.length - 1 && <Divider />}
                                    </Fragment>
                              ))}
                        </List>
                  ) :
                        <Box>Список уведомлений пуст!</Box>}
            </Box>

      );
};

export default Notifications;