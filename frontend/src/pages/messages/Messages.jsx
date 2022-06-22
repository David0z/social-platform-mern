import styles from "./Messages.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../../components/profile-image/ProfileImage";
import { chatActions } from '../../store/chats/chatSlice'
import { io } from 'socket.io-client'

const Messages = () => {
  // const [socket, setSocket] = useState(null)
  const dispatch = useDispatch()
  const { uid } = useSelector(state => state.user)
  const { userToChat } = useSelector((state) => state.chat);

  useEffect(() => {
    const newSocket = io(
      process.env.REACT_APP_SERVER,
      { query: { id: uid } }
    )
    // setSocket(newSocket)

    return () => {
      dispatch(chatActions.reset())
      newSocket.close()
    }
  }, [])

  return (
    <div className={styles.wrapper}>
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
        <div className={styles.content}></div>
        <div className={styles["bottom-bar"]}>
          <input type="text" className={styles.input} />
          <button className={styles["send-btn"]}>Send</button>
        </div>
      </div>
      <div className={styles.sidebar}>
        <h1 className={styles.title}>Most recent chats:</h1>
      </div>
    </div>
  );
};

export default Messages;
