import styles from "./User.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser, followUser, userActions } from "../../store/user/userSlice";
import { postActions } from "../../store/post/postSlice";
import { useParams } from "react-router-dom";
import PostsList from "../../components/posts-list/PostsList";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";
import UserSkeleton from "../../components/skeletons/UserSkeleton";
import PostSkeletonList from "../../components/skeletons/PostSkeletonList";
import ProfileImage from "../../components/profile-image/ProfileImage";
import FollowButton from "../../components/follow-button/FollowButton";
import MessageButton from "../../components/message-button/MessageButton";
import usePagination from "../../hooks/usePagination";

const User = () => {
  const dispatch = useDispatch();
  const { id: userId } = useParams();
  const { user, isLoading, isSuccess, isError, hasMore } = useSelector(
    (state) => state.user.fetchedUser
  );
  const { posts } = useSelector((state) => state.post.posts);
  const { token, uid } = useSelector((state) => state.user);
  const { page, setPage, lastPostElementRef } = usePagination(
    hasMore,
    isLoading
  );

  useEffect(() => {
    dispatch(fetchUser({ userId, page }));
  }, [dispatch, userId, page]);

  useEffect(() => {
    return () => {
      dispatch(userActions.resetFetchedUser());
      dispatch(postActions.reset());
      setPage(0);
    };
  }, [dispatch, userId]);

  const handleUserFollow = () => {
    dispatch(followUser(user._id));
  };

  return (
    <>
      {isLoading && !user && <UserSkeleton />}
      {!isError && user && (
        <div className={styles.userbar}>
          <div className={styles.userbar__wrapper}>
            <ProfileImage
              profileImage={user.image}
              alt="Profile Image"
              className={styles.userbar__image}
            />
            <div className={styles.userbar__details}>
              <div>
                <h1 className={styles.userbar__name}>{user.name}</h1>
                <p
                  className={styles.userbar__joined}
                >{`Joined ${formatDistanceToNow(parseISO(user.createdAt), {
                  addSuffix: true,
                })}`}</p>
                <p className={styles["userbar__posts-count"]}>
                  {user.numberOfPosts === 1
                    ? `${user.numberOfPosts} post`
                    : `${user.numberOfPosts} posts`}
                </p>
                <p className={styles["userbar__followers-count"]}>
                  {user.followers === 1
                    ? `${user.followers} follower`
                    : user.followers === 0
                    ? "No followers"
                    : `${user.followers} followers`}
                </p>
              </div>

              {token && (
                <div className={styles["action-buttons"]}>
                  <FollowButton
                    followCondition={user.isUserFollowing}
                    onClick={handleUserFollow}
                  />
                  {uid !== userId && <MessageButton user={user} />}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {posts.length > 0 && user && (
        <PostsList
          posts={posts.map((post) => ({
            ...post,
            creator: {
              _id: user._id,
              name: user.name,
              image: user.image,
            },
          }))}
          lastPostElementRef={lastPostElementRef}
        />
      )}
      {!isLoading && !isError && user && posts.length === 0 && (
        <h1 className={styles["no-posts"]}>No posts to display</h1>
      )}
      {!isLoading && isError && <h1>Couldn't find the user</h1>}
      {isLoading && <PostSkeletonList number={3} />}
    </>
  );
};

export default User;
