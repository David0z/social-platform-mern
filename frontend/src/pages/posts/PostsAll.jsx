import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, postActions } from "../../store/post/postSlice";
import PostsList from "../../components/posts-list/PostsList";
import PostSkeletonList from "../../components/skeletons/PostSkeletonList";
import styles from "./Posts.module.scss"

const PostsAll = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getAllPosts());

    return () => dispatch(postActions.reset());
  }, [dispatch]);

  return (
    <>
      {!isLoading && posts.length === 0 && <h1 className={styles["no-posts"]}>No posts to display</h1>}
      {posts && !isLoading ? (
        <PostsList posts={posts} />
      ) : (
        <PostSkeletonList number={3} />
      )}
    </>
  );
};

export default PostsAll;
