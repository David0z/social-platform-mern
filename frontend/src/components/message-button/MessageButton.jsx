import styles from "./MessageButton.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { chatActions } from '../../store/chats/chatSlice'

const MessageButton = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleMessageUser = () => {
    dispatch(chatActions.setUserToChat(user))
    navigate("/messages");
  };

  return (
    <button
      className={styles.button}
      onClick={handleMessageUser}
    >
      Message User
    </button>
  );
};

export default MessageButton;
