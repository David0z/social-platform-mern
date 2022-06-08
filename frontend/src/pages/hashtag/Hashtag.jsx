import { useParams } from "react-router-dom";
import PostSkeletonList from "../../components/skeletons/PostSkeletonList";
import PostsList from "../../components/posts-list/PostsList";
import { postActions } from "../../store/post/postSlice";
import {
  getSingleHashtag,
  hashtagActions,
} from "../../store/hashtag/hashtagSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./Hashtag.module.scss";

const Hashtag = () => {
  const dispatch = useDispatch();
  const { tagName } = useParams();
  const { hashtag, isLoading, isSuccess, isError } = useSelector(
    (state) => state.hashtag.hashtag
  );
  const { posts } = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getSingleHashtag(tagName));

    const reset = () => {
      dispatch(hashtagActions.resetSingleHashtag());
      dispatch(postActions.reset());
    };

    return () => reset();
  }, [dispatch, tagName]);

  return (
    <>
      {!isLoading && !isError && hashtag && (
        <>
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <h1 className={styles.content__name}>{hashtag.name}</h1>
              <button className={styles['content__follow-btn']}>Follow</button>
              <p className={styles.content__paragraph}>followers</p>
            </div>
          </div>
          <PostsList posts={posts}/>
        </>
      )}
      {!isLoading && !isError && hashtag && posts.length === 0 && (
        <h1>No posts to display</h1>
      )}
      {!isLoading && isError && <h1>Couldn't find the hashtag</h1>}
      {isLoading && (
        <>
          {/* HASHTAG SKELETON HERE */}
          <PostSkeletonList number={3} />
        </>
      )}
    </>
  );
};

export default Hashtag;
