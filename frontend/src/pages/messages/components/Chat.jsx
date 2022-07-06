import styles from "../Messages.module.scss";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../../../components/profile-image/ProfileImage";
import React, { useState, useEffect, useCallback } from "react";
import { sendMessage, getConversation, chatActions } from "../../../store/chats/chatSlice";
import MessageItem from "./MessageItem";
import ChatSkeleton from "../../../components/skeletons/ChatSkeleton";
import usePagination from "../../../hooks/usePagination";

const Chat = ({ socket, customPage, setCustomPage }) => {
  const dispatch = useDispatch();
  const { isSuccess, isLoading: sendMessagePending, data: sendMessageData } = useSelector(
    (state) => state.chat.sendMessage
  );
  const { userToChat, activeChat } = useSelector((state) => state.chat);
  const { data: conversationData, isLoading, hasMore } = useSelector(
    (state) => state.chat.conversation
  );
  const { uid } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const { page, setPage, lastPostElementRef: firstMessageRef } = usePagination(hasMore, isLoading, customPage)

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

  useEffect(() => {
    if (isSuccess === true) {
      if (socket === null) {
        console.log('returned');
        return;
      }
      socket.emit("send-message", sendMessageData);
    }
  }, [isSuccess]);

  const lastMessageRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true})
    }
  }, [isSuccess])

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleMessageSend()
    }
  }

  useEffect(() => {
    if (conversationData.messages?.length !== 0 && hasMore && !isLoading) {
      dispatch(getConversation({conversationId: conversationData._id, page}))
    }
  }, [dispatch, page])

  useEffect(() => {
    setPage(0)
  }, [conversationData._id])

  return (
    <div className={styles["chat-area"]}>
      {userToChat && (
        <div className={styles["top-bar"]}>
          <ProfileImage
            className={styles["top-bar__image"]}
            profileImage={userToChat.image}
            alt="userToChat"
          />
          <div>
            <h1 className={styles["top-bar__name"]}>{userToChat.name}</h1>
          </div>
        </div>
      )}
      <div className={styles.content}>
        {isLoading && <ChatSkeleton />}
        {conversationData.length !== 0 &&
          conversationData.messages.map((message, index) => {
            const lastMessage = conversationData.messages.length - 1 === index;
            return (
            <React.Fragment key={message._id}>
              {new Date(conversationData.messages[index - 1]?.createdAt).getDay() !== new Date(message.createdAt).getDay() && <p className={styles["optional-date"]}>{new Date(message.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>}
              <MessageItem
                message={message}
                participants={conversationData.participants}
                firstMessageRef={index === 0 && conversationData.messages.length > 1 ? firstMessageRef : null}
                lastMessageRef={lastMessage ? lastMessageRef : null}
                nextMessage={conversationData.messages[index + 1]}
                userMessage={uid === message.author}
              />
            </React.Fragment>
            )
          })}
      </div>
      <div className={styles["bottom-bar"]}>
        <input
          type="text"
          className={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleEnterPress}
        />
        <button
          className={styles["send-btn"]}
          onClick={handleMessageSend}
          disabled={sendMessagePending}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
