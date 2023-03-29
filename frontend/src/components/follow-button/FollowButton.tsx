import styles from "./FollowButton.module.scss"
import { Icon } from "@iconify/react";

const FollowButton = ({followCondition, onClick, className}) => {
  return (
    <button
      className={`${
        followCondition
          ? styles["follow-btn--followed"]
          : styles["follow-btn"]} ${className}`
      }
      onClick={onClick}
    >
      {followCondition ? (
        <>
          <Icon icon="akar-icons:circle-check-fill" />
          Following
        </>
      ) : (
        "Follow"
      )}
    </button>
  );
};

export default FollowButton;
