import styles from "./Subreddits.module.css";

export const Subreddits = function ({ post }) {
  const imageUrl =
    post.icon_img ||
    post.community_icon.split("?")[0] ||
    post.banner_img ||
    "https://via.placeholder.com/40";
  return (
    <div className={styles.subRedditCard}>
      <img
        src={imageUrl}
        alt={post.display_name}
        width={40}
        className={styles.subRedditIcon}
      />
      <div className={styles.subRedditInfo}>
        <h4 className={styles.subRedditTitle}>{post.title}</h4>
        <span className={styles.subRedditMembers}>
          {post.subscribers.toLocaleString()} members
        </span>
        <p className={styles.subRedditDescription}>{post.public_description}</p>
      </div>
    </div>
  );
};
