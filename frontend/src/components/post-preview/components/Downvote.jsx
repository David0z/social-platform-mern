import styles from "../PostPreview.module.scss";
import { Icon } from "@iconify/react";
import useVote from "../hooks/useVote";

const Downvote = ({ votes, uid, postId }) => {
  const { handleVote } = useVote("downvote", uid, postId)
  
  return (
    <button className={styles.feedback__votes__button} onClick={handleVote}>
      {!votes.find(id => id === uid) ? (
        <Icon
          icon="ant-design:down-square-outlined"
          className={styles.feedback__votes__button__icon}
        />
      ) : (
        <Icon
          icon="ant-design:down-square-filled"
          className={styles["feedback__votes__button__icon--clicked--downvote"]}
        />
      )}
    </button>
  );
};

export default Downvote;
