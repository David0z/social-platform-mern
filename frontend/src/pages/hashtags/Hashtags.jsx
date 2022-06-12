import { useState, useEffect } from "react";
import HashtagList from "./components/HashtagList";
import Hashtag from "../hashtag/Hashtag";
import styles from "./Hashtags.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getPopularAndFollowed } from "../../store/hashtag/hashtagSlice";
import FollowedHashtags from "./components/FollowedHashtags";

const Hashtags = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { followed, popular, isError, isLoading, isSuccess } = useSelector(
    (state) => state.hashtag.hashtags
  );
  const [displayedContent, setDisplayedContent] = useState(token ? "followed" : "");

  useEffect(() => {
    dispatch(getPopularAndFollowed());
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      setDisplayedContent("")
    }
  }, [token])

  return (
    <>
      {isLoading && <h1>Loading...</h1> }
      {/* ADD NAVBAR SKELETON */}
      {!isLoading && isSuccess && <div className={styles.navbar}>
        {token && (
          <HashtagList
            title="Followed Hashtags:"
            hashtags={followed}
            onClick={() => setDisplayedContent("followed")}
            setDisplayedContent={setDisplayedContent}
            displayedContent={displayedContent}
            content='followed'
          />
        )}
        {token && <div className={styles.seperator}/>}
        <HashtagList
          title="Popular this week:"
          count
          hashtags={popular}
          seperator={token ? true : false}
          setDisplayedContent={setDisplayedContent}
          displayedContent={displayedContent}
        />
      </div>}
      {displayedContent === "followed" ? (
        <>
          <h1 className={styles["followed-header"]}>
            Recent posts from followed hashtags:
          </h1>
          <FollowedHashtags />
        </>
      ) : displayedContent !== "" && (
        <Hashtag tag={displayedContent} />
      )}
    </>
  );
};

export default Hashtags;
