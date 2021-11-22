import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import Navbar from "../Navbar";
import styles from "./styles.module.scss";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length === 0) {
      setError(true);
    } else {
      localStorage.setItem("registrationEmail", email);
      router.push("/signup/registration");
    }
  };
  return (
    <section className={styles.container}>
      <Navbar page="homepage" />
      <div className={styles.mainSection}>
        <h1 className={styles.header}>Unlimited movies, TV shows and more.</h1>
        <h2 className={styles.subheader}>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            placeholder="Email address"
            type="email"
            className={error ? styles.inputError : undefined}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Get Started &gt;</button>
        </form>
        {error && <p className={styles.error}>Email is required.</p>}
      </div>
    </section>
  );
}
