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
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import PropTypes from "prop-types";
import useStock from "../../../../redux/hooks/inventory/stock/useStock";

const EntryStock = ({
  stockEntryModal,
  setStockEntryModal,
  currentProduct,
  setCurrentProduct,
  refetchProducts,
}) => {
  const { handleControlStock } = useStock();

  const [formData, setFormData] = useState({
    product_id: "",
    quantity: "",
    movement_type: "stock_in",
    note: "",
  });

  useEffect(() => {
    if (currentProduct) {
      setFormData((prev) => ({
        ...prev,
        product_id: currentProduct.id || "",
      }));
    }
  }, [currentProduct]);

  const handleModalClose = () => {
    setStockEntryModal(false);
    setCurrentProduct(null);
    setFormData({
      product_id: "",
      quantity: "",
      movement_type: "stock_in",
      note: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    setFormData((prev) => {
      if (name === "quantity") {
        if (prev.movement_type === "stock_out") {
          const maxStock = currentProduct?.total_stock || 0;
          return {
            ...prev,
            quantity: numericValue > maxStock ? maxStock.toString() : value,
          };
        }
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSelectChange = (e) => {
    const newMovementType = e.target.value;

    setFormData((prev) => {
      if (newMovementType === "stock_out") {
        const maxStock = currentProduct?.total_stock || 0;
        return {
          ...prev,
          movement_type: newMovementType,
          quantity:
            parseFloat(prev.quantity) > maxStock
              ? maxStock.toString()
              : prev.quantity,
        };
      }
      return {
        ...prev,
        movement_type: newMovementType,
      };
    });
  };

  const handleSubmit = async () => {
    const response = await handleControlStock(formData);
    if (response) {
      refetchProducts();
    }
    handleModalClose();
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={stockEntryModal}
      onClose={handleModalClose}
      onOpen={() => {}}
    >
      <Box sx={{ width: 400, p: 3, mt: 8 }}>
        <Typography variant="h6" mb={2}>
          Add Stock to{" "}
          <span style={{ color: "#1976d2", fontWeight: "bold" }}>
            {currentProduct?.name}
          </span>
        </Typography>

        <Typography variant="subtitle1" mb={2}>
          <span style={{ color: "#1976d2", fontWeight: "bold" }}>
            {currentProduct?.name}
          </span>{" "}
          currently has{" "}
          <span style={{ color: "#1976d2", fontWeight: "bold" }}>
            {currentProduct?.total_stock} {currentProduct?.unit}
          </span>
        </Typography>

        {/* Quantity Field */}
        <TextField
          fullWidth
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />

        {/* Movement Type */}
        <FormControl fullWidth margin="normal">
          <InputLabel required id="movement_type">
            Type
          </InputLabel>
          <Select
            labelId="movement_type"
            value={formData.movement_type}
            onChange={handleSelectChange}
            input={<OutlinedInput label="Movement Type" />}
          >
            <MenuItem value="stock_in">Stock In</MenuItem>
            <MenuItem value="stock_out">Stock Out</MenuItem>
            <MenuItem value="return">Return</MenuItem>
          </Select>
        </FormControl>

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
  );
};

EntryStock.propTypes = {
  stockEntryModal: PropTypes.bool.isRequired,
  setStockEntryModal: PropTypes.func.isRequired,
  currentProduct: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    total_stock: PropTypes.number,
    unit: PropTypes.string,
  }),
  refetchProducts: PropTypes.func.isRequired,
  setCurrentProduct: PropTypes.func.isRequired,
};

export default EntryStock;
