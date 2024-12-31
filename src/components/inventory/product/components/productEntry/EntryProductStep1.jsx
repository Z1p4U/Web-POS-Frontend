import {
  TextField,
  Select,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
} from "@mui/material";
import PropTypes from "prop-types";
import useBrand from "../../../../../redux/hooks/inventory/brand/useBrand";
import useCategory from "../../../../../redux/hooks/inventory/category/useCategory";
import useSupplier from "../../../../../redux/hooks/inventory/supplier/useSupplier";

const EntryProductStep1 = ({ formData, onInputChange }) => {
  const { brands } = useBrand({ noPagination: true });
  const { fetchAllCategory } = useCategory();
  const { fetchAllSuppliers } = useSupplier();

  console.log(brands);

  // Handle multi-select for categories and suppliers
  const handleCategoryChange = (event) => {
    onInputChange("category_ids", event.target.value);
  };

  const handleSupplierChange = (event) => {
    onInputChange("supplier_ids", event.target.value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Box className="flex gap-10">
      {/* Form Fields */}
      <Box className="w-5/6">
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
            <InputLabel id="brand-label">Brand</InputLabel>
            <Select
              labelId="brand-label"
              value={formData.brand_id}
              onChange={(e) => onInputChange("brand_id", e.target.value)}
              required
              input={<OutlinedInput id="select-brand-chip" label="Brand" />}
              MenuProps={MenuProps}
            >
              {brands?.map((brand) => (
                <MenuItem key={brand.id} value={brand.id}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Category Multi-Select with Chips */}
          {/* <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              multiple
              value={formData.category_ids || []}
              onChange={handleCategoryChange}
              input={
                <OutlinedInput id="select-category-chip" label="Category" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((id) => {
                    const category = allCategories?.find(
                      (cat) => cat.id === id
                    );
                    return category ? (
                      <Chip key={id} label={category.name} />
                    ) : null;
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {allCategories?.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

          {/* Supplier Multi-Select with Chips */}
          {/* <FormControl fullWidth>
            <InputLabel id="supplier-label">Supplier</InputLabel>
            <Select
              labelId="supplier-label"
              multiple
              value={formData.supplier_ids || []}
              onChange={handleSupplierChange}
              input={
                <OutlinedInput id="select-supplier-chip" label="Supplier" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((id) => {
                    const supplier = allSuppliers?.find((sup) => sup.id === id);
                    return supplier ? (
                      <Chip key={id} label={supplier.name} />
                    ) : null;
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {allSuppliers?.map((supplier) => (
                <MenuItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

          {/* Unit */}
          <TextField
            label="Unit"
            value={formData.unit}
            onChange={(e) => onInputChange("unit", e.target.value)}
            fullWidth
            variant="outlined"
            required
          />

          {/* More Information */}
          <TextField
            label="More Information"
            value={formData.more_information}
            onChange={(e) => onInputChange("more_information", e.target.value)}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
          />
        </Box>
      </Box>
    </Box>
  );
};

EntryProductStep1.propTypes = {
  formData: PropTypes.any,
  onInputChange: PropTypes.any,
};

export default EntryProductStep1;
