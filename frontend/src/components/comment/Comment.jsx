import styles from "./Comment.module.scss";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileImage from "../profile-image/ProfileImage";

const Comment = ({ comment, postAuthorId }) => {
  const { uid } = useSelector((state) => state.user);

  return (
    <div
      className={`${styles.wrapper} ${
        comment.author._id === uid
          ? styles.wrapper__user
          : comment.author._id === postAuthorId
          ? styles.wrapper__op
          : ""
      }`}
    >
      <div className={styles.author}>
        <Link to={`/users/${comment.author._id}`}>
          <ProfileImage
            profileImage={comment.author.image}
            alt="Author Image"
            className={styles.author__image}
          />
        </Link>
        <div>
          <Link to={`/users/${comment.author._id}`}>
            <p className={styles.author__name}>{comment.author.name}</p>
          </Link>
          <p className={styles.author__date}>
            {formatDistanceToNow(parseISO(comment.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
      <p className={styles.content}>{comment.body}</p>
    </div>
  );
};

export default Comment;
