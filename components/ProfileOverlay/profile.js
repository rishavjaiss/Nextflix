import Image from "next/dist/client/image";
import addProfileIcon from "../../assets/images/addProfile-icon.png";
import styles from "./styles.module.scss";

export default function Profile({ type, imageUrl, alias }) {
  if (type === "existingProfile") {
    return (
      <div className={styles.profile}>
        <img src={imageUrl} />
        <p>{alias}</p>
      </div>
    );
  } else if (type === "addProfile") {
    return (
      <div className={styles.profile}>
        <img src={addProfileIcon.src} />
        <p>Add Profile</p>
      </div>
    );
  }
}
