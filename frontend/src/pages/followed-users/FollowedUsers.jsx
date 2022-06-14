import styles from "./FollowedUsers.module.scss";

const FollowedUsers = () => {
  return (
    <>
      <h1 className={styles["followed-header"]}>
        Recent posts from followed users:
      </h1>
    </>
  );
};

export default FollowedUsers;
