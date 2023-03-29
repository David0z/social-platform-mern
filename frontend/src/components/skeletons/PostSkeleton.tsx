import styles from "./PostSkeleton.module.scss";

const PostSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.shine} />
      <div className={styles.main}>
        <div className={styles.head}>
          <div className={styles.head__image} />

          <div className={styles.head__data}>
            <div className={styles.head__name} />

            <div className={styles.head__time} />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.content__text}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <div className={styles.feedback}>
          <div className={styles.feedback__comments} />

          <div className={styles.feedback__votes}></div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
