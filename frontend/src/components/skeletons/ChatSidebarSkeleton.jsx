import styles from './ChatSidebarSkeleton.module.scss'

const ChatSidebarSkeleton = ({ number }) => {
  return (
    <div className={styles["items-wrapper"]}>
      {[...Array(number)].map((number, i) => (
      <div key={i} className={styles.item}>
        <div className={styles.shine}/>
        <div className={styles.item__image}/>
        <div className={styles.item__content}>
          <div className={styles.item__name}/>
          <div className={styles.item__message}/>
          <div className={styles.item__date}/>
        </div>
      </div>
      ))}
    </div>
  )
}

export default ChatSidebarSkeleton