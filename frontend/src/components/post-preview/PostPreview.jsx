import styles from "./PostPreview.module.scss";
import { Link } from "react-router-dom";
import ProfileImage from "../profile-image/ProfileImage";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";
import Downvote from "./components/Downvote";
import Upvote from "./components/Upvote";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/Modal";
import useModal from "../../hooks/useModal";
import VotesList from "../votes-list/VotesList";
import CommentsList from "../../components/comments-list/CommentsList";
import CommentCreate from "../../components/comment-create/CommentCreate";
import { getComments } from "../../store/post/postSlice";
import { useState } from "react";

const PostPreview = ({ post, allowCommentFetch = true, instantComments }) => {
  const { uid } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.post.vote);
  const { closeModal, openModal, isModalOpened } = useModal();
  const dispatch = useDispatch();
  const [commentsFetched, setCommentsFetched] = useState(false);

  const handleCommentsFetch = () => {
    if (commentsFetched === false) {
      setCommentsFetched(true);
      dispatch(getComments(post._id));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.head}>
          <Link to={`/users/${post.creator._id}`}>
            <ProfileImage
              profileImage={post.creator.image}
              className={styles.head__image}
              alt="Author Avatar"
            />
          </Link>
          <div>
            <Link to={`/users/${post.creator._id}`}>
              <h1 className={styles.head__name}>{post.creator.name}</h1>
            </Link>
            <Link to={`/posts/${post._id}`}>
              <p className={styles.head__time}>
                {formatDistanceToNow(parseISO(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </Link>
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.content__text}>{post.content}</p>
          {post.image !== "" && (
            <img
              src={`http://localhost:5000/${post.image}`}
              alt="Post Image"
              className={styles.content__image}
            />
          )}
        </div>

        <div className={styles.feedback}>
          {allowCommentFetch ? (
            <p
              className={styles["feedback__comments--clickable"]}
              onClick={handleCommentsFetch}
            >
              {post.commentCounter === 0
                ? "No comments yet"
                : `${post.commentCounter} comments`}
            </p>
          ) : (
            <p className={styles.feedback__comments}>
              {post.commentCounter === 0
                ? "No comments yet"
                : `${post.commentCounter} comments`}
            </p>
          )}

          <div className={styles.feedback__votes}>
            <Upvote
              votes={post.votes.upvotes}
              uid={uid}
              postId={post._id}
              isLoading={isLoading}
            />
            <p
              className={`${
                post.votes.upvotes.length - post.votes.downvotes.length > 0
                  ? styles.positive
                  : post.votes.upvotes.length - post.votes.downvotes.length < 0
                  ? styles.negative
                  : ""
              } ${
                post.votes.upvotes.find((id) => id === uid) ||
                post.votes.downvotes.find((id) => id === uid)
                  ? styles.voted
                  : ""
              }`}
              onClick={openModal}
            >
              {post.votes.upvotes.length - post.votes.downvotes.length}
            </p>
            {isModalOpened && (
              <Modal onClose={closeModal}>
                <VotesList
                  postId={post._id}
                  upvoteCount={post.votes.upvotes.length}
                  downvoteCount={post.votes.downvotes.length}
                />
              </Modal>
            )}
            <Downvote
              votes={post.votes.downvotes}
              uid={uid}
              postId={post._id}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      {(instantComments || commentsFetched) && (
        <>
          <hr className={styles.line} />
          {post.comments.length === 0 && post.commentCounter > 0 && (
            <h1>Loading comments...</h1> //change it later for something cool
          )}
          {post.comments.length > 0 && (
            <CommentsList
              comments={post.comments}
              postAuthorId={post.creator._id}
            />
          )}
          <CommentCreate postId={post._id} />
        </>
      )}
    </div>
  );
};

export default PostPreview;
