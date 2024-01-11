import React, { FC } from 'react'
import './admin-dashboard.scss'
import AdminLayout from './components/AdminLayout';
import AdminSidebar from './components/AdminSidebar';
import { Outlet } from 'react-router-dom';
import Stats from './components/stats/Stats';
interface AdminDashboardProps {

}

const AdminDashboard: FC<AdminDashboardProps> = ({ }) => {
      return (
            <div className='admin-dashboard'>
                  <AdminSidebar />

                  <AdminLayout >
                        <Stats />
                        <Outlet />
                  </AdminLayout>
            </div>
      )
}

export default AdminDashboard;