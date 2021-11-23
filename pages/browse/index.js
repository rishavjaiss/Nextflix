import axios from "axios";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";
import { checkSession } from "../../firebase.config";

export async function getServerSideProps() {
  const result = await checkSession();
  if (result) {
    return {
      props: {
        uid: result.data.uid,
        email: result.data.email,
      },
    };
  }
}
export default function Dashboard({ uid, email }) {
  const router = useRouter();
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
      <Navbar />
      <h3>Welcome, {email}</h3>
      <button onClick={() => handleLogout()}>Sign Out of Netflix</button>
    </div>
  );
}
