import styles from "./FollowedUsers.module.scss";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { getFollowedUsers, userActions } from "../../store/user/userSlice"
import { postActions } from "../../store/post/postSlice"
import PostsList from "../../components/posts-list/PostsList"
import PostSkeletonList from "../../components/skeletons/PostSkeletonList"

const FollowedUsers = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.user.followed
  );
  const { posts } = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getFollowedUsers());

    return () => {
      dispatch(postActions.reset())
      dispatch(userActions.resetFollowed())
    };
  }, [dispatch]);

  return (
    <>
      <h1 className={styles["followed-header"]}>
        Recent posts from followed users:
      </h1>
      {!isLoading && posts.length === 0 && <h1 className={styles["no-posts"]}>No posts to display</h1>}
      {posts && !isLoading ? (
        <PostsList posts={posts} />
      ) : (
        <PostSkeletonList number={3} />
      )}
    </>
  );
};

export default FollowedUsers;

