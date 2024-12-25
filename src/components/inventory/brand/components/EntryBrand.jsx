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

const EntryBrand = ({
  addModal,
  setAddModal,
  currentBrand,
  setEditBrand,
  handleCreateBrand,
  handleUpdateBrand,
}) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    photo: "",
    name: "",
    company: "",
    note: "",
  });

  const handleModalClose = () => {
    setAddModal(false);
    setEditBrand(null);
    setFormData({
      photo: "",
      name: "",
      company: "",
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
    if (currentBrand?.id) {
      handleUpdateBrand(currentBrand.id, formData);
    } else {
      handleCreateBrand(formData);
    }
    handleModalClose();
  };

  useEffect(() => {
    if (currentBrand) {
      setFormData(currentBrand);
    } else {
      setFormData({ photo: "", name: "", company: "", note: "" });
    }
  }, [currentBrand]);

  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={addModal}
        onClose={() => handleModalClose()}
        onOpen={() => {}}
      >
        <Box sx={{ width: 400, p: 3 }}>
          <Typography variant="h6" mb={2}>
            Add Brand
          </Typography>

          {/* Image Placeholder */}
          <Box
            sx={{
              height: 150,
              width: "100%",
              bgcolor: formData.photo ? "transparent" : "grey.200",
              border: "1px dashed grey",
              borderRadius: 2,
              mb: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => setImageModalOpen(true)}
          >
            {formData.photo ? (
              <img
                src={formData.photo}
                alt="Selected"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <Typography color="text.secondary">
                Click to select image
              </Typography>
            )}
          </Box>

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

          {/* Company Field */}
          <TextField
            fullWidth
            label="Company"
            name="company"
            value={formData.company}
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

EntryBrand.propTypes = {
  addModal: PropTypes.any,
  setAddModal: PropTypes.any,
  currentBrand: PropTypes.any,
  setEditBrand: PropTypes.any,
  handleUpdateBrand: PropTypes.any,
  handleCreateBrand: PropTypes.any,
};

export default EntryBrand;
