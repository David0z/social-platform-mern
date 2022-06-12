import styles from "./HashtagSkeleton.module.scss";

const HashtagSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.shine}/>
      <div className={styles.content}>
        <div className={styles.content__name} />
        <div className={styles.follow} />
        <div className={styles.content__paragraph} />
      </div>
    </div>
  );
};

export default HashtagSkeleton;
