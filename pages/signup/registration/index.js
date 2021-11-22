import Head from "next/head";
import Image from "next/dist/client/image";
import Navbar from "../../../components/Navbar";
import Link from "next/link";
import Footer from "../../../components/Footer";
import styles from "./styles.module.scss";
import registrationStep1 from "../../../assets/images/registration-1.png";

export default function Registration() {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Nextflix - Registration</title>
        </Head>
        <Navbar page="registration" />
        <div className={styles.mainSection}>
          <Image src={registrationStep1} />
          <p>
            STEP <b>1</b> OF <b>3</b>
          </p>
          <h3>Finish setting up your account</h3>
          <p>
            Nextflix is personalised for you. Create a password to watch on any
            device at any time.
          </p>
          <Link href="/signup/regform">
            <button className={styles.nextButton}>Next</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
