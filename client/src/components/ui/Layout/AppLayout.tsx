import { Box } from '@chakra-ui/react';
import React, { FC } from 'react'
import NavBar from '../../NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';

import AdminDashboard from '../../../pages/Admin/AdminDashboard';
import AdminRoute from '../../../pages/Admin/AdminRoute';
import ModerationOrders from '../../../pages/Admin/Moderation/Orders/ModerationOrders';
import Home from '../../../pages/Home';
import Login from '../../../pages/Login/Login';
import CreateOrder from '../../../pages/Orders/CreateOrder/CreateOrder';
import PageNotFound from '../../../pages/PageNotFound';
import Register from '../../../pages/Register/Register';
import PrivateRoute from '../../PrivateRoute';
import Orders from '../../../pages/Orders/Orders';
import Profile from '../../../pages/User/Profile/Profile';
import Projects from '../../../pages/Projects/Projects';
import CreateProject from '../../../pages/Projects/CreateProject/CreateProject';
import Responses from '../../../pages/Responses/Responses';

interface AppLayoutProps {
      children?: React.ReactElement
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
      return (
            <Box>
                  <NavBar></NavBar>
                  <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/Register" element={<Register />} />
                        <Route path="/user/:userId" element={<PrivateRoute />}>
                              <Route path="" element={<Profile />} />
                        </Route>
                        <Route path="/orders" element={<PrivateRoute />}>
                              <Route path="" element={<Orders />} />
                              <Route path="create" element={<CreateOrder />} />
                        </Route>
                        <Route path="/projects" element={<PrivateRoute />}>
                              <Route path="" element={<Projects />} />
                              <Route path="create" element={<CreateProject />} />
                        </Route>
                        <Route path="/responses" element={<PrivateRoute />}>
                              <Route path="" element={<Responses />} />
                        </Route>

                        {/* ADMINISTRATOR */}
                        <Route path="admin" element={<AdminRoute roles={["admin", "moderator"]} />}>

                              <Route path="" element={<AdminDashboard />}>
                                    {/* <Route index element={<Stats />} /> */}
                                    <Route path="moder">
                                          <Route path="orders" element={<ModerationOrders />} />
                                    </Route>
                              </Route>


                        </Route>

                        {/* 404  */}

                        <Route path="*" element={<PageNotFound />} />
                  </Routes>
            </Box>
      )
}

export default AppLayout;