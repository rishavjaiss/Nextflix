import styles from "./styles.module.scss";
import Link from "next/link";

export default function Footer({ page }) {
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: page === "homepage" && "black" }}
    >
      <p>Questions? Call 000-800-040-1843</p>
      <ul style={{ color: page === "homepage" && "white" }}>
        <li>
          <Link href="#">FAQs</Link>
        </li>
        <li>
          <Link href="#">Cookie Preferences</Link>
        </li>
        <li>
          <Link href="#">Help Center</Link>
        </li>
        <li>
          <Link href="#">Corporate Information</Link>
        </li>
        <li>
          <Link href="#">Terms Of Use</Link>
        </li>
        <li>
          <Link href="#">Privacy</Link>
        </li>
      </ul>
    </div>
  );
}
