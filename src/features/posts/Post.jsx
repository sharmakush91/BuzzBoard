import React from "react";
import styles from "./Post.module.css";

export default function Post({ post }) {
  if (post.gallery_data) {
    return (
      <div className={styles.post}>
        <p>{post.author}</p>
        <h3>{post.title}</h3>
        {post.gallery_data.items.map((item) => {
          const mediaId = item.media_id;
          const image = post.media_metadata[mediaId].s.u.replace(/&amp;/g, "&");
          return <img key={mediaId} src={image} alt={post.title} />;
        })}
      </div>
    );
  }
  return (
    <div>
      <p>{post.author}</p>
      <h3>{post.title}</h3>
    </div>
  );
}
