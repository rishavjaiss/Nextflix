import { useEffect, useState } from "react";
import Head from "next/head";
import DashboardNavbar from "../../components/DashboardNavbar";
import SearchResults from "../../components/SearchResults";
import LoaderScreen from "../../components/LoaderScreen";
import styles from "./styles.module.scss";
import { searchMovies } from "../../utils/helper";

export async function getServerSideProps({ params: { query } }) {
  const searchedMovies = await searchMovies(query);
  return {
    props: {
      searchResults: searchedMovies,
    },
  };
}

export default function SearchQuery({ searchResults }) {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const profile = JSON.parse(window.sessionStorage.profileChoosen);
    setProfile(profile);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [searchResults]);

  const onSearchSubmit = () => {
    setLoading(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Search Results - Nextflix</title>
        <link rel="icon" href="../../netflix-icon.ico" />
      </Head>
      <>
        <DashboardNavbar profile={profile} onSubmit={onSearchSubmit} />
        {loading && <LoaderScreen />}
        <SearchResults searchedMovies={searchResults.results} />
      </>
    </div>
  );
}
