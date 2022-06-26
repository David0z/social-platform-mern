import styles from "./Messages.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions, getConversation } from '../../store/chats/chatSlice'
import { io } from 'socket.io-client'
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

const Messages = () => {
  const [socket, setSocket] = useState(null)
  const dispatch = useDispatch()
  const { uid } = useSelector(state => state.user)
  const { userToChat, chats } = useSelector(state => state.chat)

  useEffect(() => {
    const newSocket = io(
      process.env.REACT_APP_SERVER,
      { query: { id: uid } }
    )
    setSocket(newSocket)

    newSocket.on('receive-message', (sendMessageData) => {
      dispatch(chatActions.receiveMessage(sendMessageData))
    })

    return () => {
      dispatch(chatActions.reset())
      newSocket.off('receive-message')
      newSocket.close()
    }
  }, [])

  useEffect(() => {
    if (userToChat && chats.isSuccess && chats.data.length !== 0) {
      let found = false
      let convoId = ''
      for(let i = 0; i < chats.data.length; i++) {
        for(let y = 0; y < chats.data[i].participants.length; y++) {
          if (found === true) {
            break
          }
          found = userToChat._id === chats.data[i].participants[y]._id
          if (found === true) {
            convoId = chats.data[i]._id
          }
        }
      }

      if (found === true) {
        dispatch(getConversation(convoId))
      }
    }
  }, [chats.isSuccess])

  return (
    <div className={styles.wrapper}>
      <Chat socket={socket}/>
      <Sidebar />
    </div>
  );
};

export default Messages;
