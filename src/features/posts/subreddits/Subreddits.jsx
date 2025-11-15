import { useNavigate } from "react-router-dom";
import styles from "./Subreddits.module.css";

export const Subreddits = function ({ post }) {
  const imageUrl =
    post.icon_img ||
    post.community_icon.split("?")[0] ||
    post.banner_img ||
    "https://placekitten.com/40/40";

  const navigate = useNavigate();

  const handleClick = function () {
    navigate(`/r/${post.display_name}`);
  };

  return (
    <div className={styles.subRedditCard} onClick={handleClick}>
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
