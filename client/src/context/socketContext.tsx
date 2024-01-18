// socketContext.ts
import React, { createContext, useContext, FC, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useAppDispatch } from "../hooks/redux";
import { addNotification } from "../slices/notification.slice";

interface SocketProviderProps {
      children?: React.ReactElement
      userId?: string
}
const SocketContext = createContext<Socket | undefined>(undefined);

export const SocketProvider: FC<SocketProviderProps> = ({ children, userId }) => {
      const [socket, setSocket] = useState<Socket | undefined>(undefined);
      const dispatch = useAppDispatch()
      useEffect(() => {
            const newSocket = io(import.meta.env.VITE_APP_API);
            newSocket.emit("joinRoom", userId);
            setSocket(newSocket);


            newSocket.on("notification", (data) => {
                  dispatch(addNotification(data));
            });

            return () => {
                  // Отключение сокета при размонтировании компонента
                  newSocket.disconnect();
                  newSocket.off("notification");
            };
      }, [userId]);
      return (
            <SocketContext.Provider value={socket}>
                  {children}
            </SocketContext.Provider>
      );
};

export const useSocket = () => useContext(SocketContext);