import { useContext, useEffect, useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";



import SocketContext from './context/socketContext'
import { AuthProvider } from './context/authContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';


// Components
import PageNotFound from "./pages/PageNotFound";
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NavBar from './components/NavBar/NavBar';
import PrivateRoute from './components/PrivateRoute';
import Orders from './pages/Orders/Orders';
import CreateOrder from './pages/Orders/CreateOrder/CreateOrder';
import AdminRoute from './pages/Admin/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Moderation from './pages/Admin/Moderation/Moderation';
import Stats from './pages/Admin/components/stats/Stats';
import Tasks from './pages/Admin/Moderation/Orders/ModerationOrders';
import ModerationOrders from './pages/Admin/Moderation/Orders/ModerationOrders';
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from './hooks/redux';
import useOrders from './hooks/orders';

import {
  ChakraBaseProvider,
  ColorModeProvider,
} from '@chakra-ui/react'
import theme from './theme';



const App: React.FC = () => {
  const socket = null
  const dispatch = useAppDispatch();
  useOrders(dispatch)

  return (
    <AuthProvider>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <ThemeProvider>
            <ChakraBaseProvider theme={theme}>
              <ColorModeProvider
                options={{
                  initialColorMode: 'dark',
                  // Изначальная тема (light или dark)
                }}
              >
                <div className="App">
                  <Toaster />

                  {/* NAVIGATION */}
                  <NavBar></NavBar>

                  <div className='container'>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/Register" element={<Register />} />
                      <Route path="/orders" element={<PrivateRoute />}>
                        <Route path="" element={<Orders />} />
                        <Route path="create" element={<CreateOrder />} />
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
                  </div >
                </div>
              </ColorModeProvider>
            </ChakraBaseProvider>
          </ThemeProvider>

        </BrowserRouter>

      </SocketContext.Provider>

    </AuthProvider>


  )
};

export default App
