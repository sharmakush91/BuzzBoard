import React from "react";
import styles from "./Header.module.css";
import SearchIcon from "../Icons/SearchIcon";
import HomeIcon from "../Icons/HomeIcon";
import PopularIcon from "../Icons/PopularIcon";
import ExploreIcon from "../Icons/ExploreIcon";

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
          <span>Home</span>
        </div>
        <div className={styles.navItem}>
          <PopularIcon className={styles.icon} />
          <span>Popular</span>
        </div>
        <div className={styles.navItem}>
          <ExploreIcon className={styles.icon} />
          <span>Explore</span>
        </div>
      </div>
    </>
  );
}
