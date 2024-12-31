import { useState } from "react";
import Banner from "../../../ui/banner/Banner";
import EntryProductStep1 from "./productEntry/EntryProductStep1";
import { Button, Box } from "@mui/material";
import CustomStepper from "./productEntry/CustomStepper";

const EntryProduct = () => {
  const steps = ["Information", "Price", "Photo"];
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
    // Proceed with form submission logic
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
                  />
                )}
                {/* Add other step components (like Step 2, Step 3) here if necessary */}
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
                  onClick={handleBack}
                  fullWidth
                >
                  Back
                </Button>
                {currentStep < steps.length ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
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
