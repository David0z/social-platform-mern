import styles from "../PostPreview.module.scss";
import { Icon } from "@iconify/react";

const clicked = false;

const Downvote = () => {
  return (
    <button className={styles.feedback__votes__button}>
      {!clicked ? (
        <Icon
          icon="ant-design:down-square-outlined"
          className={styles.feedback__votes__button__icon}
        />
      ) : (
        <Icon
          icon="ant-design:down-square-filled"
          className={styles["feedback__votes__button__icon--clicked--downvote"]}
        />
      )}
    </button>
  );
};

export default Downvote;
