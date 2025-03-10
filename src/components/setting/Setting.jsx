import { useEffect, useState } from "react";
import useSetting from "../../redux/hooks/setting/useSetting";
import { Box, TextField, Typography } from "@mui/material";
import ModalMedia from "../ui/model/MediaModel";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const { setting, handleUpdateSetting } = useSetting();

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    phone: "",
    address: "",
    marquee: "",
  });

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

  useEffect(() => {
    if (setting) {
      setFormData({
        name: setting.name || "ANDROMEDA 306",
        logo: setting.logo || "/logo/logo.png",
        phone: setting.phone || "",
        address: setting.address || "",
        marquee: setting.marquee || "",
      });
    } else {
      setFormData({
        name: "ANDROMEDA 306",
        logo: "/logo/logo.png",
        phone: "",
        address: "",
        marquee: "",
      });
    }
  }, [setting]);

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

        {/* Phone Field */}
        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          value={formData?.phone}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          sx={{ maxWidth: 500 }}
        />

        {/* Address Field */}
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData?.address}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          sx={{ maxWidth: 500 }}
        />

        {/* Marquee Field */}
        <TextField
          fullWidth
          label="Marquee Text"
          name="marquee"
          value={formData?.marquee}
          onChange={handleInputChange}
          margin="normal"
          multiline
          rows={4}
          variant="outlined"
          sx={{ maxWidth: 1000 }}
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
