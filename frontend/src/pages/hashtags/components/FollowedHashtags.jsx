import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PostsList from "../../../components/posts-list/PostsList";
import PostSkeletonList from "../../../components/skeletons/PostSkeletonList"
import { getFollowedHashtags, hashtagActions } from "../../../store/hashtag/hashtagSlice";
import { postActions } from "../../../store/post/postSlice";
import styles from '../../posts/Posts.module.scss'

const FollowedHashtags = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.hashtag.followed
  );
  const { posts } = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getFollowedHashtags());

    return () => {
      dispatch(postActions.reset())
      dispatch(hashtagActions.resetFollowed())
    };
  }, [dispatch]);

  return (
    <>
      {!isLoading && posts.length === 0 && (
        <h1 className={styles["no-posts"]}>No posts to display</h1>
      )}
      {posts && !isLoading ? (
        <PostsList posts={posts} />
      ) : (
        <PostSkeletonList number={3} />
      )}
    </>
  );
};

export default FollowedHashtags;
