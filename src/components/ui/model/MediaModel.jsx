import { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  Grid2,
  Pagination,
} from "@mui/material";
import { MdOutlineCloudUpload } from "react-icons/md";
import useMedia from "../../../redux/hooks/media/useMedia";
import Loader from "../loader/Loader";
import PropTypes from "prop-types";

const ModalMedia = ({ opened, onClose, handleImageSelect }) => {
  const {
    photos,
    handleCreatePhoto,
    pagination,
    setPagination,
    handlePaginate,
    pageCount,
  } = useMedia();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async (files) => {
    if (!files || files.length === 0) {
      console.error("No files to upload.");
      return;
    }

    const photos = new FormData();
    for (let i = 0; i < files.length; i++) {
      photos.append("photos[]", files[i], files[i].name);
    }

    try {
      const response = await handleCreatePhoto(photos);
      console.log("Server Response:", response);
    } catch (error) {
      console.error("Error uploading photos:", error);
    }
  };

  useEffect(() => {
    if (opened) {
      setPagination({ page: 1, per_page: 10 });
      setSelectedImage(null);
    }
  }, [opened, setPagination]);

  return (
    <Modal open={opened} onClose={onClose} aria-labelledby="media-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          border: "0px",
          outline: "0px",
        }}
      >
        <Typography id="media-modal-title" variant="h6" mb={3}>
          Select or Upload an Image
        </Typography>

        {!photos ? (
          <Loader />
        ) : (
          <Box>
            <Grid2 container spacing={2} mb={3}>
              {/* Upload Button */}
              <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
                <Box
                  sx={{
                    border: "1px dashed #7E7F80",
                    borderRadius: 2,
                    height: 120,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => document.querySelector("#input-field").click()}
                >
                  <IconButton>
                    <MdOutlineCloudUpload size={40} color="#8AB4F8" />
                  </IconButton>
                  <Typography color="text.secondary">Upload Image</Typography>
                  <input
                    multiple
                    type="file"
                    accept="image/jpg,image/jpeg,image/png"
                    className="input-field"
                    id="input-field"
                    hidden
                    onChange={(e) => handleSubmit([...e.target.files])}
                  />
                </Box>
              </Grid2>

              {/* Display Uploaded Media */}
              {photos?.map((photo) => (
                <Grid2 size={{ xs: 6, sm: 4, md: 3 }} key={photo?.id}>
                  <Box
                    sx={{
                      border:
                        selectedImage === photo?.url
                          ? "2px solid blue"
                          : "1px solid #ddd",
                      borderRadius: 2,
                      overflow: "hidden",
                      cursor: "pointer",
                      position: "relative",
                      "&:hover": { borderColor: "blue" },
                    }}
                    onClick={() => setSelectedImage(photo?.url)}
                  >
                    <img
                      src={photo?.url}
                      alt=""
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Grid2>
              ))}
            </Grid2>

            <Box display="flex" gap={2} mt={4} justifyContent={"center"}>
              <Pagination
                count={pageCount}
                shape="rounded"
                size="large"
                page={pagination.first}
                onChange={handlePaginate}
              />
            </Box>

            {/* Action Buttons */}
            <Box display="flex" gap={2} mt={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleImageSelect(selectedImage)}
                disabled={!selectedImage}
                fullWidth
              >
                INSERT
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

ModalMedia.propTypes = {
  opened: PropTypes.any,
  onClose: PropTypes.any,
  handleImageSelect: PropTypes.any,
};

export default ModalMedia;
