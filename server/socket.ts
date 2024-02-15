// socket.js
import { Server, Socket } from "socket.io";

const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: `${process.env.CLIENT_URL}`,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: any) => {
    //     console.log("a user connected");

    socket.on("joinRoom", (userId: string) => {
      console.log(userId);
      socket.join(userId);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return io;
};

interface MyIo extends Server {}

interface MySocket extends Socket {}

export { MyIo, MySocket };
export default initSocket;
