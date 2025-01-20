import { useEffect, useState } from "react";
import {
  SwipeableDrawer,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PropTypes from "prop-types";

const UserEntry = ({
  addModal,
  setAddModal,
  currentUser,
  setEditUser,
  handleRegisterUser,
  handleEditUserProfile,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "staff",
    password: "",
    password_confirmation: "",
  });

  const handleModalClose = () => {
    setAddModal(false);
    setEditUser(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "staff",
      password: "",
      password_confirmation: "",
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
    if (currentUser?.id) {
      handleEditUserProfile(currentUser.id, formData);
    } else {
      handleRegisterUser(formData);
    }
    handleModalClose();
  };

  useEffect(() => {
    if (currentUser) {
      setFormData(currentUser);
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "staff",
        password: "",
        password_confirmation: "",
      });
    }
  }, [currentUser]);

  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={addModal}
        onClose={handleModalClose}
        onOpen={() => {}}
      >
        <Box sx={{ width: 400, p: 3, mt: 8 }}>
          <Typography variant="h6" mb={2}>
            {currentUser ? "Edit User" : "Add User"}
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

          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />

          {/* Phone Number Field */}
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />

          {/* Role Field */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role-select"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              variant="outlined"
              label="Role"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="staff">Staff</MenuItem>
            </Select>
          </FormControl>

          {/* Password Field */}
          {!currentUser && (
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          )}

          {/* Password Confirmation Field */}
          {!currentUser && (
            <TextField
              fullWidth
              label="Password Confirmation"
              name="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          )}

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

UserEntry.propTypes = {
  addModal: PropTypes.bool.isRequired,
  setAddModal: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  setEditUser: PropTypes.func,
  handleRegisterUser: PropTypes.func.isRequired,
  handleEditUserProfile: PropTypes.func.isRequired,
};

export default UserEntry;
