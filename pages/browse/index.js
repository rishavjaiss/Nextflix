import { useState, useEffect } from "react";
import Head from "next/head";
import DashboardNavbar from "../../components/DashboardNavbar";
import MediaContainer from "../../components/MediaContainer";
import ProfileOverlay from "../../components/ProfileOverlay";
import LoaderScreen from "../../components/LoaderScreen";
import styles from "./styles.module.scss";
import { checkSession, getProfiles } from "../../firebase.config";
import { getMovies } from "../../utils/helper";

export async function getServerSideProps() {
  const result = await checkSession();
  const profiles = await getProfiles(result.data.uid);
  const popularMovies = await getMovies("movie/popular");
  const latestMovies = await getMovies("movie/now_playing");
  const topRatedMovies = await getMovies("movie/top_rated");
  const trendingThisWeek = await getMovies("trending/all/week");

  return {
    props: {
      popularMovies,
      latestMovies,
      topRatedMovies,
      trendingThisWeek,
      uid: result.data.uid,
      email: result.data.email,
      profiles,
    },
  };
}

export default function Dashboard({
  uid,
  email,
  profiles,
  popularMovies,
  latestMovies,
  topRatedMovies,
  trendingThisWeek,
}) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    alias: "",
    id: "",
    isChoosing: true,
  });

  useEffect(() => {
    if (window && window.sessionStorage.getItem("profileChoosen")) {
      const { alias, id, isChoosing, imageUrl } = JSON.parse(
        window.sessionStorage.getItem("profileChoosen")
      );
      setProfile({
        alias,
        id,
        isChoosing,
        imageUrl,
      });
    }
  }, []);

  const onSearchSubmit = () => {
    setLoading(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Home - Nextflix</title>
        <link rel="icon" href="../../netflix-icon.ico" />
      </Head>
      {profile.isChoosing ? (
        <ProfileOverlay
          setProfile={setProfile}
          user={{ uid, email }}
          profiles={profiles}
        />
      ) : (
        <>
          <DashboardNavbar profile={profile} onSubmit={onSearchSubmit} />
          {loading && <LoaderScreen />}
          <MediaContainer
            popularMovies={popularMovies.results}
            latestMovies={latestMovies.results}
            topRatedMovies={topRatedMovies.results}
            trendingThisWeek={trendingThisWeek.results}
          />
        </>
      )}
    </div>
  );
}
