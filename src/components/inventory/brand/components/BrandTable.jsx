import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import Loader from "../../../ui/loader/Loader";
import PropTypes from "prop-types";
import { BiEdit, BiTrash } from "react-icons/bi";
import ConfirmationModal from "../../../ui/model/ConfirmationModal";
import { useState } from "react";

const BrandTable = ({
  brands,
  pagination,
  pageCount,
  handleEdit,
  totalRecord,
  handlePaginate,
  handleDeleteBrand,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
      await handleDeleteBrand(selectedId);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting the brand:", error);
    }
  };

  return (
    <>
      {!brands ? (
        <div>
          <Loader />
        </div>
      ) : (
        <TableContainer component={Paper} className="overflow-x-auto">
          <Table sx={{ minWidth: 650 }} aria-label="brand table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#002d5d", color: "#fff" }}>
                <TableCell
                  align="left"
                  sx={{ padding: "16px", color: "white" }}
                >
                  NO
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ padding: "16px", color: "white" }}
                >
                  PHOTO
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ padding: "16px", color: "white" }}
                >
                  NAME
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ padding: "16px", color: "white" }}
                >
                  COMPANY
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ padding: "16px", color: "white", maxWidth: 500 }}
                >
                  NOTE
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ padding: "16px", color: "white" }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brands?.map((brand, index) => {
                return (
                  <TableRow
                    key={brand?.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#38577e" : "#38577e", // alternate row colors (bg-secondary & bg-primary)
                      "&:hover": {
                        opacity: 0.9,
                      },
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell align="left" sx={{ padding: "16px" }}>
                      <img
                        src={brand?.photo}
                        className="object-contain aspect-square w-40"
                        alt=""
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {brand?.name}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {brand?.company}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {brand?.note}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: "16px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          gap: 1,
                        }}
                      >
                        <div
                          onClick={() => handleEdit(brand)}
                          className="px-3 py-2 rounded-lg bg-primary text-center cursor-pointer hover:opacity-80 text-white hover:text-light transition-all duration-200"
                        >
                          <BiEdit className=" text-lg" />
                        </div>
                        <div
                          onClick={() => handleOpenModal(brand?.id)}
                          className="px-3 py-2 rounded-lg bg-primary text-center cursor-pointer hover:opacity-80 text-white hover:text-red-500 transition-all duration-200"
                        >
                          <BiTrash className=" text-lg" />
                        </div>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
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
        message="Are you sure you want to delete this brand? This action cannot be undone."
      />
    </>
  );
};

BrandTable.propTypes = {
  brands: PropTypes.any.isRequired,
  totalRecord: PropTypes.any,
  pagination: PropTypes.any,
  pageCount: PropTypes.any,
  handleEdit: PropTypes.any,
  handlePaginate: PropTypes.any,
  handleDeleteBrand: PropTypes.any,
  handleUpdateBrand: PropTypes.any,
};

export default BrandTable;
