import styles from "./VoteSkeleton.module.scss";

const VoteSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.shine} />
      <div className={styles.image} />
      <div className={styles.name} />
    </div>
  );
};

const VoteSkeletonList = ({ number }) => {
  return (
    <div className={styles.list__wrapper}>
      {[...Array(number)].map((number, i) => (
        <VoteSkeleton key={i} />
      ))}
    </div>
  );
};

export default VoteSkeletonList;
