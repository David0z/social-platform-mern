import styles from "./UserVote.module.scss";
import { Link } from "react-router-dom";
import ProfileImage from "../profile-image/ProfileImage";

const UserVote = ({ vote }) => {
  return (
    <div className={styles.wrapper}>
      <Link to={`/users/${vote._id}`} className={styles.link}>
        <ProfileImage
          profileImage={vote.image}
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
