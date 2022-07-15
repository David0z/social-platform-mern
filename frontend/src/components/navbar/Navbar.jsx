import React from "react";
import styles from "./Navbar.module.scss";
import { ReactComponent as Logo } from "../../utils/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/user/userSlice";
import { Icon } from "@iconify/react";
import Modal from "../modal/Modal";
import useModal from "../../hooks/useModal";

const Navbar = () => {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { openModal, closeModal, isModalOpened } = useModal();

  const onLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.navbar__logo__link}>
        <Logo className={styles.navbar__logo} />
      </Link>
      <ul className={styles["navbar__buttons-wrapper"]}>
        <li>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              isActive ? `${styles.button__nav} ${styles["button__nav--active"]}` : styles.button__nav
            }
          >
            <Icon icon="ant-design:home-filled" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/hashtags"
            className={({ isActive }) =>
              isActive ? `${styles.button__nav} ${styles["button__nav--active"]}` : styles.button__nav
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
                  isActive ? `${styles.button__nav} ${styles["button__nav--active"]}` : styles.button__nav
                }
              >
                <Icon icon="bxs:user" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/messages"
                className={({ isActive }) =>
                  isActive ? `${styles.button__nav} ${styles["button__nav--active"]}` : styles.button__nav
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
      <Icon
        icon="dashicons:menu-alt3"
        className={styles.hammenu}
        onClick={openModal}
      />
      {isModalOpened && (
        <Modal onClose={closeModal}>
          <ul className={styles.navbar_list}>
            <li>
              <NavLink
                to="/posts"
                className={({ isActive }) =>
                  isActive ? `${styles.list_btn} ${styles["button__nav--active"]}` : styles.list_btn
                }
              >
                <Icon icon="ant-design:home-filled" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hashtags"
                className={({ isActive }) =>
                  isActive ? `${styles.list_btn} ${styles["button__nav--active"]}` : styles.list_btn
                }
              >
                <Icon icon="fa-brands:slack-hash" /> Hashtags
              </NavLink>
            </li>
            {!token ? (
              <>
                <li>
                  <Link to="/sign-up">
                    <button
                      className={styles.action_btn}
                    >
                      Sign Up
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <button
                      className={styles.action_btn}
                    >
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
                      isActive
                        ? `${styles.list_btn} ${styles["button__nav--active"]}`
                        : styles.list_btn
                    }
                  >
                    <Icon icon="bxs:user" /> Followed Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/messages"
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.list_btn} ${styles["button__nav--active"]}`
                        : styles.list_btn
                    }
                  >
                    <Icon icon="eva:message-circle-fill" /> Messages
                  </NavLink>
                </li>
                <li>
                  <button
                    className={styles.action_btn}
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
