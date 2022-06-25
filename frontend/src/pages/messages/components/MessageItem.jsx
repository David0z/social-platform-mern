import styles from './MessageItem.module.scss'

const MessageItem = ({message, participants}) => {
  return (
    <div className={styles.wrapper}>
      <p><span>{participants.find(p => p._id === message.author).name}:</span> {message.body}</p>
    </div>
  )
}

export default MessageItem