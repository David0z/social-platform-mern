import styles from "./PostsMenu.module.scss";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

const PostsMenu = () => {
  return (
    <div className={styles.wrapper}>
      <menu className={styles.menu}>
        <li>
          <NavLink
            end
            to="/posts"
            className={({ isActive }) =>
              isActive ? styles.link__active : styles.link
            }
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/posts/hot/6"
            className={({ isActive }) =>
              isActive ? styles.link__active : styles.link
            }
          >
            <Icon icon="bxs:hot" />6 hours
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/posts/hot/12"
            className={({ isActive }) =>
              isActive ? styles.link__active : styles.link
            }
          >
            <Icon icon="bxs:hot" />
            12 hours
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/posts/hot/24"
            className={({ isActive }) =>
              isActive ? styles.link__active : styles.link
            }
          >
            <Icon icon="bxs:hot" />
            24 hours
          </NavLink>
        </li>
      </menu>
    </div>
  );
};

export default PostsMenu;
