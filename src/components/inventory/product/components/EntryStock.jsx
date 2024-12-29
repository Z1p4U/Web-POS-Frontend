import { useEffect, useState } from "react";
import {
  SwipeableDrawer,
  Box,
  TextField,
  Button,
  Typography,
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
  const { handleAddStock } = useStock();

  const [formData, setFormData] = useState({
    product_id: "",
    quantity: "",
    note: "",
  });

  const handleModalClose = () => {
    setStockEntryModal(false);
    setCurrentProduct(null);
    setFormData({
      product_id: "",
      quantity: "",
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
    const response = handleAddStock(formData);
    if (response) {
      refetchProducts();
    }

    handleModalClose();
  };

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        product_id: currentProduct.id || "",
        quantity: "",
        note: "",
      });
    } else {
      setFormData({
        product_id: "",
        quantity: "",
        note: "",
      });
    }
  }, [currentProduct]);

  console.log(formData);
  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={stockEntryModal}
        onClose={handleModalClose}
        onOpen={() => {}}
      >
        <Box sx={{ width: 400, p: 3, mt: 8 }}>
          <Typography variant="h6" mb={2}>
            Add Stock to{" "}
            <span className=" text-primary font-bold">
              {currentProduct?.name}
            </span>
          </Typography>

          <Typography variant="subtitle1" mb={2}>
            <span className=" text-primary font-bold">
              {currentProduct?.name}
            </span>{" "}
            currently has{" "}
            <span className=" text-primary font-bold">
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

EntryStock.propTypes = {
  stockEntryModal: PropTypes.any,
  setStockEntryModal: PropTypes.any,
  currentProduct: PropTypes.any,
  refetchProducts: PropTypes.any,
  setCurrentProduct: PropTypes.any,
};

export default EntryStock;
