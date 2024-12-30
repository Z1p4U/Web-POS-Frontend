import { BiTrash } from "react-icons/bi";
import PropTypes from "prop-types";
import { Backdrop, Box, Modal, Pagination } from "@mui/material";
import { useState } from "react";
import Loader from "../../ui/loader/Loader";
import ConfirmationModal from "../../ui/model/ConfirmationModal";

const MediaList = ({
  photos,
  pagination,
  totalRecord,
  handlePaginate,
  pageCount,
  handleDeletePhoto,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpen = (url) => {
    setSelectedImg(url);
    setOpen(true);
  };

  const handleOpenModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedId(null);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await handleDeletePhoto(selectedId);
      setIsModalOpen(false);
      window.location.reload(); // remove it if needed
    } catch (error) {
      console.error("Error deleting the product:", error);
    }
  };

  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };

  return (
    <>
      {photos?.length == 0 ? (
        <div className=" h-1/2 flex justify-center items-center">
          <h1 className=" text-primary text-lg lg:text-2xl font-bold">
            Please Upload A Photo!
          </h1>
        </div>
      ) : (
        <div className=" mt-10 my-20 ">
          {!photos ? (
            <div className=" my-10 h-1/2">
              <Loader />
            </div>
          ) : (
            <div className=" mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {photos?.map((image) => {
                return (
                  <div
                    key={image?.id}
                    className="img_div w-[120px] md:w-[140px] lg:w-[180px] xl:w-[200px] rounded-md hover:opacity-80 duration-300 cursor-pointer aspect-square mx-auto"
                  >
                    <img
                      onClick={() => handleOpen(image?.url)}
                      src={image?.url}
                      className=" w-full h-full rounded-md object-cover"
                    />
                    <div className="img_icon flex gap-2">
                      <div
                        onClick={() => handleOpenModal(image?.id)}
                        className="h-8 w-10 flex justify-center items-center bg-primary rounded-md group/del-btn"
                      >
                        <BiTrash className=" max-sm:text-[14px] text-[18px] text-white  group-hover/del-btn:text-red-500" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-between flex-wrap gap-5 items-center pr-10 mt-8">
            <div>
              {`Showing ${
                (pagination.page - 1) * pagination.per_page + 1
              } to ${Math.min(
                pagination.page * pagination.per_page,
                totalRecord
              )} of ${totalRecord}`}
            </div>

            <Pagination
              count={pageCount}
              shape="rounded"
              size="large"
              page={pagination.page}
              onChange={handlePaginate}
            />
          </div>

          <ConfirmationModal
            open={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleDelete}
            message="Are you sure you want to delete this product? This action cannot be undone."
          />
        </div>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box sx={style}>
          <img src={selectedImg} alt="" />
        </Box>
      </Modal>
    </>
  );
};

export default MediaList;

MediaList.propTypes = {
  photos: PropTypes.any.isRequired,
  pageCount: PropTypes.any,
  pagination: PropTypes.any,
  totalRecord: PropTypes.any,
  handlePaginate: PropTypes.any,
  handleDeletePhoto: PropTypes.any,
};
