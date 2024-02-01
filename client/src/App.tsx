import { useContext, useEffect, useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";



import { SocketProvider } from './context/socketContext'
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
import { useAppDispatch, useAppSelector } from './hooks/redux';
import useOrders from './hooks/orders';

import {
  Box,
} from '@chakra-ui/react'

import AppLayout from './components/ui/Layout/AppLayout';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.userSlice.user?.id)
  // useOrders(dispatch)

  return (
    <AuthProvider>
      <SocketProvider userId={userId}>
        <BrowserRouter>


          <ThemeProvider>
            <Box className="App"  >
              <Toaster />

              {/* NAVIGATION */}


              <div className='container'>
                <AppLayout>

                </AppLayout>

              </div >
            </Box>
          </ThemeProvider>



        </BrowserRouter>

      </SocketProvider>

    </AuthProvider>


  )
};

export default App
