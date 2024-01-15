// socketMiddleware.ts
import { Middleware } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

const socketMiddleware: Middleware = (storeAPI) => (next) => (action: any) => {
  if (action.type.startsWith("notifications/")) {
    const socket: Socket = action.meta?.socket;
    if (socket) {
      action.socket = socket;
    } else {
      console.error("Socket is not provided in the action meta.");
    }
  }
  return next(action);
};

export default socketMiddleware;
