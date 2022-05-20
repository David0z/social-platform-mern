import styles from "./PostPreview.module.scss";
import { Link } from "react-router-dom";
import DefaultProfileImage from "../../utils/profile-template.svg";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";
import Downvote from "./components/Downvote";
import Upvote from "./components/Upvote";
import { useSelector } from "react-redux";

const PostPreview = ({ post, children }) => {
  const { uid } = useSelector((state) => state.user);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.head}>
          <Link to={`/users/${post.creator._id}`}>
            <img
              src={
                post.creator.image !== ""
                  ? post.creator.image
                  : DefaultProfileImage
              }
              alt="Author Avatar"
              className={styles.head__image}
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
          {post.image !== "" && <img src={post.image} alt="Post Image" />}
        </div>

        <div className={styles.feedback}>
          <Link to={`/posts/${post._id}`}>
            <p className={styles.feedback__comments}>
              {post.comments.length === 0
                ? "No comments yet"
                : `${post.comments.length} comments`}
            </p>
          </Link>

          <div className={styles.feedback__votes}>
            <Upvote votes={post.votes.upvotes} uid={uid} postId={post._id} />
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
            >
              {post.votes.upvotes.length - post.votes.downvotes.length}
            </p>
            <Downvote
              votes={post.votes.downvotes}
              uid={uid}
              postId={post._id}
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default PostPreview;
