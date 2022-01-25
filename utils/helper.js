import axios from "axios";

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

export async function searchMovies(query) {
  const data = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}&language=en-US&page=1&query=${query}`
  );
  const movies = await data.json();
  return movies;
}

export const handleLogout = () => {
  return new Promise((resolve, reject) => {
    try {
      axios.post(`${BASE_URL}/api/logout`).then((res) => {
        sessionStorage.removeItem("profileChoosen");
        resolve(res);
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_FRONTEND_API_URL
    : "http://localhost:3000";
