import styles from '../Messages.module.scss'
import { useSelector } from "react-redux";
import ProfileImage from "../../../components/profile-image/ProfileImage";
import { useState } from 'react';


const Chat = () => {
  const { userToChat } = useSelector((state) => state.chat);
  const [message, setMessage] = useState('')

  const handleMessageSend = () => {

    if (message === '') {
      return;
    }


    setMessage('')
  }

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
        <div className={styles.content}></div>
        <div className={styles["bottom-bar"]}>
          <input type="text" className={styles.input} value={message} onChange={(e) => setMessage(e.target.value)} />
          <button className={styles["send-btn"]} onClick={handleMessageSend}>Send</button>
        </div>
      </div>
  )
}

export default Chat