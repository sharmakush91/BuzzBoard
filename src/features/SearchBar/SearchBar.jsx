import { useEffect, useState } from "react";
import SearchIcon from "../../components/Icons/SearchIcon";
import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import { fetchSearchResults } from "../../components/Slices/searchBarSlice";
import { clearResults } from "../../components/Slices/searchBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { SearchBarResult } from "./SearchBarResult";

export const SearchBar = function () {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const posts = useSelector((state) => state.searchResults.results);
  console.log(query);

  useEffect(() => {
    if (!query) return;
    const timeout = setTimeout(() => {
      dispatch(fetchSearchResults(query));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, dispatch]);

  const handleSearch = function () {
    navigate(`/search/${query}`);
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
            if (!e.target.value) dispatch(clearResults());
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </label>

      {posts && posts.length > 0 && (
        <ul className={styles.resultsContainer}>
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
