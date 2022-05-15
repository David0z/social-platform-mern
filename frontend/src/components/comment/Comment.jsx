import styles from "./Comment.module.scss";
import DefaultProfileImage from "../../utils/profile-template.svg";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.author}>
        <Link to={`/users/${comment.author._id}`}>
          <img
            src={
              comment.author.image !== ""
                ? comment.author.image
                : DefaultProfileImage
            }
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
