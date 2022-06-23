import styles from "./Messages.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from '../../store/chats/chatSlice'
import { io } from 'socket.io-client'
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

const Messages = () => {
  const [socket, setSocket] = useState(null)
  const dispatch = useDispatch()
  const { uid } = useSelector(state => state.user)

  useEffect(() => {
    const newSocket = io(
      process.env.REACT_APP_SERVER,
      { query: { id: uid } }
    )
    setSocket(newSocket)

    return () => {
      dispatch(chatActions.reset())
      newSocket.close()
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <Chat />
      <Sidebar />
    </div>
  );
};

export default Messages;
