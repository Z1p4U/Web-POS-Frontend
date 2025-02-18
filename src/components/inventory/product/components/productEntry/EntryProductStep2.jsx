import { TextField, Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const EntryProductStep2 = React.memo(({ formData, onInputChange }) => {
  return (
    <Box className="flex gap-10 w-full h-full">
      {/* Form Fields */}
      <Box className="w-full lg:w-5/6">
        <Box className="border border-gray-400 p-10 flex flex-col gap-6 w-full rounded-md">
          {/* Actual Price */}
          <TextField
            label="Actual Price"
            value={formData.actual_price}
            onChange={(e) => onInputChange("actual_price", e.target.value)}
            fullWidth
            variant="outlined"
            required
          />

          {/* Sale Price */}
          <TextField
            label="Sale Price"
            value={formData.sale_price}
            onChange={(e) => onInputChange("sale_price", e.target.value)}
            fullWidth
            variant="outlined"
            required
          />
        </Box>
      </Box>
    </Box>
  );
});

EntryProductStep2.displayName = "EntryProductStep2";

EntryProductStep2.propTypes = {
  formData: PropTypes.any,
  onInputChange: PropTypes.any,
};

export default EntryProductStep2;
