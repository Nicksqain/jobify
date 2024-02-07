import React, { FC, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import { romoveFromLocalStorage } from '../../helpers/auth';
import MyNavBar from '../forms/NavBar/NavBar';

import { useTheme } from '../../context/ThemeContext';
import Select from '../ui/Select/Select';
import {
      VStack,
      Menu,
      MenuButton,
      MenuList,
      MenuItem,
      IconButton,
      useColorMode,
} from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import Notifications from '../Notifications/Notifications';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logoutAction } from '../../store/actions';
import AccountIcon from '../../assets/icons/AccountIcon';
import DashBoardIcon from '../../assets/icons/DashBoardIcon';
import LogoutIcon from '../../assets/icons/LogoutIcon';
import { isAdmin, isModerator } from '../../helpers/role';
import TaskList from '../../assets/icons/TaskList';
import ProjectList from '../../assets/icons/ProjectList';
interface NavBarProps {

}
function NotificationMenu() {
      const { notifications } = useAppSelector(state => state.notificationSlice)
      const hasUnreadNotifications = notifications.some(notification => !notification.isRead);
      console.log(notifications)
      return (
            <Menu>
                  <MenuButton
                        as={IconButton}
                        cursor="pointer"
                        position="relative"
                        icon={
                              <>
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          className="icon icon-tabler icon-tabler-bell"
                                          viewBox="0 0 24 24"
                                    >
                                          <path stroke="none" d="M0 0h24v24H0z"></path>
                                          <path d="M10 5a2 2 0 014 0 7 7 0 014 6v3a4 4 0 002 3H4a4 4 0 002-3v-3a7 7 0 014-6M9 17v1a3 3 0 006 0v-1"></path>
                                    </svg>
                                    {hasUnreadNotifications && (
                                          <span
                                                style={{
                                                      position: "absolute",
                                                      top: "8px",
                                                      right: "8px",
                                                      width: "10px",
                                                      height: "10px",
                                                      borderRadius: "50%",
                                                      backgroundColor: "#df4646",
                                                }}
                                          ></span>
                                    )}
                              </>

                        }

                  >

                  </MenuButton>
                  <MenuList zIndex="1" py={0}>
                        <Notifications />
                  </MenuList>
            </Menu>
      );
}

const NavBar: FC<NavBarProps> = ({ }) => {
      const { theme, toggleTheme } = useTheme();
      const authContext = useContext(AuthContext)
      const isAuth: Boolean = authContext?.auth !== null && authContext?.auth !== undefined;
      const dispatch = useAppDispatch()
      const { user } = useAppSelector(state => state.userSlice)
      const handleLogout = () => {
            console.log("logOut")
            authContext?.setAuth(null);
            romoveFromLocalStorage();
            dispatch(logoutAction());
      };
      const { colorMode, toggleColorMode } = useColorMode()
      return (

            <MyNavBar.Container>
                  <MyNavBar.Brand>Jobify.</MyNavBar.Brand>
                  <MyNavBar.Collapse>
                        <MyNavBar.Link to="orders">Задачи</MyNavBar.Link>
                        <MyNavBar.Link to="projects">Проекты</MyNavBar.Link>
                  </MyNavBar.Collapse>
                  <MyNavBar.Collapse end>
                        <NotificationMenu />
                        <IconButton onClick={toggleColorMode}
                              aria-label='Toggle color mode'
                              icon={
                                    colorMode === 'light' ? <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          className="icon icon-tabler icon-tabler-moon"
                                          viewBox="0 0 24 24"
                                    >
                                          <path stroke="none" d="M0 0h24v24H0z"></path>
                                          <path d="M12 3h.393a7.5 7.5 0 007.92 12.446A9 9 0 1112 2.992z"></path>
                                    </svg> : <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          className="icon icon-tabler icon-tabler-sun"
                                          viewBox="0 0 24 24"
                                    >
                                          <path stroke="none" d="M0 0h24v24H0z"></path>
                                          <circle cx="12" cy="12" r="4"></circle>
                                          <path d="M3 12h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"></path>
                                    </svg>}

                        >
                        </IconButton>
                        <Menu >
                              <MenuButton as={IconButton} cursor="pointer" icon={<svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="icon icon-tabler icon-tabler-user-circle"
                                    viewBox="0 0 24 24"
                              >
                                    <path stroke="none" d="M0 0h24v24H0z"></path>
                                    <circle cx="12" cy="12" r="9"></circle>
                                    <circle cx="12" cy="10" r="3"></circle>
                                    <path d="M6.168 18.849A4 4 0 0110 16h4a4 4 0 013.834 2.855"></path>
                              </svg>}>
                              </MenuButton>
                              {
                                    isAuth ?
                                          (
                                                <MenuList zIndex="1" p={0}>
                                                      <VStack>
                                                            <MenuItem p={4} as={Link} to={`/user/${user?.id}`} icon={<AccountIcon />} iconSpacing={2}>
                                                                  Мой профиль
                                                            </MenuItem>
                                                            {(isAdmin(user) || isModerator(user)) &&
                                                                  <MenuItem p={4} as={Link} icon={<DashBoardIcon />} iconSpacing={2} to='/admin'>
                                                                        Админ-панель
                                                                  </MenuItem>}
                                                            <MenuItem p={4} as={Link} to={`/user/${user?.id}#tasks`} icon={<TaskList />} iconSpacing={2}>
                                                                  Мои задачи
                                                            </MenuItem>
                                                            <MenuItem p={4} as={Link} to={`/user/${user?.id}#orders`} icon={<ProjectList />} iconSpacing={2}>
                                                                  Мои заказы
                                                            </MenuItem>
                                                            <MenuItem p={4} as={Link} to={`/user/${user?.id}#projects`} icon={<ProjectList />} iconSpacing={2}>
                                                                  Мои проекты
                                                            </MenuItem>
                                                            <MenuItem p={4} as={Link} icon={<LogoutIcon />} iconSpacing={2} to="/login" onClick={handleLogout}>
                                                                  Выйти
                                                            </MenuItem>
                                                      </VStack>
                                                </MenuList>
                                          ) :
                                          (
                                                <>
                                                      <MyNavBar.Link to="/login">Login</MyNavBar.Link>
                                                      <MyNavBar.Link to="/register">Register</MyNavBar.Link>
                                                </>
                                          )
                              }
                        </Menu>



                  </MyNavBar.Collapse>

            </MyNavBar.Container>
      )
}

export default NavBar;