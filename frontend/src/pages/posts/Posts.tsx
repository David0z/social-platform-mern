import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, postActions } from "../../store/post/postSlice";
import PostsList from "../../components/posts-list/PostsList";
import CreatePost from "./components/CreatePost";
import PostsMenu from "./components/PostsMenu";
import { Outlet } from "react-router-dom";

const Posts = () => {
  const { token } = useSelector(state => state.user)

  return (
    <>
      {token && <CreatePost />}
      <PostsMenu />
      <Outlet />
    </>
  );
};

export default Posts;
