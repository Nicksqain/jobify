import { useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SocketContext from './context/socketContext'
import Home from './pages/Home';
// Components
import PageNotFound from "./pages/PageNotFound";

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NavBar from './components/NavBar/NavBar';
import { Toaster } from "react-hot-toast";
import PrivateRoute from './components/PrivateRoute';
import Orders from './pages/Orders/Orders';
import { AuthProvider } from './context/authContext';
const App: React.FC = () => {
  const socket = null
  return (
    <AuthProvider>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
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
                </Route>

                {/* Create Order */}
                {/* <Route path="/create" element={<PrivateRoute />}>
                <Route path="" element={<CreateOrder />} />
              </Route> */}

                {/* 404  */}

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div >
          </div>
        </BrowserRouter>

      </SocketContext.Provider>

    </AuthProvider>
  )
};

export default App
