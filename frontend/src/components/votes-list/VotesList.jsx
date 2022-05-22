import styles from "./VotesList.module.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVotes, postActions } from "../../store/post/postSlice";
import UserVote from "./UserVote";

const VotesList = ({ postId }) => {
  const dispatch = useDispatch();
  const [activeType, setActiveType] = useState("upvotes");

  useEffect(() => {
    dispatch(getVotes(postId));

    return () => dispatch(postActions.resetVotes());
  }, [dispatch]);

  const { votes, isLoading } = useSelector((state) => state.post.votes);

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
      {isLoading && <h1>Loading...</h1>}
      {votes && (
        <div className={styles["users-list"]}>
          {activeType === "upvotes"
            ? votes.upvotes.map((vote) => (
                <UserVote vote={vote} key={vote._id} />
              ))
            : activeType === "downvotes" &&
              votes.downvotes.map((vote) => (
                <UserVote vote={vote} key={vote._id} />
              ))}
        </div>
      )}
    </div>
  );
};

export default VotesList;
