import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardActionArea,
  Rating,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import CustomModal from "../Modal";
import styles from "./styles.module.scss";
import { getVideos, getMovies } from "../../utils/helper";
import ReactPlayer from "react-player";

export default function MovieList({ movieId, image }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState({ videos: [], data: {} });
  const openMovieModal = () => setOpen(true);
  const closeMovieModal = () => setOpen(false);

  useEffect(async () => {
    if (open) {
      setLoading(true);
      const videos = await getVideos(movieId);
      const movieData = await getMovies(`movie/${movieId}`);
      setMovieData({ videos: videos.results, ...movieData });
      setLoading(false);
    }
  }, [open]);

  return (
    <>
      <Card
        sx={{ maxWidth: 300, maxHeight: 600 }}
        className={styles.movieCard}
        onClick={() => openMovieModal()}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image={`https://image.tmdb.org/t/p/w500${image}`}
          />
        </CardActionArea>
      </Card>
      <CustomModal open={open} closeModal={closeMovieModal}>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <div className={styles.modalContainer}>
            <img
              className={styles.moviePoster}
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            />
            <div className={styles.movieDetailsContainer}>
              {movieData.videos.length > 0 && (
                <ReactPlayer
                  playing
                  loop
                  width={400}
                  height={250}
                  url={`https://www.youtube.com/watch?v=${movieData.videos[0].key}`}
                />
              )}
              <h4 className={styles.movieTitle}>{movieData.title}</h4>
              {movieData?.tagline?.length > 0 && (
                <h5 className={styles.movieTagline}>- {movieData.tagline}</h5>
              )}
              <p className={styles.movieOverview}>{movieData.overview}</p>
              <div
                style={{
                  display: "flex",
                  flexDirection:
                    movieData?.genres?.length > 3 ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems:
                    movieData?.genres?.length > 3 ? "flex-start" : "center",
                }}
              >
                <Stack
                  direction="row"
                  style={{
                    marginBottom: movieData?.genres?.length > 3 ? "15px" : 0,
                  }}
                  spacing={1}
                >
                  {movieData?.genres?.map(({ id, name }) => (
                    <Chip key={id} label={name} color="error" />
                  ))}
                </Stack>
                <Rating
                  className={styles.movieRating}
                  value={movieData.vote_average / 2}
                  readOnly
                  precision={0.5}
                ></Rating>
              </div>
            </div>
          </div>
        )}
      </CustomModal>
    </>
  );
}
