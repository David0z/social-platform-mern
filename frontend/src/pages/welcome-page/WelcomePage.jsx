import styles from "./WelcomePage.module.scss";
import { ReactComponent as Watermark } from "../../utils/watermark.svg";
import { ReactComponent as Logo } from "../../utils/main-logo.svg";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className={styles.main}>
      <Watermark className={styles.watermark} />
      <div className={styles.main__wrapper}>
        <Logo className={styles.logo} />
        <div className={styles.bio}>
          <p>
            Post your thoughts, comment and share pictures with people just like
            you
          </p>
          <Link to='/sign-up'>
            <button>Join us now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
