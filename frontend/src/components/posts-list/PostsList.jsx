import PostPreview from "../post-preview/PostPreview";
import styles from "./PostsList.module.scss";

const PostsList = ({ posts, lastPostElementRef }) => {
  return (
    <div className={styles.wrapper}>
      {posts.map((post, index) => (
        <PostPreview
          post={post}
          key={post._id}
          lastPostElementRef={
            posts.length - 1 === index ? lastPostElementRef : null
          }
        />
      ))}
    </div>
  );
};

export default PostsList;
