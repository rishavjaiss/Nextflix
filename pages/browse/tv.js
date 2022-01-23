import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import DashboardNavbar from "../../components/DashboardNavbar";
import MediaContainer from "../../components/MediaContainer";
import styles from "./styles.module.scss";
import { getMovies } from "../../utils/helper";

export async function getStaticProps() {
  const popularMovies = await getMovies("tv/popular");
  const airingToday = await getMovies("tv/airing_today");
  const topRatedMovies = await getMovies("tv/top_rated");
  const trendingThisWeek = await getMovies("tv/on_the_air");

  return {
    props: {
      popularMovies,
      airingToday,
      topRatedMovies,
      trendingThisWeek,
    },
  };
}

export default function TVDashboard({
  popularMovies,
  airingToday,
  topRatedMovies,
  trendingThisWeek,
}) {
  const [profile, setProfile] = useState({});
  const router = useRouter();

  useEffect(() => {
    const profile = JSON.parse(window.sessionStorage.profileChoosen);
    setProfile(profile);
  }, []);

  const handleLogout = () => {
    axios
      .post("/api/logout")
      .then((res) => {
        sessionStorage.removeItem("profileChoosen");
        router.push("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Home - Nextflix</title>
        <link rel="icon" href="../../netflix-icon.ico" />
      </Head>
      <>
        <DashboardNavbar handleLogout={handleLogout} profile={profile} />
        <MediaContainer
          popularMovies={popularMovies.results}
          airingToday={airingToday.results}
          topRatedMovies={topRatedMovies.results}
          trendingThisWeek={trendingThisWeek.results}
        />
      </>
    </div>
  );
}
