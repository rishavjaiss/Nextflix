import React from "react";
import styles from "./styles.module.scss";
import netflixLogo from "../../assets/images/Netflix-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar, Stack, Tooltip } from "@mui/material";
import { Search, Notifications } from "@mui/icons-material";

export default function DashboardNavbar({ handleLogout, profile }) {
  const router = useRouter();
  const handleClickOnSearch = () => {
    const search = document.querySelector(`.${styles.searchInputBox}`);
    search.classList.add(`${styles.searchBoxExpanded}`);
    search.focus();
  };

  const handleSubmit = (query) => {
    router.push(`/search/${query}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.menuContainer}>
        <Link href="/">
          <li
            className={styles.navItem}
            style={{ marginTop: "10px", marginRight: "30px" }}
          >
            <Image src={netflixLogo} width="75" height="50" />
          </li>
        </Link>
        <Link href="/browse">
          <li className={styles.navItem}>Home</li>
        </Link>
        <Link href="/browse/tv">
          <li className={styles.navItem}>TV Shows</li>
        </Link>
        <li className={styles.navItem}>Movies</li>
        <li className={styles.navItem}>News & Popular</li>
        <li className={styles.navItem}>My List</li>
      </div>
      <div className={styles.profileMenuContainer}>
        <Stack direction="row" spacing={2}>
          <li className={styles.navItem}>
            <input
              type="text"
              placeholder="Titles, people, genres"
              className={styles.searchInputBox}
              onSubmit={(e) => handleSubmit(e.target.value)}
              onBlur={(e) => {
                e.target.classList.remove(styles.searchBoxExpanded);
                e.target.value = "";
              }}
            />
            <Search
              className={styles.searchIcon}
              onClick={() => handleClickOnSearch()}
            />
          </li>
          <li className={styles.navItem}>
            <Avatar sx={{ bgcolor: "#141414" }} style={{ marginRight: "15px" }}>
              <Notifications />
            </Avatar>
          </li>
          <li className={styles.navItem}>
            <Tooltip
              arrow
              title={
                <>
                  <p>Welcome, {profile.alias}</p>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "12px",
                      cursor: "pointer",
                      color: "white",
                    }}
                    onClick={() => handleLogout()}
                  >
                    Sign out of Nextflix
                  </p>
                </>
              }
            >
              <Avatar
                alt={`${profile.alias}-avatar`}
                variant="rounded"
                src={profile.imageUrl}
              />
            </Tooltip>
          </li>
        </Stack>
      </div>
    </div>
  );
}
