import { Stepper, Step, StepLabel, Box, styled } from "@mui/material";
import PropTypes from "prop-types";

// Custom styles for the Stepper and Steps
const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepIcon-root": {
    width: 48, // Bigger circle size
    height: 48, // Bigger circle size
    borderRadius: "50%",
    color: theme.palette.grey[400],
  },
  "& .MuiStepIcon-text": {
    fontSize: "1.2rem", // Larger text inside the circle
    fontWeight: "bold",
  },
  "&.Mui-active .MuiStepIcon-root": {
    color: theme.palette.primary.main, // Active step color
    border: `3px solid ${theme.palette.primary.main}`, // Add a border for the active step
  },
  "&.Mui-completed .MuiStepIcon-root": {
    color: theme.palette.success.main, // Completed step color
  },
  "& .MuiStepLabel-label": {
    marginTop: theme.spacing(1), // Add spacing between the circle and label
    fontSize: "1rem", // Label font size
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
}));

const CustomStepper = ({ currentStep, steps }) => {
  return (
    <Box className="w-full flex flex-col items-start">
      <Stepper
        activeStep={currentStep - 1}
        orientation="vertical"
        className="w-full"
        sx={{ gap: 3 }} // Add more gap between steps
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <CustomStepLabel>{label}</CustomStepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

CustomStepper.propTypes = {
  steps: PropTypes.any,
  currentStep: PropTypes.any,
};

export default CustomStepper;
