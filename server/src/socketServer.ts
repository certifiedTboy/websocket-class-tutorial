import { Server } from "socket.io";
import {
  userJoin,
  getCurrentUser,
  getRoomUsers,
  userLeave,
} from "./utils/socket";
import MessageFormat from "./utils/messageForm";
import { createChat } from "./services/chatServices";

const listen = (io: Server) => {
  const bot = { name: "Chat-AI" };
  io.on("connection", (socket) => {
    socket.on("joinRoom", (chatData) => {
      const user = userJoin(socket.id, chatData.username, chatData.room);

      socket.join(user.room);

      // socket.emit(
      //   "message",
      //   new MessageFormat(bot.name, `Welcome to ${user.room}`)
      // );
      // Broadcast to other room users when a user connects

      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          new MessageFormat(bot.name, `${user.username} has joined the chat`)
        );

      // Send users and room info to client
      io.to(user.room).emit("roomUsers", {
        users: getRoomUsers(user.room),
      });
    });

    socket.on("chatMessage", async (messageData) => {
      const user = getCurrentUser(socket.id);
      if (user) {
        const message = new MessageFormat(
          user?.username,
          messageData?.message,
          messageData?.uploadedFile
        );
        io.to(user.room).emit("message", message);

        await createChat(
          user.room,
          messageData.message,
          messageData.uploadedFile,
          user.username
        );
      }
    });

    socket.on("leaveRoom", (userData) => {
      const user = userLeave(socket.id);
      if (user) {
        socket.broadcast
          .to(user.room)
          .emit(
            "message",
            new MessageFormat(bot.name, `${user.username} has left the chat`)
          );

        io.to(user.room).emit("roomUsers", {
          users: getRoomUsers(user.room),
        });
      }
    });

    socket.on("disconnect", () => {
      const user = userLeave(socket.id);

      if (user) {
        socket.broadcast
          .to(user.room)
          .emit(
            "message",
            new MessageFormat(bot.name, `${user.username} has left the chat`)
          );

        io.to(user.room).emit("roomUsers", {
          users: getRoomUsers(user.room),
        });
      }
    });
  });
};

export default listen;
