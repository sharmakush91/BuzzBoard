import { useSelector } from "react-redux";
import styles from "./KeyDownSubredditResults.module.css";
import defaultIcon from "../../../public/buzzboardLogo.svg"; // your local default icon

export const KeyDownSubredditResults = function () {
  const results = useSelector((state) => state.subRedditsSearch.results || []);

  if (results.length === 0) return <p>No results found</p>;

  const getValidIcon = (data) => {
    // Prefer icon_img
    let url = data.icon_img || data.community_icon || "";

    // Clean HTML encoding
    url = url.replace(/&amp;/g, "&");

    // Some community_icon URLs have extra stuff after '?', strip it
    url = url.split("?")[0];

    // If URL is empty or points to a default blank image, use local fallback
    if (!url || url.includes("default") || url.includes("emoji")) {
      return defaultIcon;
    }

    return url;
  };

  return (
    <div className={styles.subRedditGrid}>
      {results.map((result) => {
        const data = result.data;
        return (
          <div className={styles.subRedditCard} key={data.id}>
            <img
              src={getValidIcon(data)}
              alt={data.display_name}
              className={styles.subRedditIcon}
            />
            <div className={styles.subRedditInfo}>
              <h4 className={styles.subRedditTitle}>{data.title}</h4>
              <span className={styles.subRedditMembers}>
                {data.subscribers.toLocaleString()} members
              </span>
              <p className={styles.subRedditDescription}>
                {data.public_description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
