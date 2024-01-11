import { useState, useEffect, createContext, useContext, FC } from "react";
import axios from "axios";
import { getFromLocalStorage, romoveFromLocalStorage } from "../helpers/auth";
import { setUser } from "../slices/user.slice";
import { useAppDispatch } from "../hooks/redux";
// import SocketContext from "./socketContext";
interface IUser {
      role: string;
      id: string
      status: string
}
interface IAuth {
      token: string,
      user: IUser
}
export type AuthContextType = {
      auth: IAuth | null,
      setAuth: React.Dispatch<React.SetStateAction<IAuth | null>>
}
type Props = {
      children?: React.ReactNode
}
// interface Auth {
//       [key: string]: string
// }



const AuthContext = createContext<AuthContextType | null>(null);
const AuthProvider: FC<Props> = ({ children }: Props) => {
      // Hooks
      const [auth, setAuth] = useState<IAuth | null>(getFromLocalStorage("auth"));

      // const socket = useContext(SocketContext);
      // useEffect(() => {
      //       if (auth) {
      //             console.log(socket?.id);
      //             socket.emit("addUser", auth?.user?._id);
      //             socket.on("getUsers", (users) => {
      //                   console.log("ЮЗЕРЫ:", users);
      //             });
      //             socket.emit("addAuthUserId", { auth: { id: auth?.user?._id } });

      //             socket.on("userAccountChange", (arg) => {
      //                   console.log(arg.msg);
      //                   setAuth(null);
      //             });
      //             // socket.on("connect", (art) => {
      //             //   console.log(auth?.user?._id);

      //             // });

      //             console.log(socket);
      //       }
      // }, [auth, socket]);
      // Axios
      // axios.defaults.baseURL = import.meta.env.VITE_APP_API;
      axios.defaults.baseURL = import.meta.env.VITE_APP_API;
      axios.defaults.headers.common["Authorization"] = auth?.token;
      axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

      // axios.interceptors.request.use(function (config) {
      //   // Здесь можете сделать что-нибудь с перед отправкой запроса
      //   return config;
      // }, function (error) {
      //   // Сделайте что-нибудь с ошибкой запроса
      //   return Promise.reject(error);
      // });

      axios.interceptors.response.use(
            function (response) {
                  return response;
            },
            function (error) {
                  if (error.response.status === 401 || error.status === 403) {
                        console.log(error);
                        setAuth(null);
                        romoveFromLocalStorage();
                  }
                  return Promise.reject(error);
            }
      );
      const dispatch = useAppDispatch()
      useEffect(() => {
            let data = getFromLocalStorage("auth");
            if (data) {
                  setAuth(data);
                  dispatch(setUser(data.user))
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return (
            <AuthContext.Provider value={{ auth, setAuth }}>
                  {children}
            </AuthContext.Provider>
      );
};
export { AuthContext, AuthProvider };
