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

  useEffect(() => {
    dispatch(clearPosts());
    dispatch(fetchSubRedditPosts(subRedditName));
  }, [dispatch, subRedditName]);

  return (
    <div className={styles.subRedditContainer}>
      {posts.map((item) => {
        return <SubRedditData post={item.data} key={item.data.id} />;
      })}
    </div>
  );
}
