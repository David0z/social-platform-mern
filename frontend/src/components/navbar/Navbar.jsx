import React from "react";
import styles from "./Navbar.module.scss";
import { ReactComponent as Logo } from "../../utils/logo.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../store/user/userSlice'

const Navbar = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={styles.navbar}>
      <Link to="/">
        <Logo className={styles.navbar__logo} />
      </Link>
      <ul className={styles["navbar__buttons-wrapper"]}>
        {!token ? (
          <>
            <li>
              <Link to="/sign-up">
                <button className={styles["navbar__buttons-wrapper--button"]}>
                  Sign Up
                </button>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <button className={styles["navbar__buttons-wrapper--button"]}>
                  Login
                </button>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button className={styles["navbar__buttons-wrapper--button"]} onClick={onLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
