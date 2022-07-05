import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, postActions } from "../../store/post/postSlice";
import PostsList from "../../components/posts-list/PostsList";
import PostSkeletonList from "../../components/skeletons/PostSkeletonList";
import styles from "./Posts.module.scss";

const PostsAll = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, hasMore } = useSelector((state) => state.post.posts);

  const observer = useRef();
  const [page, setPage] = useState(0);
  const lastPostElementRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  useEffect(() => {
    dispatch(getAllPosts(page));
  }, [dispatch, page]);

  useEffect(() => {
    return () => dispatch(postActions.reset());
  }, [dispatch])

  return (
    <>
      {!isLoading && posts.length === 0 && (
        <h1 className={styles["no-posts"]}>No posts to display</h1>
      )}
      {posts && (
        <PostsList posts={posts} lastPostElementRef={lastPostElementRef} />
      )}
      {isLoading && <PostSkeletonList number={3} />}
    </>
  );
};

export default PostsAll;
