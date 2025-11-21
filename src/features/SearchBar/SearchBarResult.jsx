import styles from "./SearchBarResult.module.css";
import { useNavigate } from "react-router-dom";
import { fetchSubreddits } from "../../components/Slices/subredditSlice";
import { useDispatch } from "react-redux";
import { clearResults } from "../../components/Slices/searchBarSlice";

export const SearchBarResult = function ({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = function () {
    dispatch(fetchSubreddits(post.display_name));
    dispatch(clearResults());
    navigate(`/r/${post.display_name}`);
  };
  return (
    <div className={styles.resultItem} onClick={handleClick}>
      <div className={styles.name}>{post.display_name}</div>
      <div className={styles.title}>{post.title}</div>
    </div>
  );
};
