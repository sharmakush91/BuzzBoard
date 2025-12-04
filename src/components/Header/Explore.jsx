import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubreddits } from "../Slices/subredditSlice";
import { Subreddits } from "../../features/posts/subreddits/Subreddits";
import styles from "./Explore.module.css";

export default function Explore() {
  const dispatch = useDispatch();
  const subReddits = useSelector((state) => state.subReddits.category);
  const after = useSelector((state) => state.subReddits.after);
  const status = useSelector((state) => state.subReddits.status);
  const error = useSelector((state) => state.subReddits.error);

  useEffect(() => {
    dispatch(fetchSubreddits({}));
  }, [dispatch]);

  if (status === "loading" && subReddits.length === 0) {
    return (
      <img
        src="/buzzboardLogo.svg"
        alt="Logo"
        width={100}
        height={100}
        className={styles.loadingPost}
        fetchPriority="high"
      />
    );
  }

  if (status === "failed" && subReddits.length === 0) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className={styles.subRedditContainer}>
        {subReddits.map((post) => {
          return <Subreddits post={post.data} key={post.data.id} />;
        })}
      </div>
      <button
        className={styles.loadMore}
        onClick={() => dispatch(fetchSubreddits({ after }))}
      >
        Explore more
      </button>
    </>
  );
}
