import React from "react";
import styles from "./Navbar.module.scss";
import { ReactComponent as Logo } from "../../utils/logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link to='/'>
        <Logo className={styles.navbar__logo} />
      </Link>
      <ul className={styles['navbar__buttons-wrapper']}>
        <li>
          <Link to='/sign-up'>
            <button className={styles['navbar__buttons-wrapper--button']}>Sign Up</button>
          </Link>
        </li>
        <li>
          <Link to='/login'>
            <button className={styles['navbar__buttons-wrapper--button']}>Login</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
