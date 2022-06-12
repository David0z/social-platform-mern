import { useParams } from "react-router-dom";
import PostSkeletonList from "../../components/skeletons/PostSkeletonList";
import PostsList from "../../components/posts-list/PostsList";
import { postActions } from "../../store/post/postSlice";
import {
  getSingleHashtag,
  followHashtag,
  hashtagActions,
} from "../../store/hashtag/hashtagSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./Hashtag.module.scss";
import FollowButton from "../../components/follow-button/FollowButton";
import HashtagSkeleton from "../../components/skeletons/HashtagSkeleton";

const Hashtag = ({tag}) => {
  const dispatch = useDispatch();
  const tagName = useParams().tagName || tag;
  const { hashtag, isLoading, isSuccess, isError } = useSelector(
    (state) => state.hashtag.hashtag
  );
  const { posts } = useSelector((state) => state.post.posts);
  const { uid, token } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSingleHashtag(tagName));

    const reset = () => {
      dispatch(hashtagActions.resetSingleHashtag());
      dispatch(postActions.reset());
    };

    return () => reset();
  }, [dispatch, tagName]);

  const handleHashtagFollow = () => {
    if (!token) return;
    dispatch(followHashtag(hashtag._id));
  };

  return (
    <>
      {!isLoading && !isError && hashtag && (
        <>
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <h1 className={styles.content__name}>{hashtag.name}</h1>
              <FollowButton
                followCondition={hashtag.followers.includes(uid)}
                onClick={handleHashtagFollow}
                token={token}
              />
              <p className={styles.content__paragraph}>
                {hashtag.followers.length === 1
                  ? `${hashtag.followers.length} follower`
                  : `${hashtag.followers.length} followers`}
              </p>
            </div>
          </div>
          <PostsList posts={posts} />
        </>
      )}
      {!isLoading && !isError && hashtag && posts.length === 0 && (
        <h1 className={styles["no-posts"]}>No posts to display</h1>
      )}
      {!isLoading && isError && <h1 className={styles["not-found"]}>Couldn't find the hashtag</h1>}
      {isLoading && (
        <>
          <HashtagSkeleton />
          <PostSkeletonList number={3} />
        </>
      )}
    </>
  );
};

export default Hashtag;
