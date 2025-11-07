import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPosts, fetchPosts } from "../../features/posts/postsSlice";
import Post from "../../features/posts/Post";
import styles from "./Popular.module.css";

export function Popular() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.posts.status);
  const posts = useSelector((state) => state.posts.posts);
  const after = useSelector((state) => state.posts.after);
  const isLoadingMore = status === "loading" && posts.length > 0;

  useEffect(() => {
    dispatch(clearPosts());
    dispatch(fetchPosts({ category: "rising" }));
  }, [dispatch]);

  if (status === "loading") {
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
  return (
    <div className={styles.postContainer}>
      {posts.map((p) => (
        <Post key={p.id} post={p.data} />
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
