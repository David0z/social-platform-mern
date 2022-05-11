import React from "react";
import CreatePost from "./components/CreatePost";
import styles from "./Posts.module.scss";

const Posts = () => {
  return (
    <>
      <CreatePost />
      <div>Posts</div>
    </>
  );
};

export default Posts;
