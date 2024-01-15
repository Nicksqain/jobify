import React, { FC, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import { romoveFromLocalStorage } from '../../helpers/auth';
import MyNavBar from '../forms/NavBar/NavBar';

import { useTheme } from '../../context/ThemeContext';
import Select from '../ui/Select/Select';
import Dropdown from '../ui/Dropdown';
import {
      ChakraProvider,
      Box,
      Flex,
      Spacer,
      VStack,
      HStack,
      Text,
      Menu,
      MenuButton,
      MenuList,
      MenuItem,
      IconButton,
      Button,
      useColorMode,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import Notifications from '../Notifications/Notifications';
import { useAppSelector } from '../../hooks/redux';
interface NavBarProps {

}
function NotificationMenu() {
      const { notifications } = useAppSelector(state => state.notificationSlice)
      const hasUnreadNotifications = notifications.some(notification => !notification.isRead);
      console.log(notifications)
      return (
            <Menu >
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
                  <MenuList zIndex="1">
                        <Notifications />
                  </MenuList>
            </Menu>
      );
}

const NavBar: FC<NavBarProps> = ({ }) => {
      const { theme, toggleTheme } = useTheme();
      const authContext = useContext(AuthContext)
      const isAuth: Boolean = authContext?.auth !== null && authContext?.auth !== undefined;
      const logout = () => {
            console.log("logOut")
            authContext?.setAuth(null);
            romoveFromLocalStorage();
      };
      const { colorMode, toggleColorMode } = useColorMode()
      return (

            <MyNavBar.Container>
                  <MyNavBar.Brand>Jobify.</MyNavBar.Brand>

                  <MyNavBar.Collapse >
                        <MyNavBar.Link to="orders">Orders</MyNavBar.Link>
                  </MyNavBar.Collapse>
                  <MyNavBar.Collapse end>
                        <a onClick={toggleTheme} className='nav-link'>Theme</a>
                        <NotificationMenu />
                        <Button onClick={toggleColorMode}>
                              Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                        </Button>
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
                                                <MenuList zIndex="1">
                                                      <VStack>
                                                            <MenuItem>
                                                                  <MyNavBar.Link to="/admin">Admin</MyNavBar.Link>

                                                            </MenuItem>
                                                            <MenuItem>
                                                                  <MyNavBar.Link to="/login" onClick={logout}>Logout</MyNavBar.Link>
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