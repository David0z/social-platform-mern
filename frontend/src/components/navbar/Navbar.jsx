import React from "react";
import styles from "./Navbar.module.scss";
import { ReactComponent as Logo } from "../../utils/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/user/userSlice";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.navbar}>
      <Link to="/">
        <Logo className={styles.navbar__logo} />
      </Link>
      <ul className={styles["navbar__buttons-wrapper"]}>
        <li>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              isActive ? styles["button__nav--active"] : styles.button__nav
            }
          >
            <Icon icon="ant-design:home-filled" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/hashtags"
            className={({ isActive }) =>
              isActive ? styles["button__nav--active"] : styles.button__nav
            }
          >
            <Icon icon="fa-brands:slack-hash" />
          </NavLink>
        </li>
        {!token ? (
          <>
            <li className={styles.button__signup}>
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
          <>
            <li>
              <NavLink
                to="/followed"
                className={({ isActive }) =>
                  isActive ? styles["button__nav--active"] : styles.button__nav
                }
              >
                <Icon icon="bxs:user" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/messages"
                className={({ isActive }) =>
                  isActive ? styles["button__nav--active"] : styles.button__nav
                }
              >
                <Icon icon="eva:message-circle-fill" />
              </NavLink>
            </li>
            <li className={styles.button__logout}>
              <button
                className={styles["navbar__buttons-wrapper--button"]}
                onClick={onLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
