import styles from "../PostPreview.module.scss";
import { Icon } from "@iconify/react";
import useVote from "../hooks/useVote";

const Upvote = ({ votes, uid, postId }) => {
  const { handleVote } = useVote("upvote", uid, postId)
  
  return (
    <button className={styles.feedback__votes__button} onClick={handleVote}>
      {!votes.find(id => id === uid) ? (
        <Icon
          icon="ant-design:up-square-outlined"
          className={styles.feedback__votes__button__icon}
        />
      ) : (
        <Icon
          icon="ant-design:up-square-filled"
          className={styles["feedback__votes__button__icon--clicked--upvote"]}
        />
      )}
    </button>
  );
};

export default Upvote;
