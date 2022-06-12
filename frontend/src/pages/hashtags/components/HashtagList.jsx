import styles from "./HashtagList.module.scss";

const HashtagList = ({
  title,
  hashtags,
  seperator,
  onClick,
  setDisplayedContent,
  count,
  displayedContent,
  content,
}) => {
  return (
    <div className={styles.wrapper}>
      <p
        className={`${styles.title} ${onClick && styles.clickable}`}
        onClick={onClick}
      >
        {title}
      </p>
      {hashtags.length > 0 ? (
        <ul className={styles.list}>
          {hashtags.map((hashtag) => (
            <li
              key={hashtag._id}
              onClick={() =>
                setDisplayedContent(hashtag.name.slice(1, hashtag.name.length))
              }
              className={`${styles.list__element} ${
                displayedContent === hashtag.name.slice(1, hashtag.name.length)
                  ? styles["list__element--active"]
                  : ""
              }`}
            >
              {`${hashtag.name}${count ? ` (${hashtag.count})` : ""}`}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles["no-content"]}>
          {content === "followed"
            ? "(No hashtags followed)"
            : "(No popular hashtags this week)"}
        </p>
      )}
    </div>
  );
};

export default HashtagList;
