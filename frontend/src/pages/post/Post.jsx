import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { postActions, getSinglePost } from "../../store/post/postSlice";
import styles from "./Post.module.scss";
import PostPreview from "../../components/post-preview/PostPreview";
import { useParams } from "react-router-dom";
import CommentsList from "../../components/comments-list/CommentsList";
import CommentCreate from "../../components/comment-create/CommentCreate";

const Post = () => {
  const dispatch = useDispatch();
  const { id: postId } = useParams();
  const { post, isLoading, isError, isSuccess } = useSelector(
    (state) => state.post.post
  );

  useEffect(() => {
    dispatch(getSinglePost(postId));

    return () => dispatch(postActions.resetPost());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      {!isLoading && !isError && post && (
        <PostPreview post={post}>
          <hr className={styles.line}/>
          {post.comments.length > 0 && <CommentsList comments={post.comments} />}
          <CommentCreate postId={postId} />
        </PostPreview>
      )}
      {!isLoading && isError && <h1>Failed to fetch the post, sorry :/</h1>}
      {isLoading && <h1>Loading...</h1>}
    </div>
  );
};

export default Post;
