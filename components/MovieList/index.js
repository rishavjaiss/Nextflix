import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Rating,
} from "@mui/material";

export default function MovieList({ movie }) {
  return (
    <Card sx={{ maxWidth: 300, maxHeight: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        />
        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography variant="body5" color="text.secondary">
            {movie.overview}
          </Typography>
          <Typography>
            <Rating
              name="size-medium"
              value={movie.vote_average / 2}
              readOnly
              precision={0.5}
            />
          </Typography>
        </CardContent> */}
      </CardActionArea>
    </Card>
  );
}
