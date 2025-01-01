import {
  Stepper,
  Step,
  StepLabel,
  Box,
  styled,
  useMediaQuery,
  StepConnector,
} from "@mui/material";
import PropTypes from "prop-types";

// Custom styles for the Stepper and Steps
const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepIcon-root": {
    width: 48,
    height: 48,
    color: theme.palette.grey[400], // Inactive step color
  },
  "& .MuiStepIcon-text": {
    fontSize: "16px", // Text inside the circle
    fontWeight: "bold",
  },
  "&.Mui-active .MuiStepIcon-root": {
    color: theme.palette.primary.main, // Active step circle color
  },
  "&.Mui-completed .MuiStepIcon-root": {
    color: theme.palette.success.main, // Completed step circle color
  },
  "& .MuiStepLabel-label": {
    // marginTop: theme.spacing(1), // Add spacing between the circle and label
    width: "fit-content",
    fontSize: "14px",
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
}));

// Custom connector with longer lines
const CustomConnectorVertical = styled(StepConnector)(({ theme }) => ({
  [`& .MuiStepConnector-line`]: {
    borderColor: theme.palette.grey[400], // Line color
    minHeight: 60, // Line length for vertical stepper
    marginLeft: 12,
  },
}));

const CustomConnectorHorizontal = styled(StepConnector)(({ theme }) => ({
  [`& .MuiStepConnector-line`]: {
    borderColor: theme.palette.grey[400],
    minWidth: 80, // Line length for horizontal stepper
  },
}));

const CustomStepper = ({ currentStep, steps }) => {
  const isMobile = useMediaQuery("(min-width:1024px)"); // Check if screen size is below 'lg'

  return (
    <Box className="w-full">
      {/* Vertical Stepper for larger screens */}
      <Box className={`w-full mt-10 ${isMobile ? "block" : "hidden"}`}>
        <Stepper
          activeStep={currentStep - 1}
          orientation="vertical"
          connector={<CustomConnectorVertical />}
          className="w-full"
          sx={{ gap: 1 }} // Increase gap between steps to lengthen connectors
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <CustomStepLabel>{label}</CustomStepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Horizontal Stepper for mobile screens */}
      <Box className={`w-full ${isMobile ? "hidden" : "block"}`}>
        <Stepper
          activeStep={currentStep - 1}
          orientation="horizontal"
          connector={<CustomConnectorHorizontal />}
          className=""
          sx={{
            "& .MuiStep-root": {
              flex: "1",
            },
            gap: 2,
          }}
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <CustomStepLabel className=" flex flex-col items-center">
                {label}
              </CustomStepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
};

CustomStepper.propTypes = {
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default CustomStepper;
