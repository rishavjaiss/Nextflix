import { useEffect, useState } from "react";
import Head from "next/head";
import DashboardNavbar from "../../components/DashboardNavbar";
import MediaContainer from "../../components/MediaContainer";
import LoaderScreen from "../../components/LoaderScreen";
import styles from "./styles.module.scss";
import { getMovies } from "../../utils/helper";

export async function getServerSideProps() {
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const profile = JSON.parse(window.sessionStorage.profileChoosen);
    setProfile(profile);
  }, []);

  const onSearchSubmit = () => {
    setLoading(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>TV Shows - Nextflix</title>
        <link rel="icon" href="../../netflix-icon.ico" />
      </Head>
      <>
        <DashboardNavbar profile={profile} onSubmit={onSearchSubmit} />
        {loading && <LoaderScreen />}
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
