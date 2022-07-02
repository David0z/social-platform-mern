import styles from './HashtagsSkeleton.module.scss'

const HashtagsSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.shine}/>
      <div className={styles.title}/>
      <div className={styles.content}>
        <div className={styles.element}/>
        <div className={styles.element}/>
        <div className={styles.element}/>
      </div>
    </div>
  )
}

export default HashtagsSkeleton