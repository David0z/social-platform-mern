import styles from "./VotesList.module.scss";
import { useState } from "react";

const VotesList = ({ postId }) => {
  const [activeType, setActiveType] = useState("upvotes");

  return (
    <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
      <div>
        <div className={styles.buttons__wrapper}>
          <button
            className={styles.button}
            onClick={() => setActiveType("upvotes")}
          >
            Upvotes
          </button>
          <button
            className={styles.button}
            onClick={() => setActiveType("downvotes")}
          >
            Downvotes
          </button>
        </div>
        <div
          className={`${styles.indicator} ${
            activeType === "upvotes"
              ? styles.indicator__upvote
              : styles.indicator__downvote
          }`}
        />
      </div>
    </div>
  );
};

export default VotesList;
