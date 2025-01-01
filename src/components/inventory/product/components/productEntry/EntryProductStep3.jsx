import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import ModalMedia from "../../../../ui/model/MediaModel";

const EntryProductStep3 = ({ formData, setFormData }) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const handleImageSelect = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      photo: imageUrl,
    }));
    setImageModalOpen(false);
  };

  return (
    <Box className="flex gap-10 h-full">
      {/* Form Fields */}
      <Box className="w-full lg:w-5/6">
        <Box className="border border-gray-400 p-10 flex flex-col gap-6 w-full rounded-md">
          {/* Image */}
          <Box
            sx={{
              height: 300,
              width: "100%",
              bgcolor: formData.photo ? "transparent" : "grey.200",
              border: "1px dashed grey",
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => setImageModalOpen(true)}
          >
            {formData.photo ? (
              <img
                src={formData.photo}
                alt="Selected"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <Typography color="text.secondary">
                Click to select image
              </Typography>
            )}
          </Box>
          {/* Image Modal */}
          <ModalMedia
            opened={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
            handleImageSelect={handleImageSelect}
          />
        </Box>
      </Box>
    </Box>
  );
};

EntryProductStep3.propTypes = {
  formData: PropTypes.any,
  setFormData: PropTypes.any,
};

export default EntryProductStep3;
