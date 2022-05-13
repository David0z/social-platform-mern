import styles from "../PostPreview.module.scss";
import { Icon } from "@iconify/react";

const clicked = false;

const Upvote = () => {
  return (
    <button className={styles.feedback__votes__button}>
      {!clicked ? (
        <Icon
          icon="ant-design:up-square-outlined"
          className={styles.feedback__votes__button__icon}
        />
      ) : (
        <Icon
          icon="ant-design:up-square-filled"
          className={styles["feedback__votes__button__icon--clicked--upvote"]}
        />
      )}
    </button>
  );
};

export default Upvote;
