import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, postActions } from "../../store/post/postSlice";
import PostsList from "../../components/posts-list/PostsList";
import CreatePost from "./components/CreatePost";
import PostsMenu from "./components/PostsMenu";
import PostSkeletonList from "../../components/skeletons/PostSkeletonList";

const PostsHot = ({ hotNumber }) => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.post.posts);
  const { token } = useSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(getAllPosts());

  //   return () => dispatch(postActions.reset());
  // }, [dispatch]);

  return (
    <>
      {`HOT POSTS FROM LAST ${hotNumber} HOURS`}
      {posts && !isLoading ? (
        <PostsList posts={posts} />
      ) : (
        <PostSkeletonList number={3} />
      )}
    </>
  );
};

export default PostsHot;
