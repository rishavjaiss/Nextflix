import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import DashboardNavbar from "../../components/DashboardNavbar";
import SearchResults from "../../components/SearchResults";
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
        <title>Search Results - Nextflix</title>
        <link rel="icon" href="../../netflix-icon.ico" />
      </Head>
      <>
        <DashboardNavbar handleLogout={handleLogout} profile={profile} />
        <SearchResults searchedMovies={searchResults.results} />
      </>
    </div>
  );
}
