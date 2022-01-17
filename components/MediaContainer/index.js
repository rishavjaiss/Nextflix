import React from "react";
import styles from "./styles.module.scss";
import MovieList from "../MovieList";

export default function MediaContainer({
  popularMovies,
  topRatedMovies,
  latestMovies,
  trendingThisWeek,
}) {
  return (
    <div className={styles.container}>
      <h2>Popular on Nextflix</h2>
      <div className={styles.movieListContainer}>
        {popularMovies.map(({ id, backdrop_path }) => (
          <li className={styles.movieItem} key={id}>
            <MovieList movieId={id} image={backdrop_path} />
          </li>
        ))}
      </div>
      <h2>Top Rated on Nextflix</h2>
      <div className={styles.movieListContainer}>
        {topRatedMovies.map(({ id, backdrop_path }) => (
          <li className={styles.movieItem} key={id}>
            <MovieList movieId={id} image={backdrop_path} />
          </li>
        ))}
      </div>
      <h2>Latest on Nextflix</h2>
      <div className={styles.movieListContainer}>
        {latestMovies.map(({ id, backdrop_path }) => (
          <li className={styles.movieItem} key={id}>
            <MovieList movieId={id} image={backdrop_path} />
          </li>
        ))}
      </div>
      <h2>Trending This Week</h2>
      <div className={styles.movieListContainer}>
        {trendingThisWeek.map(({ id, backdrop_path }) => (
          <li className={styles.movieItem} key={id}>
            <MovieList movieId={id} image={backdrop_path} />
          </li>
        ))}
      </div>
    </div>
  );
}
