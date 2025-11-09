import React from "react";
import styles from "./Header.module.css";
import SearchIcon from "../Icons/SearchIcon";
import HomeIcon from "../Icons/HomeIcon";
import PopularIcon from "../Icons/PopularIcon";
import ExploreIcon from "../Icons/ExploreIcon";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search Buzzboard"
          className={styles.searchInput}
        />
        <SearchIcon className={styles.searchIcon} />
      </div>
      <hr className={styles.navDivider} />
      <div className={styles.navBar}>
        <div className={styles.navItem}>
          <HomeIcon className={styles.icon} />
          <Link to="/">
            <span>Home</span>
          </Link>
        </div>
        <div className={styles.navItem}>
          <PopularIcon className={styles.icon} />
          <Link to="/popular">
            <span>Popular</span>
          </Link>
        </div>
        <div className={styles.navItem}>
          <ExploreIcon className={styles.icon} />
          <Link to="/explore">
            <span>Explore</span>
          </Link>
        </div>
      </div>
    </>
  );
}
