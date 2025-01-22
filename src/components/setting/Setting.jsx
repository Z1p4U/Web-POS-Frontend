import { useState } from "react";
import useSetting from "../../redux/hooks/setting/useSetting";
import { Box, TextField, Typography } from "@mui/material";
import ModalMedia from "../ui/model/MediaModel";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const { setting, handleUpdateSetting } = useSetting();
  const [formData, setFormData] = useState({
    name: setting?.name || "ANDROMEDA 306",
    logo: setting?.logo || "/logo/logo.png",
  });
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const nav = useNavigate();

  const handleUpdate = () => {
    handleUpdateSetting(formData);

    nav("/");
  };

  const handleImageSelect = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      logo: imageUrl,
    }));
    setImageModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">Site Settings</h3>

      <hr />

      <div className=" py-10 w-full max-w-[1000px] flex flex-col gap-5 ">
        {/* Logo Preview */}
        <Box
          sx={{
            height: 200,
            width: 200,
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
          {formData.logo ? (
            <img
              src={formData?.logo}
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

        {/* Name Field */}
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData?.name}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          sx={{ maxWidth: 500 }}
        />

        {/* Update Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleUpdate}
        >
          Update
        </button>

        {/* Image Modal */}
        <ModalMedia
          opened={imageModalOpen}
          onClose={() => setImageModalOpen(false)}
          handleImageSelect={handleImageSelect}
        />
      </div>
    </div>
  );
};

export default Setting;
