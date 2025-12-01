import { useSelector } from "react-redux";
import styles from "./KeyDownSubredditResults.module.css";
import { fetchSearchSubreddits } from "../../components/Slices/searchSubredditsSlice";
import { fetchSubRedditPosts } from "../../components/Slices/subRedditPostSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const KeyDownSubredditResults = function () {
  const results = useSelector((state) => state.subRedditsSearch.results);
  const error = useSelector((state) => state.subRedditsSearch.error);
  const status = useSelector((state) => state.subRedditsSearch.status);
  const isLoadingMore = status === "loading" && results.length > 0;
  const after = useSelector((state) => state.subRedditsSearch.after);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query } = useParams();

  const handleClick = function () {
    dispatch(fetchSubRedditPosts({ subreddit: query, after: null }));
    navigate(`/r/${query}`);
  };
  const handleLoadMore = () => {
    dispatch(fetchSearchSubreddits({ query, after }));
  };

  if (status === "loading" && results.length === 0) {
    return (
      <img
        src="/buzzboardLogo.svg"
        alt="Logo"
        width="100"
        height="100"
        className={styles.loadingPost}
      />
    );
  }

  if (status === "failed" && results.length === 0) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className={styles.subRedditGrid}>
        {results.map((result) => {
          const data = result.data;

          let iconUrl = data.icon_img || data.community_icon || "";
          iconUrl = iconUrl.replace(/&amp;/g, "&").split("?")[0];

          return (
            <div
              className={styles.subRedditCard}
              key={data.id}
              onClick={handleClick}
            >
              <img
                src={iconUrl || "/defaultIcon.png"}
                alt={data.display_name}
                className={styles.subRedditIcon}
              />

              <div className={styles.subRedditInfo}>
                <h4 className={styles.subRedditTitle}>{data.title}</h4>

                <span className={styles.subRedditMembers}>
                  {data.subscribers?.toLocaleString() || 0} members
                </span>

                <p className={styles.subRedditDescription}>
                  {data.public_description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {after && results.length > 0 && (
        <div>
          <button
            type="button"
            className={styles.loadMore}
            disabled={isLoadingMore}
            onClick={handleLoadMore}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
};
