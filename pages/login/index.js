import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Checkbox,
  FormControlLabel,
  CircularProgress,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";
import { BASE_URL } from "../../utils/helper";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [error, setError] = useState({ type: "", message: "" });
  const [loginLoading, setLoginLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("loginEmail")) {
      setEmail(localStorage.getItem("loginEmail"));
    }
  }, []);

  const handleSubmit = (e) => {
    setLoginLoading(true);
    e.preventDefault();
    if (email.length === 0) {
      setError({
        type: "email",
        message: "Please enter a valid email address",
      });
    } else if (password.length === 0) {
      setError({
        type: "password",
        message: "Please enter password.",
      });
    } else {
      setError("");
      isRememberMe
        ? localStorage.setItem("loginEmail", email)
        : localStorage.removeItem("loginEmail");
      axios
        .post(`${BASE_URL}/api/login`, { email, password })
        .then((res) => {
          router.replace("/browse");
        })
        .catch((e) => {
          setLoginLoading(false);
          alert("Oops, something went wrong. Please try again later!");
          console.log(e);
        });
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix - Login</title>
        <link rel="icon" href="../../netflix-icon.ico" />
      </Head>
      <div className={styles.mainSection}>
        <Navbar />
        <form onSubmit={handleSubmit}>
          <h2>Sign In</h2>
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
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: grey[800],
                  "&.Mui-checked": {
                    color: grey[600],
                  },
                }}
                onChange={setIsRememberMe}
              />
            }
            label="Remember me"
            className={styles.checkbox}
          />
          <button className={styles.signInButton}>
            {loginLoading ? (
              <CircularProgress color="info" thickness={5} size={20} />
            ) : (
              "Sign In"
            )}
          </button>
          <p>
            New to Netflix? <Link href="/">Sign up now.</Link>
          </p>
          <span>
            This page is protected by Google reCAPTCHA to ensure you&apos;re not
            a bot.
          </span>
        </form>
      </div>
    </div>
  );
}
