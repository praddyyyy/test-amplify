import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Equalizer from "./Equalizer";
import EqualizerIcon from '@mui/icons-material/Equalizer';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "white",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
  height: "25%",
};

export default function TransitionsModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <EqualizerIcon />
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1,backdropFilter:"blur(10px)" }}
        open={open}
        onClick={handleClose}
      ></Backdrop>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Equalizer close={handleClose} filter = {props.filter} panner={props.panner}/>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
