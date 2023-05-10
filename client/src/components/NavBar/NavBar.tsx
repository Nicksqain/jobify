import React, { FC, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import { romoveFromLocalStorage } from '../../helpers/auth';
import MyNavBar from '../forms/NavBar/NavBar';
interface NavBarProps {

}

const NavBar: FC<NavBarProps> = ({ }) => {
      const authContext = useContext(AuthContext)
      const isAuth: Boolean = authContext?.auth !== null && authContext?.auth !== undefined;
      const logout = () => {
            console.log("logOut")
            authContext?.setAuth(null);
            romoveFromLocalStorage();
      };
      return (

            <MyNavBar.Container>
                  <MyNavBar.Brand>Jobify.</MyNavBar.Brand>

                  <MyNavBar.Collapse >
                        <MyNavBar.Link to="orders">Orders</MyNavBar.Link>
                  </MyNavBar.Collapse>
                  <MyNavBar.Collapse end>
                        {
                              isAuth ? (<>
                                    <MyNavBar.Link to="/login" onClick={logout}>Logout</MyNavBar.Link>

                              </>
                              ) :
                                    (<><MyNavBar.Link to="/login">Login</MyNavBar.Link>
                                          <MyNavBar.Link to="/register">Register</MyNavBar.Link></>)
                        }


                  </MyNavBar.Collapse>

            </MyNavBar.Container>
      )
}

export default NavBar;