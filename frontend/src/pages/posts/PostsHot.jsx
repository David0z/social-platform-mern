import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotPosts, postActions } from "../../store/post/postSlice";
import PostsList from "../../components/posts-list/PostsList";
import PostSkeletonList from "../../components/skeletons/PostSkeletonList";
import usePagination from "../../hooks/usePagination";
import styles from "./Posts.module.scss";

const PostsHot = ({ hotNumber }) => {
  const dispatch = useDispatch();
  const { posts, isLoading, hasMore } = useSelector((state) => state.post.posts);
  const { page, setPage, lastPostElementRef } = usePagination(hasMore, isLoading);

  useEffect(() => {
    dispatch(getHotPosts({hotNumber, page}));
  }, [dispatch, hotNumber, page]);
  
  useEffect(() => {
    return () => {
      dispatch(postActions.reset());
      setPage(0);
    };
  }, [dispatch, hotNumber]);

  return (
    <>
      {!isLoading && posts.length === 0 && (
        <h1
          className={styles["no-posts"]}
        >{`No hot posts to display from last ${hotNumber} hours`}</h1>
      )}
      {posts && (
        <PostsList posts={posts} lastPostElementRef={lastPostElementRef} />
      )}
      {isLoading && <PostSkeletonList number={3} />}
    </>
  );
};

export default PostsHot;
