import Image from "next/image";
import Link from "next/link";
import netflixLogo from "../../assets/images/Netflix-logo.svg";
import styles from "./styles.module.scss";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <Image src={netflixLogo} width="150" height="75" />
      </Link>
      <div>
        <select name="lang" id="lang">
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
        </select>
        <Link href="/login">Sign In</Link>
      </div>
    </div>
  );
}
