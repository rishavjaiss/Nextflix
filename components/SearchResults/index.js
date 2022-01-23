import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import MovieList from "../MovieList";
import { ErrorSharp } from "@mui/icons-material";

export default function SearchResults({ searchedMovies }) {
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    const filteredResults = searchedMovies.filter((item) => {
      return item.backdrop_path || item.poster_path != null;
    });
    setSearchResults(filteredResults);
  }, [searchedMovies]);

  return (
    <div className={styles.container}>
      <h2>Search Results</h2>
      <div className={styles.searchResultsContainer}>
        {searchResults?.length > 0 ? (
          searchResults?.map(({ id, backdrop_path, poster_path }) => (
            <li className={styles.searchItem} key={id}>
              <MovieList
                movieId={id}
                image={backdrop_path ? backdrop_path : poster_path}
              />
            </li>
          ))
        ) : (
          <h1>
            No Results! <ErrorSharp />
          </h1>
        )}
      </div>
    </div>
  );
}
