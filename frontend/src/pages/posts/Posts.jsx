import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, postActions } from "../../store/post/postSlice";
import PostsList from "../../components/posts-list/PostsList";
import CreatePost from "./components/CreatePost";
import styles from "./Posts.module.scss";
import PostSkeletonList from "../../components/skeletons/PostSkeletonList";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.post.posts);
  const { token } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getAllPosts());

    return () => dispatch(postActions.reset());
  }, [dispatch]);

  return (
    <>
      {token && <CreatePost />}
      {posts && !isLoading ? <PostsList posts={posts} /> : <PostSkeletonList number={3} />}
    </>
  );
};

export default Posts;
