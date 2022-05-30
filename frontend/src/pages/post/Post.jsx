import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { postActions, getSinglePost } from "../../store/post/postSlice";
import styles from "./Post.module.scss";
import PostPreview from "../../components/post-preview/PostPreview";
import { useParams } from "react-router-dom";
import PostSkeletonList from "../../components/skeletons/PostSkeletonList";

const Post = () => {
  const dispatch = useDispatch();
  const { id: postId } = useParams();
  const { posts, isLoading, isError, isSuccess } = useSelector(
    (state) => state.post.posts
  );
  const post = posts[0];

  useEffect(() => {
    dispatch(getSinglePost(postId));

    return () => dispatch(postActions.reset());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      {!isLoading && !isError && post && (
        <PostPreview
          post={post}
          allowCommentFetch={false}
          instantComments
        />
      )}
      {!isLoading && isError && <h1>Failed to fetch the post, sorry :/</h1>}
      {isLoading && <PostSkeletonList number={1} />}
    </div>
  );
};

export default Post;
