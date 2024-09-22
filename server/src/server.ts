import http from "http";
import { Server } from "socket.io";
import app from "./app";
import listen from "./socketServer";
import envVariables from "./config";

const { PORT } = envVariables;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const startServer = () => {
  httpServer.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });

  listen(io);
};

startServer();
