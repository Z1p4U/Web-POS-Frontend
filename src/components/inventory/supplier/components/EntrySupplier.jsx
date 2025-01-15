import { useEffect, useState } from "react";
import {
  SwipeableDrawer,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const EntrySupplier = ({
  addModal,
  setAddModal,
  currentSupplier,
  setEditSupplier,
  handleCreateSupplier,
  handleUpdateSupplier,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    phone_number: "",
    secondary_phone_number: "",
    email: "",
    address: "",
  });

  const handleModalClose = () => {
    setAddModal(false);
    setEditSupplier(null);
    setFormData({
      name: "",
      company_name: "",
      phone_number: "",
      secondary_phone_number: "",
      email: "",
      address: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      setFormData({
        name: "",
        company_name: "",
        phone_number: "",
        secondary_phone_number: "",
        email: "",
        address: "",
      });
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

          {/* Company Name Field */}
          <TextField
            fullWidth
            label="Company Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />

          {/* Phone Number Field */}
          <TextField
            fullWidth
            label="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />

          {/* Secondary Phone Number Field */}
          <TextField
            fullWidth
            label="Secondary Phone Number"
            name="secondary_phone_number"
            value={formData.secondary_phone_number}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />

          {/* Secondary Phone Number Field */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />

          {/* Secondary Phone Number Field */}
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
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
