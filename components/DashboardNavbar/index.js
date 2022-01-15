import React from "react";
import styles from "./styles.module.scss";
import netflixLogo from "../../assets/images/Netflix-logo.svg";
import Image from "next/image";
import { Avatar, Stack, Tooltip } from "@mui/material";
import { Search, Notifications } from "@mui/icons-material";

export default function DashboardNavbar({ handleLogout, profile }) {
  return (
    <div className={styles.container}>
      <div className={styles.menuContainer}>
        <li
          className={styles.navItem}
          style={{ marginTop: "10px", marginRight: "30px" }}
        >
          <Image src={netflixLogo} width="75" height="50" />
        </li>
        <li className={styles.navItem}>Home</li>
        <li className={styles.navItem}>TV Shows</li>
        <li className={styles.navItem}>Movies</li>
        <li className={styles.navItem}>News & Popular</li>
        <li className={styles.navItem}>My List</li>
      </div>
      <div className={styles.profileMenuContainer}>
        <Stack direction="row" spacing={2}>
          <li className={styles.navItem}>
            <Avatar sx={{ bgcolor: "#141414" }}>
              <Search />
            </Avatar>
          </li>
          <li className={styles.navItem}>
            <Avatar sx={{ bgcolor: "#141414" }}>
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
                      padding: "5px",
                      fontSize: "12px",
                      cursor: "pointer",
                      color: "white",
                    }}
                    onClick={() => handleLogout()}
                  >
                    Sign out of Netflix
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
