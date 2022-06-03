import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotPosts, postActions } from "../../store/post/postSlice";
import PostsList from "../../components/posts-list/PostsList";
import PostSkeletonList from "../../components/skeletons/PostSkeletonList";
import styles from "./Posts.module.scss";

const PostsHot = ({ hotNumber }) => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getHotPosts(hotNumber));

    return () => dispatch(postActions.reset());
  }, [dispatch, hotNumber]);

  return (
    <>
      {!isLoading && posts.length === 0 && (
        <h1
          className={styles["no-posts"]}
        >{`No hot posts to display from last ${hotNumber} hours`}</h1>
      )}
      {posts && !isLoading ? (
        <PostsList posts={posts} />
      ) : (
        <PostSkeletonList number={3} />
      )}
    </>
  );
};

export default PostsHot;
