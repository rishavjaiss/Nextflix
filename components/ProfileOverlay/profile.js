import Image from "next/dist/client/image";
import addProfileIcon from "../../assets/images/addProfile-icon.png";

export default function Profile({ type, imageUrl, alias }) {
  if (type === "existingProfile") {
    return (
      <>
        <img src={imageUrl} style={{ height: "200px", width: "200px" }} />
        <p style={{ color: "#D4D4D4" }}>{alias}</p>
      </>
    );
  } else if (type === "addProfile") {
    return (
      <>
        <Image src={addProfileIcon} width="200px" height="200px" />
        <p style={{ color: "#D4D4D4" }}>Add Profile</p>
      </>
    );
  }
}
