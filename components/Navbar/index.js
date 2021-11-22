import Image from "next/image";
import Link from "next/link";
import netflixLogo from "../../assets/images/Netflix-logo.svg";
import styles from "./styles.module.scss";

export default function Navbar({ page }) {
  return (
    <div className={styles.container}>
      <Link href="/">
        <Image src={netflixLogo} width="175" height="75" />
      </Link>
      <div>
        {page === "registration" && <Link href="/login">Sign In</Link>}
        {page === "homepage" && (
          <>
            <select name="lang" id="lang">
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
            </select>
            <Link href="/login">
              <button>Sign In</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
