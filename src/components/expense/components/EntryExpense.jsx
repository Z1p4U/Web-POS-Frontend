import { useEffect, useState } from "react";
import {
  SwipeableDrawer,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const EntryExpense = ({
  addModal,
  setAddModal,
  currentExpense,
  setEditExpense,
  handleCreateExpense,
  handleUpdateExpense,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    note: "",
  });

  const handleModalClose = () => {
    setAddModal(false);
    setEditExpense(null);
    setFormData({
      title: "",
      amount: "",
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

  const handleSubmit = () => {
    if (currentExpense?.id) {
      handleUpdateExpense(currentExpense.id, formData);
    } else {
      handleCreateExpense(formData);
    }
    handleModalClose();
  };

  useEffect(() => {
    if (currentExpense) {
      setFormData(currentExpense);
    } else {
      setFormData({ title: "", amount: "", note: "" });
    }
  }, [currentExpense]);

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
            Add Expense
          </Typography>

          {/* Title Field */}
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />

          {/* Amount Field */}
          <TextField
            fullWidth
            type="number"
            label="Amount"
            name="amount"
            value={formData.amount}
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
    </>
  );
};

EntryExpense.propTypes = {
  addModal: PropTypes.any,
  setAddModal: PropTypes.any,
  currentExpense: PropTypes.any,
  setEditExpense: PropTypes.any,
  handleUpdateExpense: PropTypes.any,
  handleCreateExpense: PropTypes.any,
};

export default EntryExpense;
