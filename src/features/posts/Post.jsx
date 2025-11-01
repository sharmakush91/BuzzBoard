import React from "react";
import styles from "./Post.module.css";
import Carousel from "./imageCarousel";

export default function Post({ post }) {
  const isGallery = post.gallery_data;
  const isVideo = post.is_video && post.media && post.media.reddit_video;
  const isImage =
    post.post_hint === "image" ||
    (post.url && (post.url.endsWith(".jpg") || post.url.endsWith(".png")));

  const galleryImages = post.gallery_data?.items?.map((item) => {
    const mediaId = item.media_id;
    return post.media_metadata[mediaId].s.u.replace(/&amp;/g, "&");
  });

  return (
    <div className={styles.post}>
      <p>u/{post.author}</p>
      <h3>{post.title}</h3>

      {galleryImages && <Carousel images={galleryImages} />}

      {isVideo && (
        <video
          controls
          width="100%"
          src={post.media.reddit_video.fallback_url}
          className={styles.video}
        />
      )}

      {!isGallery && !isVideo && isImage && (
        <img src={post.url} alt={post.title} className={styles.image} />
      )}
      {!isGallery && !isVideo && !isImage && post.selftext && (
        <p>{post.selftext}</p>
      )}
    </div>
  );
}
