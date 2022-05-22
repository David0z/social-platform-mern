import styles from "./UserVote.module.scss";
import DefaultProfileImage from "../../utils/profile-template.svg";
import { Link } from "react-router-dom";

const UserVote = ({ vote }) => {
  return (
    <div className={styles.wrapper}>
      <Link to={`/users/${vote._id}`} className={styles.link}>
        <img
          src={vote.image !== "" ? vote.image : DefaultProfileImage}
          alt="Author Avatar"
          className={styles.image}
        />
      </Link>
      <Link to={`/users/${vote._id}`}>
        <p className={styles.name}>{vote.name}</p>
      </Link>
    </div>
  );
};

export default UserVote;
