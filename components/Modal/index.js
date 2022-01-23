import React from "react";
import { Modal, Box, Fade, Backdrop } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  maxWidth: "auto",
  bgcolor: "#D4D4D4",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CustomModal({ children, open, closeModal }) {
  return (
    <Modal
      open={open}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>{children}</Box>
      </Fade>
    </Modal>
  );
}
