import React from "react";
import styles from "./SubRedditData.module.css";
import Carousel from "../imageCarousel";

export const SubRedditData = function ({ post }) {
  const isGallery = post.gallery_data;
  const isVideo = post.is_video && post.media?.reddit_video;
  const isImage =
    post.post_hint === "image" ||
    (post.url && (post.url.endsWith(".jpg") || post.url.endsWith(".png")));

  const galleryImages = post.gallery_data?.items
    ?.map((item) => {
      const id = item.media_id;
      const url = post.media_metadata?.[id]?.s?.u;
      return url ? url.replace(/&amp;/g, "&") : null;
    })
    .filter(Boolean);

  return (
    <div className={styles.postCard}>
      <p className={styles.author}>u/{post.author}</p>

      <h3 className={styles.title}>{post.title}</h3>

      {galleryImages && <Carousel images={galleryImages} />}

      {isVideo && (
        <video
          controls
          width="100%"
          src={post.media.reddit_video.fallback_url}
          className={styles.video}
        />
      )}

      {!isGallery && !isVideo && !isImage && !post.selftext && post.url && (
        <a href={post.url} target="_blank" rel="noopener noreferrer">
          {post.thumbnail ? (
            <img
              src={post.thumbnail}
              alt={post.title}
              className={styles.image}
            />
          ) : (
            <p className={styles.linkPreview}>{post.url}</p>
          )}
        </a>
      )}

      {!isGallery && !isVideo && isImage && (
        <img src={post.url} alt={post.title} className={styles.image} />
      )}

      {!isGallery && !isVideo && !isImage && post.selftext && (
        <p className={styles.selftext}>{post.selftext}</p>
      )}
    </div>
  );
};
