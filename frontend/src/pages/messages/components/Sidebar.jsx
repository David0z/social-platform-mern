import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChats,
  getConversation,
  chatActions,
} from "../../../store/chats/chatSlice";
import styles from "../Messages.module.scss";
import ProfileImage from "../../../components/profile-image/ProfileImage";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";
import ChatSidebarSkeleton from "../../../components/skeletons/ChatSidebarSkeleton";

const maxTextLength = 16;

const Sidebar = () => {
  const dispatch = useDispatch();
  const { activeChat } = useSelector((state) => state.chat);
  const { data, isLoading } = useSelector((state) => state.chat.chats);
  const { uid } = useSelector((state) => state.user);

  const handleConversationChange = (convoId) => {
    if (activeChat === convoId) return;
    dispatch(chatActions.resetConversation());
    dispatch(
      chatActions.setUserToChat(
        data
          .find((chat) => chat._id === convoId)
          .participants.find((p) => p._id !== uid)
      )
    );
    dispatch(getConversation({conversationId: convoId, page: 0}));
  };

  useEffect(() => {
    dispatch(getChats());
  }, []);

  return (
    <div className={styles.sidebar}>
      <h1 className={styles.sidebar__title}>Most recent chats:</h1>
      {data.length !== 0 && !isLoading && (
        <div className={styles["sidebar__items-wrapper"]}>
          {data.map((item) => (
            <div
              key={item._id}
              className={`${styles.sidebar__item} ${
                item._id === activeChat && styles["sidebar__item--active"]
              }`}
              onClick={() => handleConversationChange(item._id)}
            >
              <ProfileImage
                className={styles.sidebar__item__image}
                profileImage={
                  item.participants.filter((p) => p._id !== uid)[0].image
                }
                alt="userToChat"
              />
              <div className={styles.sidebar__item__content}>
                <p className={styles.sidebar__item__name}>
                  {item.participants.filter((p) => p._id !== uid)[0].name}
                </p>
                <p className={styles["sidebar__item__last-msg"]}>
                  {`${item.messages[0].author === uid ? "You: " : ""}
                  ${item.messages[0].body.slice(0, maxTextLength)}${
                    item.messages[0].body.length > maxTextLength ? "..." : ""
                  }`}
                </p>
                <p className={styles.sidebar__item__date}>
                  {formatDistanceToNow(parseISO(item.messages[0].createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {isLoading && <ChatSidebarSkeleton number={5} />}
    </div>
  );
};

export default Sidebar;
