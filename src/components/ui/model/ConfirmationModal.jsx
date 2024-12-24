import { Modal, Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  message = "Are you sure to delete?",
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          border: "0px",
          borderRadius: "20px",
          outline: "0px",
          boxShadow: 0,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Confirmation
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Yes
          </Button>
          <Button variant="contained" onClick={onClose}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.any,
  onConfirm: PropTypes.any,
  message: PropTypes.any,
};

export default ConfirmationModal;
