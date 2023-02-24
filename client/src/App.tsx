import { useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SocketContext from './context/socketContext'
import Home from './pages/Home';
// Components
import PageNotFound from "./pages/PageNotFound";
import NavBar from './components/NavBar/NavBar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
const App: React.FC = () => {

  const socket = null

  return (
    <SocketContext.Provider value={socket}>
      {/* <AuthProvider> */}

      <BrowserRouter>
        <div className="App">

          <NavBar.Container>
            <NavBar.Brand>Jobify.</NavBar.Brand>

            <NavBar.Collapse >
              <NavBar.Link to="orders">Orders</NavBar.Link>
            </NavBar.Collapse>
            <NavBar.Collapse end>
              <NavBar.Link to="/login">Login</NavBar.Link>
              <NavBar.Link to="/register">Register</NavBar.Link>
            </NavBar.Collapse>

          </NavBar.Container>
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Register" element={<Register />} />

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
      {/* </AuthProvider> */}
    </SocketContext.Provider>
  )
};

export default App
