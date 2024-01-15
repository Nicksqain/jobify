// socketContext.ts
import React, { createContext, useContext, FC, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface SocketProviderProps {
      children?: React.ReactElement
      userId?: string
}
const SocketContext = createContext<Socket | undefined>(undefined);

export const SocketProvider: FC<SocketProviderProps> = ({ children, userId }) => {
      const [socket, setSocket] = useState<Socket | undefined>(undefined);

      useEffect(() => {
            const newSocket = io(import.meta.env.VITE_APP_API);
            newSocket.emit("joinRoom", userId);
            setSocket(newSocket);

            return () => {
                  // Отключение сокета при размонтировании компонента
                  newSocket.disconnect();
            };
      }, [userId]);
      return (
            <SocketContext.Provider value={socket}>
                  {children}
            </SocketContext.Provider>
      );
};

export const useSocket = () => useContext(SocketContext);