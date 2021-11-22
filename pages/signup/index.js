import Head from "next/head";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./styles.module.scss";
import checkmark from "../../assets/images/checkmark.png";
import checkIcon from "../../assets/images/check.svg";

export default function SignUp() {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Nextflix - Registration</title>
        </Head>
        <Navbar page="registration" />
        <div className={styles.mainSection}>
          <div style={{ height: "50px", width: "50px", margin: "auto" }}>
            <Image src={checkmark} />
          </div>
          <p>
            STEP <b>2</b> OF <b>3</b>
          </p>
          <h3>Choose your plan.</h3>
          <ul>
            <li>
              <Image src={checkIcon} />
              <span>No commitments, cancel anytime.</span>
            </li>
            <li>
              <Image src={checkIcon} />
              <span>Everything on Netflix for one low price.</span>
            </li>
            <li>
              <Image src={checkIcon} />
              <span>No ads and no extra fees. Ever.</span>
            </li>
          </ul>
          <button type="submit" className={styles.nextButton}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
