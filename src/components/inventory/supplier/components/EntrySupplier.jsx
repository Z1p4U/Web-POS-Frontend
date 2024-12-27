import { useEffect, useState } from "react";
import {
  SwipeableDrawer,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import ModalMedia from "../../../ui/model/MediaModel";
import PropTypes from "prop-types";

const EntrySupplier = ({
  addModal,
  setAddModal,
  currentSupplier,
  setEditSupplier,
  handleCreateSupplier,
  handleUpdateSupplier,
}) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    note: "",
  });

  const handleModalClose = () => {
    setAddModal(false);
    setEditSupplier(null);
    setFormData({
      name: "",
      phone_number: "",
      note: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      photo: imageUrl,
    }));
    setImageModalOpen(false);
  };

  const handleSubmit = () => {
    if (currentSupplier?.id) {
      handleUpdateSupplier(currentSupplier.id, formData);
    } else {
      handleCreateSupplier(formData);
    }
    handleModalClose();
  };

  useEffect(() => {
    if (currentSupplier) {
      setFormData(currentSupplier);
    } else {
      setFormData({ name: "", phone_number: "", note: "" });
    }
  }, [currentSupplier]);

  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={addModal}
        onClose={() => handleModalClose()}
        onOpen={() => {}}
      >
        <Box sx={{ width: 400, p: 3, mt: 8 }}>
          <Typography variant="h6" mb={2}>
            Add Supplier
          </Typography>

          {/* Name Field */}
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />

          {/* Phone Number Field */}
          <TextField
            fullWidth
            label="Phone Number"
            name="phone_number"
            value={formData.phone}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />

          {/* Note Field */}
          <TextField
            fullWidth
            label="Note"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </SwipeableDrawer>

      {/* Image Modal */}
      <ModalMedia
        opened={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        handleImageSelect={handleImageSelect}
      />
    </>
  );
};

EntrySupplier.propTypes = {
  addModal: PropTypes.any,
  setAddModal: PropTypes.any,
  currentSupplier: PropTypes.any,
  setEditSupplier: PropTypes.any,
  handleUpdateSupplier: PropTypes.any,
  handleCreateSupplier: PropTypes.any,
};

export default EntrySupplier;
