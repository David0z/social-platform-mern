import styles from "./User.module.scss";
import DefaultProfileImage from "../../utils/profile-template.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser, userActions } from "../../store/user/userSlice";
import { useParams } from "react-router-dom";
import PostsList from '../../components/posts-list/PostsList'

const User = () => {
  const dispatch = useDispatch();
  const { id: userId } = useParams();
  const { user, isLoading, isSuccess, isError } = useSelector(
    (state) => state.user.fetchedUser
  );

  useEffect(() => {
    dispatch(fetchUser(userId));

    return () => dispatch(userActions.resetFetchedUser());
  }, [dispatch]);

  return (
    <>
      {!isLoading && !isError && user && (
        <div className={styles.userbar}>
          <div className={styles.userbar__wrapper}>
            <img
              src={user.image !== "" ? user.image : DefaultProfileImage}
              alt="Profile Image"
              className={styles.userbar__image}
            />
            <div className={styles.userbar__details}>
              <h1 className={styles.userbar__name}>{user.name}</h1>
              <p className={styles["userbar__posts-count"]}>
                {user.posts.length === 1
                  ? `${user.posts.length} post`
                  : `${user.posts.length} posts`}
              </p>
            </div>
          </div>
        </div>
      )}
      {!isLoading && !isError && user ? <PostsList posts={user.posts.map(post => ({
        ...post,
        creator: {
          _id: user._id,
          name: user.name,
          image: user.image
        }
      }))} /> : <h1>Loading...</h1>}
    </>
  );
};

export default User;
