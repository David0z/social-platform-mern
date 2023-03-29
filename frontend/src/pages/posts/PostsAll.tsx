import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, postActions } from "../../store/post/postSlice";
import PostsList from "../../components/posts-list/PostsList";
import PostSkeletonList from "../../components/skeletons/PostSkeletonList";
import styles from "./Posts.module.scss";
import usePagination from "../../hooks/usePagination";

const PostsAll = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, hasMore } = useSelector((state) => state.post.posts);
  const { page, lastPostElementRef, date, setDate } = usePagination(hasMore, isLoading);

  useEffect(() => {
    if (date) {
      dispatch(getAllPosts({page, date}));
    } else {
      const newDate = new Date();
      setDate(newDate)
      dispatch(getAllPosts({page, date: newDate}));
    }
  }, [dispatch, page]);

  useEffect(() => {
    return () => dispatch(postActions.reset());
  }, [dispatch])

  return (
    <>
      {!isLoading && posts.length === 0 && (
        <h1 className={styles["no-posts"]}>No posts to display</h1>
      )}
      {posts.length > 0 && (
        <PostsList posts={posts} lastPostElementRef={lastPostElementRef} />
      )}
      {isLoading && <PostSkeletonList number={3} />}
    </>
  );
};

export default PostsAll;
