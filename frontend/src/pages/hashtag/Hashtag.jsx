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
import usePagination from "../../hooks/usePagination";

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch();
  const tagName = useParams().tagName || tag;
  const { hashtag, isLoading, isSuccess, isError, hasMore } = useSelector(
    (state) => state.hashtag.hashtag
  );
  const { posts } = useSelector((state) => state.post.posts);
  const { uid, token } = useSelector((state) => state.user);
  const { page, setPage, lastPostElementRef, date, setDate } = usePagination(hasMore, isLoading);

  useEffect(() => {
    if (date) {
      dispatch(getSingleHashtag({tagName, page, date}));
    } else {
      const newDate = new Date()
      setDate(newDate)
      dispatch(getSingleHashtag({tagName, page, date: newDate}));
    }
  }, [dispatch, tagName, page])

  useEffect(() => {
    return () => {
      dispatch(hashtagActions.resetSingleHashtag());
      dispatch(postActions.reset());
      setPage(0);
      setDate(null)
    };
  }, [dispatch, tagName]);

  const handleHashtagFollow = () => {
    if (!token) return;
    dispatch(followHashtag(hashtag._id));
  };

  return (
    <>
      {isLoading && !hashtag && <HashtagSkeleton />}
      {!isError && hashtag && (
        <>
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <h1 className={styles.content__name}>{hashtag.name}</h1>
              {token && <FollowButton
                followCondition={hashtag.isUserFollowing}
                onClick={handleHashtagFollow}
                token={token}
              />}
              <p className={styles.content__paragraph}>
                {hashtag.followers === 1
                  ? `${hashtag.followers} follower`
                  : hashtag.followers === 0
                  ? "No followers"
                  : `${hashtag.followers} followers`}
              </p>
            </div>
          </div>
        </>
      )}
      {posts.length > 0 && <PostsList posts={posts} lastPostElementRef={lastPostElementRef}/>}
      {!isLoading && !isError && hashtag && posts.length === 0 && (
        <h1 className={styles["no-posts"]}>No posts to display</h1>
      )}
      {!isLoading && isError && (
        <h1 className={styles["not-found"]}>Couldn't find the hashtag</h1>
      )}
      {isLoading && <PostSkeletonList number={3} />}
    </>
  );
};

export default Hashtag;
