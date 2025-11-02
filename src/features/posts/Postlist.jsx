import React, { useEffect } from "react";
import Post from "./Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./postsSlice";
import styles from "./Postlist.module.css";

export function Postlist() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const error = useSelector((state) => state.posts.error);
  const status = useSelector((state) => state.posts.status);
  const after = useSelector((state) => state.posts.after);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts({ after, category: "hot" }));
    }
  }, [dispatch, status, after]);

  const isLoadingMore = status === "loading" && posts.length > 0;

  if (status === "loading" && posts.length === 0) {
    return <p className={styles.loadingPost}>Loading posts...</p>;
  }

  if (status === "failed" && posts.length === 0) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.postContainer}>
      {posts.map((p) => (
        <Post key={p.data.id} post={p.data} />
      ))}

      {after && (
        <div>
          <button
            type="button"
            onClick={() => dispatch(fetchPosts({ after, category: "hot" }))}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
