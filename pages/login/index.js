import Head from "next/head";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix - Login</title>
      </Head>
      <Navbar />
      <h3>Login</h3>
    </div>
  );
}
