import { useState } from "react";
import Banner from "../../../ui/banner/Banner";
import { Button, Box } from "@mui/material";
import CustomStepper from "./productEntry/CustomStepper";
import EntryProductStep1 from "./productEntry/EntryProductStep1";
import EntryProductStep2 from "./productEntry/EntryProductStep2";
import EntryProductStep3 from "./productEntry/EntryProductStep3";
import EntryProductConfirmation from "./productEntry/EntryProductConfirmation";
import useProduct from "../../../../redux/hooks/inventory/product/useProduct";
import useBrand from "../../../../redux/hooks/inventory/brand/useBrand";
import useCategory from "../../../../redux/hooks/inventory/category/useCategory";
import useSupplier from "../../../../redux/hooks/inventory/supplier/useSupplier";
import { useNavigate } from "react-router-dom";

const EntryProduct = () => {
  const { handleCreateProduct } = useProduct({ noPagination: true });
  const { brands } = useBrand({ noPagination: true });
  const { categories } = useCategory({ noPagination: true });
  const { suppliers } = useSupplier({ noPagination: true });
  const nav = useNavigate();

  const steps = ["Information", "Price", "Photo", "Confirmation"];
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    brand_id: "",
    category_ids: [],
    supplier_ids: [],
    actual_price: "",
    sale_price: "",
    unit: "",
    description: "",
    photo: "",
  });

  // Validation function
  const isFormComplete = () => {
    return (
      formData.name.trim() &&
      formData.brand_id &&
      formData.category_ids.length > 0 &&
      formData.supplier_ids.length > 0 &&
      formData.actual_price.trim() &&
      formData.sale_price.trim() &&
      formData.unit.trim() &&
      formData.photo.trim()
    );
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Form Data:", formData);
    const response = handleCreateProduct(formData);
    if (response) {
      nav("/inventory/product");
    }
  };

  return (
    <Box className="w-full flex justify-center">
      <Box className="w-full my-6 flex flex-col gap-10">
        {/* Banner */}
        <Box className="col-span-3">
          <Banner
            title={`Entry Product`}
            path1={"Inventory"}
            path2={"Product"}
          />
        </Box>

        {/* Main Form & Stepper Layout */}
        <Box className="flex flex-col">
          {/* Form Section */}
          <Box className=" w-full">
            <form
              onSubmit={handleSubmit}
              className=" w-full grid grid-cols-3 gap-5"
            >
              <div className="w-full col-span-3 lg:col-span-2 order-2 lg:order-1">
                {currentStep === 1 && (
                  <EntryProductStep1
                    formData={formData}
                    onInputChange={handleInputChange}
                    brands={brands}
                    categories={categories}
                    suppliers={suppliers}
                  />
                )}
                {currentStep === 2 && (
                  <EntryProductStep2
                    formData={formData}
                    onInputChange={handleInputChange}
                  />
                )}
                {currentStep === 3 && (
                  <EntryProductStep3
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {currentStep === 4 && (
                  <EntryProductConfirmation
                    formData={formData}
                    brands={brands}
                    categories={categories}
                    suppliers={suppliers}
                  />
                )}
              </div>
              {/* Stepper Section */}
              <Box className="w-full col-span-3 lg:col-span-1 order-1 lg:order-2">
                <CustomStepper currentStep={currentStep} steps={steps} />
              </Box>

              {/* Navigation Buttons */}
              <Box className=" col-span-3 order-3 flex mt-6 gap-4">
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={currentStep === 1}
                  onClick={(e) => {
                    e.preventDefault(); // Explicitly prevent form submission
                    handleBack();
                  }}
                  fullWidth
                >
                  Back
                </Button>
                {currentStep < steps.length ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault(); // Explicitly prevent form submission
                      handleNext();
                    }}
                    fullWidth
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    fullWidth
                    disabled={!isFormComplete()} // Disable "Create" button if form is incomplete
                  >
                    Create
                  </Button>
                )}
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EntryProduct;
