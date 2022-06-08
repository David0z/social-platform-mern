import styles from "./User.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser, userActions } from "../../store/user/userSlice";
import { postActions } from "../../store/post/postSlice";
import { useParams } from "react-router-dom";
import PostsList from "../../components/posts-list/PostsList";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";
import UserSkeleton from "../../components/skeletons/UserSkeleton";
import PostSkeletonList from "../../components/skeletons/PostSkeletonList";
import ProfileImage from "../../components/profile-image/ProfileImage";

const User = () => {
  const dispatch = useDispatch();
  const { id: userId } = useParams();
  const { user, isLoading, isSuccess, isError } = useSelector(
    (state) => state.user.fetchedUser
  );
  const { posts } = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(fetchUser(userId));

    const reset = () => {
      dispatch(userActions.resetFetchedUser());
      dispatch(postActions.reset());
    };

    return () => reset();
  }, [dispatch, userId]);

  return (
    <>
      {!isLoading && !isError && user && (
        <>
          <div className={styles.userbar}>
            <div className={styles.userbar__wrapper}>
              <ProfileImage
                profileImage={user.image}
                alt="Profile Image"
                className={styles.userbar__image}
              />
              <div className={styles.userbar__details}>
                <h1 className={styles.userbar__name}>{user.name}</h1>
                <p
                  className={styles.userbar__joined}
                >{`Joined ${formatDistanceToNow(parseISO(user.createdAt), {
                  addSuffix: true,
                })}`}</p>
                <p className={styles["userbar__posts-count"]}>
                  {posts.length === 1
                    ? `${posts.length} post`
                    : `${posts.length} posts`}
                </p>
              </div>
            </div>
          </div>
          <PostsList
            posts={posts.map((post) => ({
              ...post,
              creator: {
                _id: user._id,
                name: user.name,
                image: user.image,
              },
            }))}
          />
        </>
      )}
      {!isLoading && !isError && user && posts.length === 0 && (
        <h1>No posts to display</h1>
      )}
      {/* 62794e0b481dd79190a7ec06 */}
      {!isLoading && isError && <h1>Couldn't find the user</h1>}
      {isLoading && (
        <>
          <UserSkeleton />
          <PostSkeletonList number={3} />
        </>
      )}
    </>
  );
};

export default User;
