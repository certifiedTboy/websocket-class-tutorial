import {
  ReactNode,
  createContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { io } from "socket.io-client";

export const ChatContext = createContext({
  roomUsers: [] as { name: string }[],
  messages: [] as {
    sender: string;
    message?: string;
    uploadedFile?: string;
    messageTime: any;
  }[],
  currentUser: "",
  updateCurrentUser: (username: string) => {},
  joinRoom: (username: string, room: string) => {},
  sendMessage: (chatData: {
    message?: string | null;
    currentUser?: string | null;
    uploadedFile?: string | null;
  }) => {},
  leaveRoom: (username: string, room: string) => {},
  updateChatMessages: (room: string) => {},
});

const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [roomUsers, setRoomUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [socketMessages, setSocketMessages] = useState<
    {
      sender: string;
      message?: string;
      uploadedFile?: string;
      messageTime: any;
    }[]
  >([]);

  const API_URL = "http://localhost:3001";

  const socket = useRef(io(API_URL));

  const updateCurrentUser = useCallback((username: string) => {
    setCurrentUser(username);
  }, []);

  // join room function
  const joinRoom = useCallback((room: string, username: string) => {
    const chatSocket = socket?.current;
    chatSocket.emit("joinRoom", {
      room,
      username,
    });

    chatSocket.on("roomUsers", ({ users }) => {
      setRoomUsers(users);
    });
  }, []);

  // join room function
  const leaveRoom = useCallback((room: string, username: string) => {
    socket?.current.emit("leaveRoom", {
      room,
      username,
    });

    socket?.current.on("roomUsers", ({ users }) => {
      setRoomUsers(users);
    });
  }, []);

  const updateChatMessages = useCallback(async (room: string) => {
    const response = await fetch(`${API_URL}/chats/${room}`);

    const data = await response.json();

    if (data && data?.length > 0) {
      data.forEach((chat: any) =>
        setSocketMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: chat.sender,
            message: chat?.message,
            uploadedFile: chat?.uploadedFile,
            messageTime: chat?.createdAt,
          },
        ])
      );
    }
  }, []);

  // send message function
  const sendMessage = useCallback(
    (chatData: {
      message?: string | null;
      currentUser?: string | null;
      uploadedFile?: string | null;
    }) => {
      socket.current.emit("chatMessage", chatData);
    },
    []
  );

  useEffect(() => {
    const chatSocket = socket?.current;

    chatSocket.on("message", (message: any) => {
      setSocketMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      chatSocket.off("message");
    };
  }, [socket]);

  const value = {
    roomUsers,
    messages: socketMessages,
    currentUser,
    updateCurrentUser,
    joinRoom,
    sendMessage,
    leaveRoom,
    updateChatMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
