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

const EntryCategory = ({
  addModal,
  setAddModal,
  currentCategory,
  setEditCategory,
  handleCreateCategory,
  handleUpdateCategory,
}) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    note: "",
  });

  const handleModalClose = () => {
    setAddModal(false);
    setEditCategory(null);
    setFormData({
      name: "",
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
    if (currentCategory?.id) {
      handleUpdateCategory(currentCategory.id, formData);
    } else {
      handleCreateCategory(formData);
    }
    handleModalClose();
  };

  useEffect(() => {
    if (currentCategory) {
      setFormData(currentCategory);
    } else {
      setFormData({ name: "", note: "" });
    }
  }, [currentCategory]);

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
            Add Category
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

EntryCategory.propTypes = {
  addModal: PropTypes.any,
  setAddModal: PropTypes.any,
  currentCategory: PropTypes.any,
  setEditCategory: PropTypes.any,
  handleUpdateCategory: PropTypes.any,
  handleCreateCategory: PropTypes.any,
};

export default EntryCategory;
