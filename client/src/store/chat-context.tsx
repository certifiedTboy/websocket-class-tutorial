import { ReactNode, createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";

export const ChatContext = createContext({
  roomUsers: [] as { name: string }[],
  messages: [] as { name: string; message: string }[],
  currentUser: "",
  updateCurrentUser: (username: string) => {},
  joinRoom: (username: string, room: string) => {},
  sendMessage: (message: string, username: string) => {},
  listenToChatEvents: () => {},
});

const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [roomUsers, setRoomUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [socketMessages, setSocketMessages] = useState<
    { name: string; message: string }[]
  >([]);

  const API_URL = "http://localhost:3001";

  const socket = useRef(io(API_URL));

  const updateCurrentUser = (username: string) => {
    setCurrentUser(username);
  };

  // join room function
  const joinRoom = (room: string, username: string) => {
    socket?.current.emit("joinRoom", {
      room,
      username,
    });

    socket?.current.on("roomUsers", ({ users }) => {
      setRoomUsers(users);
    });
  };

  // send message function
  const sendMessage = (message: string, username: string) => {
    socket.current.emit("chatMessage", { message, username });
  };

  const listenToChatEvents = () => {
    socket?.current.on("message", (message: any) => {
      setSocketMessages((prevMessages) => [...prevMessages, message]);
    });
  };
  const value = {
    roomUsers,
    messages: socketMessages,
    currentUser,
    updateCurrentUser,
    joinRoom,
    sendMessage,
    listenToChatEvents,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
