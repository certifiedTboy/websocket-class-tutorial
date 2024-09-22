import ChatContextProvider from "../store/chat-context";
import Chat from "../components/ChatComponents/Chat";
const ChatPage = () => {
  return (
    <ChatContextProvider>
      <Chat />
    </ChatContextProvider>
  );
};

export default ChatPage;
