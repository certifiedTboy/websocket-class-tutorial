import { useContext, useState, useRef } from "react";
import { ChatContext } from "../../store/chat-context";

const ChatForm = () => {
  const chatCtx = useContext(ChatContext);
  const [message, setMessage] = useState<string>("");

  const focusInput = useRef<HTMLInputElement>(null);

  const sendMessageHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!message) {
      return;
    }

    chatCtx.sendMessage(message, chatCtx.currentUser);
    setMessage("");
    chatCtx.listenToChatEvents();
    focusInput?.current?.focus();
  };
  return (
    <form onSubmit={sendMessageHandler}>
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Type message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          ref={focusInput}
        />
      </div>
    </form>
  );
};

export default ChatForm;
