import styles from "./HashtagList.module.scss";

const HashtagList = ({
  title,
  hashtags,
  seperator,
  onClick,
  setDisplayedContent,
}) => {
  return (
    <div className={`${styles.wrapper} ${seperator && styles.seperator}`}>
      <p
        className={`${styles.title} ${onClick && styles.clickable}`}
        onClick={onClick}
      >
        {title}
      </p>
    </div>
  );
};

export default HashtagList;
