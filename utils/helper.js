export async function getMovies(type) {
  const data = await fetch(
    `https://api.themoviedb.org/3/${type}?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}&language=en-US&page=1`
  );
  const movies = await data.json();
  return movies;
}

export async function getVideos(type) {
  const data = await fetch(
    `https://api.themoviedb.org/3/${type}/videos?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}&language=en-US`
  );
  const videos = await data.json();
  return videos;
}
