import React, { useEffect } from 'react';
import { fetchUserNotifications, markAsRead, selectError, selectNotifications, selectNotificationsLoading } from '../../slices/notification.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import './notification.scss'

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
            <div className='notifications'>
                  {loading && <p>Загрузка...</p>}
                  {error && <p>Ошибка: {error}</p>}
                  <ul className='notification-list'>
                        {notifications && notifications.map((notification) => (
                              <li key={notification.id} className='notification'>
                                    <div className='message'>{notification.message}</div>
                                    {!notification.isRead && (
                                          <button onClick={() => handleMarkAsRead(notification.id)}>
                                                Отметить как прочитанное
                                          </button>
                                    )}
                              </li>
                        ))}
                  </ul>
            </div>
      );
};

export default Notifications;