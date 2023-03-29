import styles from "./MessageButton.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { chatActions } from '../../store/chats/chatSlice'
import { Icon } from '@iconify/react';

const MessageButton = ({ user, className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleMessageUser = () => {
    dispatch(chatActions.setUserToChat(user))
    navigate("/messages");
  };

  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={handleMessageUser}
    >
      <Icon icon="bi:envelope-fill" />
      Message
    </button>
  );
};

export default MessageButton;
