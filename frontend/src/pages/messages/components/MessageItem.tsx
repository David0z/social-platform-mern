import styles from "./MessageItem.module.scss";
import ProfileImage from "../../../components/profile-image/ProfileImage";

const MessageItem = ({ message, participants, lastMessageRef, nextMessage, userMessage, firstMessageRef }) => {
  return (
    <div className={`${styles.wrapper} ${userMessage ? styles["user-message"] : ''}`} ref={firstMessageRef || lastMessageRef}>

      {nextMessage?.author === message.author ? null : <ProfileImage
        className={styles.image}
        profileImage={participants.find(p => p._id === message.author).image}
        alt="userPhoto"
      />}

      <p className={`${styles.content} ${nextMessage?.author !== message.author ? styles["last-message"] : ''}`}>
        {message.body}
      </p>
    </div>
  );
};

export default MessageItem;
