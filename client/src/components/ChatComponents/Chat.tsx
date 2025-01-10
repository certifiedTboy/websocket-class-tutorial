import { useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import { ChatContext } from "../../store/chat-context";
import Message from "./Message";
import ChatForm from "./ChatForm";
import botImage from "../../Assets/bot.png";
import styles from "./Chat.module.css";

const Chat = () => {
  const chatCtx = useContext(ChatContext);
  const [searchParams] = useSearchParams();

  const room = searchParams.get("room");
  const username = searchParams.get("username");

  const navigate = useNavigate();

  // const location = useLocation();

  useEffect(() => {
    if (room) {
      chatCtx.updateChatMessages(room);
    }
  }, [room]);

  useEffect(() => {
    const currentUser = localStorage.getItem("user");

    if (currentUser) {
      chatCtx.updateCurrentUser(currentUser);
    }
  }, []);

  useEffect(() => {
    if (username && room) {
      chatCtx.joinRoom(room, username);
    }
  }, []);

  // useEffect(() => {
  //   const currentPath = location.pathname;

  //   console.log(currentPath);

  //   // This function runs when the component unmounts or when the route changes.
  //   return () => {
  //     // if (currentPath === "/") {
  //     console.log(currentPath);
  //     chatCtx.leaveRoom(room || "", username || "");
  //     // }
  //   };
  // }, [location]);

  return (
    <section className={`container-fluid ${styles.chat_container}`}>
      <div className="row">
        <h1 className="mt-2">{room}</h1>

        <div className={`col-lg-2 ${styles.room_users}`}>
          <div className={styles.roomUsers}>
            {chatCtx.roomUsers.map((user: any, index: number) => {
              return (
                <div className={styles.username} key={index}>
                  <h4>{user.username}</h4>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-lg-10">
          <div className={`${styles.messages}`}>
            <ScrollToBottom className={styles.chatBoxTop}>
              {chatCtx.messages.length > 0 &&
                chatCtx.messages.map((message: any) => {
                  return (
                    <Message
                      key={Math.floor(Math.random() * 100000)}
                      sender={message.sender}
                      userImage={botImage}
                      message={message?.message}
                      own={message.sender === chatCtx.currentUser}
                      uploadedFile={message?.uploadedFile}
                      messageTime={message?.messageTime}
                    />
                  );
                })}
            </ScrollToBottom>
          </div>

          <ChatForm />
        </div>
      </div>
    </section>
  );
};

export default Chat;
