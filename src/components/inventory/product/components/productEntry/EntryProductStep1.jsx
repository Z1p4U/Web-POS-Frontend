import { TextField, Box, FormControl, Chip, Autocomplete } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const EntryProductStep1 = React.memo(
  ({ formData, onInputChange, brands, categories, suppliers }) => {
    return (
      <Box className="flex gap-10">
        {/* Form Fields */}
        <Box className="w-full lg:w-5/6">
          <Box className="border border-gray-400 p-10 flex flex-col gap-6 w-full rounded-md">
            {/* Name */}
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => onInputChange("name", e.target.value)}
              fullWidth
              variant="outlined"
              required
            />
            {/* Brand */}
            <FormControl fullWidth>
              <Autocomplete
                id="brand-autocomplete"
                options={brands || []}
                groupBy={(option) => option.name[0].toUpperCase()}
                getOptionLabel={(option) => option.name}
                value={
                  formData.brand_id
                    ? brands.find((brand) => brand.id === formData.brand_id)
                    : null
                }
                onChange={(event, newValue) => {
                  onInputChange("brand_id", newValue ? newValue.id : "");
                }}
                renderInput={(params) => {
                  const { key, ...rest } = params; // Remove key from params
                  return (
                    <TextField
                      key={key}
                      {...rest}
                      label="Brand"
                      placeholder="Select Brand"
                      required
                    />
                  );
                }}
              />
            </FormControl>

            {/* Category Multi-Select with Chips */}
            <FormControl fullWidth>
              <Autocomplete
                multiple
                id="category-autocomplete"
                options={categories || []}
                groupBy={(option) => option?.name[0]?.toUpperCase()}
                getOptionLabel={(option) => option?.name}
                value={
                  formData?.category_ids
                    ? categories?.filter((cat) =>
                        formData?.category_ids.includes(cat?.id)
                      )
                    : []
                }
                onChange={(event, newValue) => {
                  onInputChange(
                    "category_ids",
                    newValue?.map((option) => option?.id)
                  );
                }}
                renderInput={(params) => {
                  const { key, ...rest } = params; // Remove key from params
                  return (
                    <TextField
                      key={key}
                      {...rest}
                      label="Category"
                      placeholder="Select Category"
                      required
                    />
                  );
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    const { key, ...chipProps } = getTagProps({ index });
                    return (
                      <Chip
                        key={key}
                        label={option?.name}
                        {...chipProps} // Spread the rest without the key
                      />
                    );
                  })
                }
              />
            </FormControl>

            {/* Supplier Multi-Select with Chips */}
            <FormControl fullWidth>
              <Autocomplete
                multiple
                id="supplier-autocomplete"
                options={suppliers || []}
                groupBy={(option) => option.name[0].toUpperCase()}
                getOptionLabel={(option) => option.name}
                value={
                  formData.supplier_ids
                    ? suppliers.filter((sup) =>
                        formData.supplier_ids.includes(sup.id)
                      )
                    : []
                }
                onChange={(event, newValue) => {
                  // Update formData with an array of selected supplier IDs.
                  onInputChange(
                    "supplier_ids",
                    newValue.map((option) => option.id)
                  );
                }}
                renderInput={(params) => {
                  // Remove the key from params before spreading
                  const { key, ...rest } = params;
                  return (
                    <TextField
                      key={key}
                      {...rest}
                      label="Supplier"
                      placeholder="Select Supplier"
                      required
                    />
                  );
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    // Destructure out key from getTagProps to avoid conflict
                    const { key, ...chipProps } = getTagProps({ index });
                    return (
                      <Chip key={key} label={option.name} {...chipProps} />
                    );
                  })
                }
              />
            </FormControl>

            {/* Unit */}
            <TextField
              label="Unit"
              value={formData.unit}
              onChange={(e) => onInputChange("unit", e.target.value)}
              fullWidth
              variant="outlined"
              required
            />
            {/* Description */}
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => onInputChange("description", e.target.value)}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>
    );
  }
);

EntryProductStep1.displayName = "EntryProductStep1";

EntryProductStep1.propTypes = {
  formData: PropTypes.any,
  onInputChange: PropTypes.any,
  brands: PropTypes.any,
  categories: PropTypes.any,
  suppliers: PropTypes.any,
};

export default EntryProductStep1;
