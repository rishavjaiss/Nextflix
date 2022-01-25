import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import styles from "./styles.module.scss";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { BASE_URL } from "../../../utils/helper";

export default function RegForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ type: "", message: "" });
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length === 0) {
      setError({ type: "email", message: "Please enter email address" });
    } else if (password.length < 6) {
      setError({
        type: "password",
        message: "Password must be equal or more then 6 letters.",
      });
    } else {
      setError("");
      axios
        .post(`${BASE_URL}/api/registration`, { email, password })
        .then((res) => {
          router.push("/browse");
        })
        .catch((e) => console.log(e));
    }
  };
  useEffect(() => {
    if (localStorage.getItem("registrationEmail")) {
      setEmail(localStorage.getItem("registrationEmail"));
    }
  }, []);
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Nextflix - Registration</title>
          <link rel="icon" href="../../netflix-icon.ico" />
        </Head>
        <Navbar page="registration" />
        <div className={styles.mainSection}>
          <p>
            STEP <b>2</b> OF <b>3</b>
          </p>
          <h3>Create a password to start your membership</h3>
          <span>
            Just a few more steps and you&apos;re done! We hate paperwork, too.
          </span>
          <form onSubmit={handleSubmit}>
            <TextField
              id="email"
              label="Email"
              variant="filled"
              type="email"
              value={email}
              color={error.type === "email" ? "error" : "success"}
              error={error.type === "email"}
              helperText={error.type === "email" && error.message}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <TextField
              id="password"
              type="password"
              label="Add a password"
              variant="filled"
              color={error.type === "password" ? "error" : "success"}
              error={error.type === "password"}
              helperText={error.type === "password" && error.message}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={styles.nextButton}>
              Next
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
