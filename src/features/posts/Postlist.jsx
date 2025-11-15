import React, { useEffect } from "react";
import Post from "./Homeposts";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../components/Slices/postsSlice";
import styles from "./Postlist.module.css";
import { clearPosts } from "../../components/Slices/postsSlice";

export function Postlist() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const error = useSelector((state) => state.posts.error);
  const status = useSelector((state) => state.posts.status);
  const after = useSelector((state) => state.posts.after);

  useEffect(() => {
    dispatch(clearPosts());
    dispatch(fetchPosts({ category: "hot" }));
  }, [dispatch]);

  const isLoadingMore = status === "loading" && posts.length > 0;

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
            className={styles.loadMore}
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
