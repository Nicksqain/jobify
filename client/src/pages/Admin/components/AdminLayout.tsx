import React, { FC, ReactElement, ReactNode } from 'react'

import PrivateRoute from '../../../components/PrivateRoute';
import Home from '../../Home';
import Login from '../../Login/Login';
import CreateOrder from '../../Orders/CreateOrder/CreateOrder';
import Orders from '../../Orders/Orders';
import PageNotFound from '../../PageNotFound';
import Register from '../../Register/Register';
import AdminDashboard from '../AdminDashboard';
import AdminRoute from '../AdminRoute';
import { Outlet } from 'react-router-dom';

interface AdminLayoutProps {
      children?: ReactNode | ReactElement
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
      return (
            <div className='admin-layout'>
                  <div className="container">

                        {children}
                  </div>
            </div>
      )
}

export default AdminLayout;