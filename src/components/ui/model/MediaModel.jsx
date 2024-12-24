import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  setSelectActive,
  setOnclickActive,
  setPdSelectImg,
  setInsert,
  setUserSelectImg,
  setAdminSelectImg,
  setPdEditSelectImg,
  setBrandSelectImg,
  setBrandEditSelectImg,
} from "../../Redux/Services/mediaSlice";
import { useLocation, useParams } from "react-router-dom";

const ModalMedia = ({ opened, onClose, sidebarOpen, editSidebarOpen }) => {
  const dispatch = useDispatch();
  const selectActive = useSelector((state) => state.mediaSlice.selectActive);
  const onclickActive = useSelector((state) => state.mediaSlice.onclickActive);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const mediaData = []; // Replace with actual media data
  const location = useLocation();
  const path = location.pathname;
  const { id } = useParams();

  const handleSubmit = async (files) => {
    const photos = new FormData();
    files.forEach((file) => photos.append("photos[]", file, file.name));
    // Simulating API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        title: "Successfully uploaded photo",
        icon: "success",
        confirmButtonText: "OK",
      });
    }, 2000);
  };

  const selectImgHandler = (id, url) => {
    setSelectedImage(selectedImage === url ? null : url);
    dispatch(setOnclickActive(id));
  };

  const insertImageHandler = () => {
    if (path === "/inventory/addProduct") {
      dispatch(setPdSelectImg(selectedImage));
    } else if (path === "/user/create") {
      dispatch(setUserSelectImg(selectedImage));
    } else if (path === "/profile/edit") {
      dispatch(setAdminSelectImg(selectedImage));
    } else if (path === `/inventory/product/editProduct/${id}`) {
      dispatch(setPdEditSelectImg(selectedImage));
    } else if (sidebarOpen) {
      dispatch(setBrandSelectImg(selectedImage));
    } else if (editSidebarOpen) {
      dispatch(setBrandEditSelectImg(selectedImage));
    }
    dispatch(setInsert(true));
  };

  useEffect(() => {
    if (opened) {
      dispatch(setOnclickActive(null));
    }
  }, [opened, dispatch]);

  return (
    <Modal open={opened} onClose={onClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "65%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" mb={2}>
          Select an Image
        </Typography>
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <Grid container spacing={2} mb={3}>
              {/* Upload Button */}
              <Grid item xs={6} sm={4} md={3}>
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
                  onClick={() => document.querySelector("#file-upload").click()}
                >
                  <IconButton>
                    <MdOutlineCloudUpload size={40} color="#8AB4F8" />
                  </IconButton>
                  <Typography color="text.secondary">Upload Image</Typography>
                  <TextField
                    id="file-upload"
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    sx={{ display: "none" }}
                    onChange={(e) => handleSubmit([...e.target.files])}
                  />
                </Box>
              </Grid>

              {/* Display Media */}
              {mediaData?.map((img) => (
                <Grid item xs={6} sm={4} md={3} key={img?.id}>
                  <Box
                    sx={{
                      border:
                        selectActive === img?.id
                          ? "2px solid blue"
                          : "1px solid #ddd",
                      borderRadius: 2,
                      overflow: "hidden",
                      cursor: "pointer",
                      position: "relative",
                      "&:hover": { borderColor: "blue" },
                    }}
                    onClick={() => selectImgHandler(img?.id, img?.url)}
                    onMouseEnter={() => dispatch(setSelectActive(img?.id))}
                  >
                    <img
                      src={img?.url}
                      alt=""
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>

            {onclickActive && (
              <Button
                variant="contained"
                color="primary"
                onClick={insertImageHandler}
                fullWidth
              >
                INSERT
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default ModalMedia;
