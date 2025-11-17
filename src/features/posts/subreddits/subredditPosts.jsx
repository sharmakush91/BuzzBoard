import { useDispatch, useSelector } from "react-redux";
import { fetchSubRedditPosts } from "../../../components/Slices/subRedditPostSlice";
import { clearPosts } from "../../../components/Slices/subRedditPostSlice";
import { SubRedditData } from "./SubRedditData";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./subRedditPosts.module.css";

export function SubRedditPosts() {
  const { subRedditName } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.subRedditPosts.posts);
  const error = useSelector((state) => state.subRedditPosts.error);
  const status = useSelector((state) => state.subRedditPosts.status);
  const after = useSelector((state) => state.subRedditPosts.after);
  const isLoadingMore = status === "loading" && posts.length > 0;

  useEffect(() => {
    dispatch(clearPosts());
    dispatch(fetchSubRedditPosts({ subreddit: subRedditName, after: null }));
  }, [dispatch, subRedditName]);

  if (status === "loading" && posts.length === 0) {
    return (
      <img
        src="/buzzboardLogo.svg"
        alt="Logo"
        width="100"
        height="100"
        className={styles.loadingPost}
      />
    );
  }

  if (status === "failed") {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.subRedditContainer}>
      {posts.map((item) => {
        return <SubRedditData post={item.data} key={item.data.id} />;
      })}
      {after && (
        <div>
          <button
            type="button"
            className={styles.loadMore}
            onClick={() =>
              dispatch(fetchSubRedditPosts({ subreddit: subRedditName, after }))
            }
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
