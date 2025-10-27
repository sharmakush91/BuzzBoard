import React, { useEffect } from "react";
import Post from "./Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./postsSlice";

export function Postlist() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const error = useSelector((state) => state.posts.error);
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  return (
    <div>
      {posts.map((p) => (
        <Post key={p.data.id} post={p.data} />
      ))}
    </div>
  );
}
