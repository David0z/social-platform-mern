import styles from "./UserSkeleton.module.scss";

const UserSkeleton = () => {
  return (
    <div className={styles.userbar}>
      <div className={styles.shine}></div>
      <div className={styles.userbar__wrapper}>
        <div className={styles.userbar__image} />
        <div className={styles.userbar__details}>
          <div className={styles.userbar__name} />
          <div className={styles.userbar__joined} />
          <div className={styles["userbar__posts-count"]} />
        </div>
      </div>
    </div>
  );
};

export default UserSkeleton;
