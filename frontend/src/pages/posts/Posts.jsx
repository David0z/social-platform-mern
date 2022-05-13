import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, postActions } from "../../store/post/postSlice";
import PostsList from "../../components/posts-list/PostsList";
import CreatePost from "./components/CreatePost";
import styles from "./Posts.module.scss";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getAllPosts());

    return () => dispatch(postActions.reset());
  }, [dispatch]);

  return (
    <>
      <CreatePost />
      {posts && !isLoading ? <PostsList posts={posts} /> : <h1>Loading...</h1>}
    </>
  );
};

export default Posts;
