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
  Modal,
} from "@mui/material";
import Loader from "../../ui/loader/Loader";
import PropTypes from "prop-types";
import { BiEdit, BiInfoCircle } from "react-icons/bi";
import { useState } from "react";

const UserList = ({
  users,
  pageCount,
  handleEdit,
  pagination,
  totalRecord,
  handlePaginate,
}) => {
  const [selectedUser, setSelectedUser] = useState({});
  const [open, setOpen] = useState(false);

  const handleOpen = (record) => {
    setSelectedUser(record);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "800px",
    bgcolor: "background.paper",
    border: "0px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      {!users ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <TableContainer component={Paper} className="overflow-x-auto">
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#002d5d", color: "#fff" }}>
                  <TableCell
                    align="center"
                    sx={{ padding: "16px", color: "white" }}
                  >
                    NO
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ padding: "16px", color: "white" }}
                  >
                    NAME
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ padding: "16px", color: "white" }}
                  >
                    EMAIL
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ padding: "16px", color: "white" }}
                  >
                    PHONE
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ padding: "16px", color: "white" }}
                  >
                    ROLE
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ padding: "16px", color: "white" }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user, index) => {
                  const rowNumber =
                    (pagination.page - 1) * pagination.per_page + index + 1;
                  return (
                    <TableRow
                      key={user?.id}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#38577e" : "#38577e", // alternate row colors (bg-secondary & bg-primary)
                        "&:hover": {
                          opacity: 0.9,
                        },
                      }}
                    >
                      <TableCell
                        align="center"
                        sx={{ color: "#fff", padding: "16px" }}
                      >
                        {rowNumber}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ color: "#fff", padding: "16px" }}
                      >
                        {user?.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ color: "#fff", padding: "16px" }}
                      >
                        {user?.email}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ color: "#fff", padding: "16px" }}
                      >
                        {user?.phone}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ color: "#fff", padding: "16px" }}
                      >
                        <div className=" px-3 py-1 bg-primary text-white rounded-full text-xs w-fit mx-auto">
                          {user?.role}
                        </div>
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
                            onClick={() => handleEdit(user)}
                            className="px-3 py-2 rounded-lg bg-primary text-center cursor-pointer hover:opacity-80 text-white hover:text-light transition-all duration-200"
                          >
                            <BiEdit className=" text-lg" />
                          </div>
                          <div
                            onClick={() => handleOpen(user)}
                            className="px-3 py-2 rounded-lg bg-primary text-center cursor-pointer hover:opacity-80 text-white hover:text-light transition-all duration-200"
                          >
                            <BiInfoCircle className=" text-lg" />
                          </div>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Modal
            aria-labelledby="user-details-title"
            aria-describedby="user-details-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
          >
            <Box sx={modalStyle}>
              {selectedUser && (
                <>
                  {/* Header Section */}
                  <Box textAlign="center" mb={3}>
                    <h2
                      id="user-details-title"
                      style={{
                        margin: 0,
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      User Details
                    </h2>
                  </Box>

                  {/* Information Section */}
                  <Box
                    sx={{
                      padding: 2,
                      borderRadius: 2,
                      backgroundColor: "#f9f9f9",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* Name Field */}
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <span style={{ fontWeight: "bold", color: "#555" }}>
                        Name:
                      </span>
                      <span style={{ color: "#000" }}>
                        {selectedUser.name || "N/A"}
                      </span>
                    </Box>

                    {/* Email Field */}
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <span style={{ fontWeight: "bold", color: "#555" }}>
                        Email:
                      </span>
                      <span style={{ color: "#000" }}>
                        {selectedUser.email || "N/A"}
                      </span>
                    </Box>

                    {/* Phone Number Field */}
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <span style={{ fontWeight: "bold", color: "#555" }}>
                        Phone Number:
                      </span>
                      <span style={{ color: "#000" }}>
                        {selectedUser.phone || "N/A"}
                      </span>
                    </Box>

                    {/* Role Field */}
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <span style={{ fontWeight: "bold", color: "#555" }}>
                        Role:
                      </span>
                      <span style={{ color: "#000" }}>
                        {selectedUser.role || "N/A"}
                      </span>
                    </Box>

                    {/* Created Date Field */}
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <span style={{ fontWeight: "bold", color: "#555" }}>
                        Created Date:
                      </span>
                      <span style={{ color: "#000" }}>
                        {selectedUser.created_at || "N/A"}
                      </span>
                    </Box>

                    {/* Created Time Field */}
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <span style={{ fontWeight: "bold", color: "#555" }}>
                        Created Time:
                      </span>
                      <span style={{ color: "#000" }}>
                        {selectedUser.created_time || "N/A"}
                      </span>
                    </Box>

                    {/* Additional Notes Field */}
                    {selectedUser.note && (
                      <Box display="flex" justifyContent="space-between" mt={2}>
                        <span style={{ fontWeight: "bold", color: "#555" }}>
                          Note:
                        </span>
                        <span style={{ color: "#000", maxWidth: "70%" }}>
                          {selectedUser.note}
                        </span>
                      </Box>
                    )}
                  </Box>
                </>
              )}
            </Box>
          </Modal>
        </>
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
    </>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  pageCount: PropTypes.number.isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    per_page: PropTypes.number.isRequired,
  }).isRequired,
  totalRecord: PropTypes.number.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handlePaginate: PropTypes.func.isRequired,
  refetchUsers: PropTypes.func,
};

export default UserList;
