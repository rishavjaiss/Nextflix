export async function getMovies(type) {
  const data = await fetch(
    `https://api.themoviedb.org/3/${type}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=1`
  );
  const movies = await data.json();
  return movies;
}
