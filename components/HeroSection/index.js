import { useState } from "react";
import Navbar from "../Navbar";
import styles from "./styles.module.scss";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <section className={styles.container}>
      <Navbar />
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Get Started &gt;</button>
        </form>
      </div>
    </section>
  );
}
