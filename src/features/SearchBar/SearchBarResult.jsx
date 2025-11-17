import styles from "./SearchBarResult.module.css";

export const SearchBarResult = function ({ post }) {
  return (
    <div className={styles.resultItem}>
      <div className={styles.name}>{post.display_name}</div>
      <div className={styles.title}>{post.title}</div>
    </div>
  );
};
