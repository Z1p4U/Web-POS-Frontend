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

const SupplierTable = ({
  suppliers,
  pagination,
  totalRecord,
  pageCount,
  handleEdit,
  handlePaginate,
  handleDeleteSupplier,
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
      await handleDeleteSupplier(selectedId);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting the supplier:", error);
    }
  };

  return (
    <>
      {!suppliers ? (
        <div>
          <Loader />
        </div>
      ) : (
        <TableContainer component={Paper} className="overflow-x-auto">
          <Table sx={{ minWidth: 650 }} aria-label="supplier table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#002d5d", color: "#fff" }}>
                <TableCell
                  align="left"
                  sx={{ padding: "16px", color: "white", fontSize: "14px" }}
                >
                  NO
                </TableCell>

                <TableCell
                  align="left"
                  sx={{ padding: "16px", color: "white", fontSize: "14px" }}
                >
                  NAME
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    padding: "16px",
                    color: "white",
                    fontSize: "14px",
                    maxWidth: 500,
                  }}
                >
                  COMPANY NAME
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    padding: "16px",
                    color: "white",
                    fontSize: "14px",
                    maxWidth: 500,
                  }}
                >
                  PHONE
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    padding: "16px",
                    color: "white",
                    fontSize: "14px",
                    maxWidth: 500,
                  }}
                >
                  SECONDARY PH
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    padding: "16px",
                    color: "white",
                    fontSize: "14px",
                    maxWidth: 500,
                  }}
                >
                  EMAIL
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    padding: "16px",
                    color: "white",
                    fontSize: "14px",
                    maxWidth: 500,
                  }}
                >
                  ADDRESS
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ padding: "16px", color: "white", fontSize: "14px" }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers?.map((supplier, index) => {
                const rowNumber =
                  (pagination.page - 1) * pagination.per_page + index + 1;
                return (
                  <TableRow
                    key={supplier?.id}
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
                      {rowNumber}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {supplier?.name}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {supplier?.company_name}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {supplier?.phone_number}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {supplier?.secondary_phone_number}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {supplier?.email}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {supplier?.address}
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
                          onClick={() => handleEdit(supplier)}
                          className="px-3 py-2 rounded-lg bg-primary text-center cursor-pointer hover:opacity-80 text-white hover:text-light transition-all duration-200"
                        >
                          <BiEdit className=" text-lg" />
                        </div>
                        <div
                          onClick={() => handleOpenModal(supplier?.id)}
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
        message="Are you sure you want to delete this supplier? This action cannot be undone."
      />
    </>
  );
};

SupplierTable.propTypes = {
  suppliers: PropTypes.any.isRequired,
  totalRecord: PropTypes.any,
  pagination: PropTypes.any,
  pageCount: PropTypes.any,
  handleEdit: PropTypes.any,
  handlePaginate: PropTypes.any,
  handleDeleteSupplier: PropTypes.any,
  handleUpdateSupplier: PropTypes.any,
};

export default SupplierTable;
