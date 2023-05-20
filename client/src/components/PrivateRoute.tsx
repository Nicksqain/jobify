import axios from "axios";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import { toast } from "react-hot-toast";
import LoadingToRedirect from "./LoadingToRedirect";
import { AuthContext } from "../context/authContext";
// import io from "socket.io-client";

const PrivateRoute = () => {
  // Context
  const authContext = useContext(AuthContext);

  // State
  const [loading, setLoading] = useState(true);

  // Hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to login page
  function RedirectToLogin() {
    return setTimeout(() => {
      toast.error("Authorization required!");
      navigate("/login", { state: { from: location } });
    }, Number(import.meta.env.VITE_REDIRECT_DELAY));
  }

  // Auth checking from server side
  const authCheck = async () => {
    type authCheck = {
      data: Object
    }
    try {
      const response = await axios.get(`auth-check`).catch(function (error) {
        console.log(error);
        toast.error(error.toJSON());
        if (error.response) {
          console.log("Ошибка", error.toJSON());
          RedirectToLogin();
        } else if (error.request) {
          console.log(error.toJSON());
        } else {
          // Произошло что-то при настройке запроса, вызвавшее ошибку
          console.log("Error", error.message);
        }
      });
      if (!response?.data.ok) {
        console.log('ЧТОТО')
        RedirectToLogin();
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 500); // задержка в 500 миллисекунд
      }
    } catch (error) {
      console.log("error")
    }
  };

  useEffect(() => {
    if (authContext?.auth) {
      authCheck();
    } else {
      let timer = RedirectToLogin();
      return () => {
        clearTimeout(timer);
      };
    }
  }, [authContext?.auth]);
  return loading ? <LoadingToRedirect /> : <Outlet />;
};

export default PrivateRoute;
