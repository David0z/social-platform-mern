import styles from "./ErrorMessage.module.scss";
import { Icon } from '@iconify/react';

const ErrorMessage = ({message, className}) => {
  return (
    <div className={`${styles["error-wrapper"]} ${className}`}>
      <Icon
        icon="ant-design:warning-filled"
        className={styles["error-wrapper__icon"]}
      />
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
