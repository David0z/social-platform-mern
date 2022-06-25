import styles from "../Messages.module.scss";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../../../components/profile-image/ProfileImage";
import { useState } from "react";
import { sendMessage } from "../../../store/chats/chatSlice";
import MessageItem from "./MessageItem";

const Chat = () => {
  const dispatch = useDispatch();
  const {
    userToChat,
    activeChat,
    sendMessage: sendingMessage,
  } = useSelector((state) => state.chat);
  const { data: conversationData, isLoading } = useSelector(state => state.chat.conversation)
  const { uid } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");

  const handleMessageSend = () => {
    if (message === "" || (!activeChat && !userToChat)) {
      return;
    }

    const messageData = {
      conversationId: activeChat,
      sender: uid,
      recepient: userToChat._id,
      messageBody: message,
    };

    dispatch(sendMessage(messageData));

    setMessage("");
  };

  return (
    <div className={styles["chat-area"]}>
      {userToChat && (
        <div className={styles["top-bar"]}>
          <ProfileImage
            className={styles["top-bar__image"]}
            profileImage={userToChat.image}
            alt="userToChat"
          />
          <div className={styles["top-bar__details"]}>
            <h1 className={styles["top-bar__name"]}>{userToChat.name}</h1>
          </div>
        </div>
      )}
      <div className={styles.content}>
        {conversationData.length !== 0 && !isLoading && conversationData.messages.map(message => (
          <MessageItem message={message} participants={conversationData.participants} key={message._id}/>
        ))}
      </div>
      <div className={styles["bottom-bar"]}>
        <input
          type="text"
          className={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className={styles["send-btn"]}
          onClick={handleMessageSend}
          disabled={sendingMessage.isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
