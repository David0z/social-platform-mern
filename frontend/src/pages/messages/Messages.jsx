import styles from "./Messages.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions, getConversation } from "../../store/chats/chatSlice";
import { io } from "socket.io-client";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

const Messages = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [socket, setSocket] = useState(null);
  const [customPage, setCustomPage] = useState(0);
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);
  const { userToChat, chats } = useSelector((state) => state.chat);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER, { query: { id: uid } });
    setSocket(newSocket);

    newSocket.on("receive-message", (sendMessageData) => {
      dispatch(chatActions.receiveMessage(sendMessageData));
    });

    return () => {
      dispatch(chatActions.reset());
      newSocket.off("receive-message");
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (userToChat && chats.isSuccess && chats.data.length !== 0) {
      let found = false;
      let convoId = "";
      for (let i = 0; i < chats.data.length; i++) {
        for (let y = 0; y < chats.data[i].participants.length; y++) {
          if (found === true) {
            break;
          }
          found = userToChat._id === chats.data[i].participants[y]._id;
          if (found === true) {
            convoId = chats.data[i]._id;
          }
        }
      }

      if (found === true) {
        const newDate = new Date();
        setDate(newDate);
        dispatch(
          getConversation({ conversationId: convoId, page: 0, date: newDate })
        );
        setCustomPage(1);
      }
    }
  }, [chats.isSuccess]);

  return (
    <div className={styles.wrapper} onClick={() => setIsSidebarVisible(false)}>
      <Chat
        socket={socket}
        customPage={customPage}
        setCustomPage={setCustomPage}
        date={date}
        setDate={setDate}
      />
      <Sidebar
        date={date}
        setDate={setDate}
        isSidebarVisible={isSidebarVisible}
        setIsSidebarVisible={setIsSidebarVisible}
      />
    </div>
  );
};

export default Messages;
