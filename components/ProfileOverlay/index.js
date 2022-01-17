import { useState } from "react";
import styles from "./styles.module.scss";
import Navbar from "../Navbar";
import CustomModal from "../Modal";
import Profile from "./profile";
import { TextField } from "@mui/material";
import { createProfile } from "../../firebase.config";

export default function ProfileOverlay({ user, profiles, setProfile }) {
  const [open, setOpen] = useState(false);
  const [newAlias, setNewAlias] = useState("");
  const openAddProfileModal = () => setOpen(true);
  const closeAddProfileModal = () => setOpen(false);
  const handleAddProfile = () => {
    createProfile(user, newAlias, "friend")
      .then((res) => {
        console.log(res);
        setOpen(false);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainSection}>
        <h2>Who&apos;s Watching?</h2>
        <ul className={styles.profilesContainer}>
          {profiles.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setProfile({
                  alias: item.alias,
                  id: item.id,
                  isChoosing: false,
                  imageUrl: item.imageUrl,
                });
                sessionStorage.setItem(
                  "profileChoosen",
                  JSON.stringify({
                    alias: item.alias,
                    id: item.id,
                    isChoosing: false,
                    imageUrl: item.imageUrl,
                  })
                );
              }}
            >
              <Profile type="existingProfile" {...item} />
            </li>
          ))}
          {profiles.length < 5 && (
            <li onClick={() => openAddProfileModal()}>
              <Profile type="addProfile" />
            </li>
          )}
        </ul>
        <CustomModal open={open} closeModal={closeAddProfileModal}>
          <div
            style={{
              margin: "auto",
              width: "fit-content",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src={profiles[0]?.imageUrl}
              style={{ width: "200px", height: "200px" }}
            />
            <br></br>
            <TextField
              id="new-profile-alias"
              label="Alias"
              variant="outlined"
              onChange={(e) => setNewAlias(e.target.value)}
            />
            <button
              style={{
                backgroundColor: "#e40a15",
                margin: "15px",
                padding: "10px",
                color: "white",
                cursor: "pointer",
                fontWeight: 700,
                border: "none",
                borderRadius: "4px",
              }}
              onClick={() => handleAddProfile()}
            >
              Done
            </button>
          </div>
        </CustomModal>
      </div>
    </div>
  );
}
