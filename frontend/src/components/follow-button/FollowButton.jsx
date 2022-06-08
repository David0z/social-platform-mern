import styles from "./FollowButton.module.scss"
import { Icon } from "@iconify/react";

const FollowButton = ({followCondition, token, onClick}) => {
  return (
    <button
      className={
        followCondition
          ? styles["follow-btn--followed"]
          : styles["follow-btn"]
      }
      onClick={onClick}
      style={{ visibility: token ? "visible" : "hidden" }}
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
