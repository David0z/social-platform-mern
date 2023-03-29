import styles from './ChatSkeleton.module.scss'

const ChatSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Loading messages...</h1>
    </div>
  )
}

export default ChatSkeleton