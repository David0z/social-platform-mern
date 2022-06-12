import { useState, useEffect } from "react";
import HashtagList from "./components/HashtagList";
import Hashtag from '../hashtag/Hashtag'
import styles from "./Hashtags.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getPopularAndFollowed } from '../../store/hashtag/hashtagSlice'

const Hashtags = () => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.user)
  const [displayedContent, setDisplayedContent] = useState("followed");

  useEffect(() => {
    dispatch(getPopularAndFollowed())
  }, [dispatch])

  return (
    <>
      <div className={styles.navbar}>
        <HashtagList
          title="Followed Hashtags:"
          hashtags
          onClick={() => setDisplayedContent("followed")}
          setDisplayedContent={setDisplayedContent}
        />
        <HashtagList title="Popular this week:" hashtags seperator />
      </div>
      {displayedContent === "followed" ? (
        <>
          <h1 className={styles["followed-header"]}>
            Recent posts from followed hashtags:
          </h1>
        </>
      ) : <Hashtag tag={displayedContent} />}
    </>
  );
};

export default Hashtags;
