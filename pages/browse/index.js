import axios from "axios";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import ProfileOverlay from "../../components/ProfileOverlay";
import styles from "./styles.module.scss";
import { checkSession, getProfiles } from "../../firebase.config";
import { useState } from "react";

export async function getServerSideProps() {
  const result = await checkSession();
  const profiles = await getProfiles(result.data.uid);
  if (result) {
    return {
      props: {
        uid: result.data.uid,
        email: result.data.email,
        profiles,
      },
    };
  }
}
export default function Dashboard({ uid, email, profiles }) {
  const router = useRouter();
  const [profile, setProfile] = useState({
    alias: "",
    id: "",
    isChoosing: true,
  });
  const handleLogout = () => {
    axios
      .post("/api/logout")
      .then((res) => router.push("/"))
      .catch((e) => console.log(e));
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
          <h2>Welcome, {profile.alias}</h2>
          <button onClick={() => handleLogout()}>Sign Out of Netflix</button>
        </>
      )}
    </div>
  );
}
