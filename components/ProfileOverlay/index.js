import { useState } from "react";
import styles from "./styles.module.scss";
import Navbar from "../Navbar";
import Profile from "./profile";
import { Backdrop, Box, Modal, Fade, TextField } from "@mui/material";
import { createProfile } from "../../firebase.config";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#D4D4D4",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProfileOverlay({ user, profiles, setProfile }) {
  const [open, setOpen] = useState(false);
  const [newAlias, setNewAlias] = useState("");
  const openAddProfileModal = () => setOpen(true);
  const closeAddProfileModal = () => setOpen(false);
  const handleAddProfile = () => {
    createProfile(user, newAlias, "friend").then((res) => {
      console.log(res);
    });
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
        <Modal
          open={open}
          onClose={closeAddProfileModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={modalStyle}>
              <div
                style={{
                  margin: "auto",
                  width: "fit-content",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={profiles[0].imageUrl}
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
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
