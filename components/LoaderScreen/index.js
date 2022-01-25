import React from "react";
import { CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";

export default function LoaderScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.backdrop}></div>
      <div className={styles.loaderContainer}>
        <CircularProgress color="error" size={60} />
      </div>
    </div>
  );
}
