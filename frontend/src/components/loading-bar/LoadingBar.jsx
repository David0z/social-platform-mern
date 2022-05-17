import styles from "./LoadingBar.module.scss";

const LoadingBar = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__bar} />
    </div>
  );
};

export default LoadingBar;
