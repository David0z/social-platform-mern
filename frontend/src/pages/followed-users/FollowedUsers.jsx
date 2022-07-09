import styles from "./FollowedUsers.module.scss";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { getFollowedUsers, userActions } from "../../store/user/userSlice"
import { postActions } from "../../store/post/postSlice"
import PostsList from "../../components/posts-list/PostsList"
import PostSkeletonList from "../../components/skeletons/PostSkeletonList"
import usePagination from "../../hooks/usePagination";

const FollowedUsers = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, hasMore } = useSelector(
    (state) => state.user.followed
  );
  const { posts } = useSelector((state) => state.post.posts);
  const { page, lastPostElementRef, date, setDate } = usePagination(hasMore, isLoading);

  useEffect(() => {
    if (date) {
      dispatch(getFollowedUsers({page, date}));
    } else {
      const newDate = new Date()
      setDate(newDate)
      dispatch(getFollowedUsers({page, date: newDate}));
    }
  }, [dispatch, page])

  useEffect(() => {
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
      {posts.length > 0 && (
        <PostsList posts={posts} lastPostElementRef={lastPostElementRef} />
      )}
      {isLoading && <PostSkeletonList number={3} />}
    </>
  );
};

export default FollowedUsers;

