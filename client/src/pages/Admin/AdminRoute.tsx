import axios from "axios";
import React, { FC } from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/authContext";
import { romoveFromLocalStorage } from "../../helpers/auth";
import LoadingToRedirect from "../../components/LoadingToRedirect";

// import io from "socket.io-client";
interface AdminRouteProps {
      roles: string[]
}
const AdminRoute: FC<AdminRouteProps> = ({ roles }) => {

      // Context
      const authContext = useContext(AuthContext);
      const [isAdmin, setIsAdmin] = useState(false);
      const isUserInAllowedRoles = async (user: any) => {
            try {
                  const response = await axios.get(`auth/${user?.id}`);
                  console.log(roles)
                  if (roles.includes(response?.data.role)) {
                        return true
                  } return false
            } catch (error) {
                  console.log(error)
            }
      }



      // State
      const [loading, setLoading] = useState(true);

      // Hooks
      const location = useLocation();
      const navigate = useNavigate();
      useEffect(() => {
            const checkAdmin = async () => {
                  const result = await isUserInAllowedRoles(authContext?.auth?.user);
                  if (result)
                        setIsAdmin(true)
                  else setIsAdmin(false)
            };
            checkAdmin()

            console.log(authContext?.auth?.user)

      }, [])
      if (authContext?.auth?.user && isAdmin) {
            return <Outlet />;
      } else {
            return <div>Доступ запрещен.</div>;
      }
};

export default AdminRoute;
