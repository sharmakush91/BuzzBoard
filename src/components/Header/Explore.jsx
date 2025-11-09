import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubreddits } from "../Slices/subredditSlice";
import { Subreddits } from "../../features/posts/Subreddits";
import styles from "./Explore.module.css";

export default function Explore() {
  const dispatch = useDispatch();
  const subReddits = useSelector((state) => state.subReddits.category);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  return (
    <>
      <div className={styles.subRedditContainer}>
        {subReddits.map((post) => {
          return <Subreddits post={post.data} key={post.data.id} />;
        })}
      </div>
      <span>Explore more</span>
    </>
  );
}
