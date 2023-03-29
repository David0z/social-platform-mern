import styles from "./PostsMenu.module.scss";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

const PostsMenu = () => {
  const { token } = useSelector(state => state.user)
  
  return (
    <div className={`${styles.wrapper} ${!token && styles['no-token']}`}>
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
            <Icon icon="bxs:hot" />6 <span>h<span className={styles.link__text}>ours</span></span>
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
            12 <span>h<span className={styles.link__text}>ours</span></span>
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
            24 <span>h<span className={styles.link__text}>ours</span></span>
          </NavLink>
        </li>
      </menu>
    </div>
  );
};

export default PostsMenu;
