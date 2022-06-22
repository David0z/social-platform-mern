import styles from "./FollowButton.module.scss"
import { Icon } from "@iconify/react";

const FollowButton = ({followCondition, onClick}) => {
  return (
    <button
      className={
        followCondition
          ? styles["follow-btn--followed"]
          : styles["follow-btn"]
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
