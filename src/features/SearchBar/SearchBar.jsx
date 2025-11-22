import { useEffect, useState, useRef } from "react";
import SearchIcon from "../../components/Icons/SearchIcon";
import styles from "./SearchBar.module.css";
import { fetchSearchResults } from "../../components/Slices/searchBarSlice";
import { fetchSearchSubreddits } from "../../components/Slices/searchSubredditsSlice";
import { clearResults } from "../../components/Slices/searchBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { SearchBarResult } from "./SearchBarResult";

import { useNavigate } from "react-router-dom";

export const SearchBar = function () {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const [query, setQuery] = useState("");
  const posts = useSelector((state) => state.searchResults.results);
  const navigate = useNavigate();
  console.log(query);

  //Automatic fetch of subReddits based on user input

  useEffect(() => {
    if (!query) return;
    const timeout = setTimeout(() => {
      dispatch(fetchSearchResults(query));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, dispatch]);

  //Handle closing of autosearch on clicking outside the container

  const handleClickOutside = function (e) {
    if (containerRef.current && !containerRef.current.contains(e.target))
      dispatch(clearResults());
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //HandleKeyDown results for subReddits

  const handleKeyDownResult = function (e) {
    if (e.key === "Enter") {
      dispatch(fetchSearchSubreddits({ query }));
      dispatch(clearResults());
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <label className={styles.searchBar}>
        <SearchIcon className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search Buzzboard"
          className={styles.searchInput}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!e.target.value) {
              dispatch(clearResults());
            }
          }}
          onKeyDown={handleKeyDownResult}
        />
      </label>

      {posts && posts.length > 0 && (
        <ul className={styles.resultsContainer} ref={containerRef}>
          {posts.map((result) => (
            <li key={result.data.id}>
              <SearchBarResult post={result.data} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
