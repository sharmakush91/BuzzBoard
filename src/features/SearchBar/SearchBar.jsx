import { useEffect, useState, useRef } from "react";
import SearchIcon from "../../components/Icons/SearchIcon";
import styles from "./SearchBar.module.css";
import { fetchSearchResults } from "../../components/Slices/searchBarSlice";
import { clearResults } from "../../components/Slices/searchBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { SearchBarResult } from "./SearchBarResult";

export const SearchBar = function () {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const [query, setQuery] = useState("");
  const posts = useSelector((state) => state.searchResults.results);
  console.log(query);

  useEffect(() => {
    if (!query) return;
    const timeout = setTimeout(() => {
      dispatch(fetchSearchResults(query));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, dispatch]);

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
