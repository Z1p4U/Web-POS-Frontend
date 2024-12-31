import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Modal,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import SouthIcon from "@mui/icons-material/South";

const ProductDetailStockMovement = ({ stockRecord }) => {
  const [visibleRecords, setVisibleRecords] = useState(5); // Number of records to show
  const [selectedRecord, setSelectedRecord] = useState({});
  const [open, setOpen] = useState(false);

  const handleOpen = (record) => {
    setSelectedRecord(record);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRecord(null);
  };

  const handleViewMore = () => {
    setVisibleRecords((prev) => prev + 5);
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

  const hasMoreRecords = visibleRecords < stockRecord.length;

  return (
    <>
      <h1 className=" font-semibold text-white tracking-wider px-5 py-3 w-full rounded-t-md bg-primary border-b">
        Stock Movement Record
      </h1>
      <Box>
        <TableContainer
          component={Paper}
          className="overflow-x-auto"
          sx={{
            maxHeight: 400,
            overflowY: "auto",
            borderRadius: "0 0 0 0", // Rounded corners only for the top
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="stock movement table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#002d5d", color: "#fff" }}>
                <TableCell
                  align="center"
                  sx={{ padding: "16px", color: "white", fontWeight: "bold" }}
                >
                  Created At
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    padding: "16px",
                    color: "white",
                    textWrap: "nowrap",
                    fontWeight: "bold",
                  }}
                >
                  Added By
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    padding: "16px",
                    color: "white",
                    fontWeight: "bold",
                    textWrap: "nowrap",
                  }}
                >
                  Added Quantity
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    padding: "16px",
                    color: "white",
                    textWrap: "nowrap",
                    fontWeight: "bold",
                  }}
                >
                  Type
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    padding: "16px",
                    color: "white",
                    textWrap: "nowrap",
                    fontWeight: "bold",
                  }}
                >
                  Created Time
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    padding: "16px",
                    color: "white",
                    textWrap: "nowrap",
                    fontWeight: "bold",
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockRecord.length != 0 ? (
                stockRecord.slice(0, visibleRecords).map((record, index) => (
                  <TableRow
                    key={record?.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#38577e" : "#2e4963", // Alternating row colors
                      "&:last-child td": {
                        borderBottom: "none",
                      },
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {record?.created_at}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {record?.user_name}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {record?.quantity}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {record?.movement_type}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {record?.created_time}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#002d5d",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#001a3d",
                          },
                          padding: "8px 16px",
                          borderRadius: "8px",
                          textTransform: "none", // Keeps the text case as provided
                          fontWeight: "bold",
                        }}
                        onClick={() => handleOpen(record)}
                      >
                        View Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow
                  sx={{
                    backgroundColor: "#002d5d", // Alternating row colors
                    borderRadius: " 0 0 8px 8px",
                    borderBottom: "none",
                  }}
                >
                  <TableCell
                    align="center"
                    colSpan={6}
                    sx={{
                      color: "#fff",
                      padding: "16px",
                      fontWeight: "600",
                      borderBottom: "none",
                      borderRadius: " 0 0 8px 8px",
                    }}
                  >
                    No Stock History Yet!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {hasMoreRecords && (
          <Box
            sx={{
              textAlign: "center",
              backgroundColor: "#002d5d",
              borderRadius: " 0 0 8px 8px", // Rounded corners only for the top
            }}
          >
            <Button
              variant="contained"
              onClick={handleViewMore}
              sx={{
                backgroundColor: "#002d5d",
                color: "#fff",
                width: "100%",
              }}
              endIcon={<SouthIcon />}
            >
              View More
            </Button>
          </Box>
        )}
      </Box>
      <Modal
        aria-labelledby="voucher-details-title"
        aria-describedby="voucher-details-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        // BackdropComponent={Backdrop}
        // BackdropProps={{ timeout: 500 }}
      >
        <Box sx={modalStyle}>
          {selectedRecord && (
            <>
              {/* Header Section */}
              <Box textAlign="center" mb={3}>
                <h2
                  id="voucher-details-title"
                  style={{
                    margin: 0,
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Deep Blue POS
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
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <span style={{ fontWeight: "bold", color: "#555" }}>By:</span>
                  <span style={{ color: "#000" }}>
                    {selectedRecord.user_name || "N/A"}
                  </span>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <span style={{ fontWeight: "bold", color: "#555" }}>
                    Type:
                  </span>
                  <span style={{ color: "#000" }}>
                    {selectedRecord.movement_type || "N/A"}
                  </span>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <span style={{ fontWeight: "bold", color: "#555" }}>
                    Created Date:
                  </span>
                  <span style={{ color: "#000" }}>
                    {selectedRecord.created_at}
                  </span>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <span style={{ fontWeight: "bold", color: "#555" }}>
                    Created Time:
                  </span>
                  <span style={{ color: "#000" }}>
                    {selectedRecord.created_time}
                  </span>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <span style={{ fontWeight: "bold", color: "#555" }}>
                    Amount:
                  </span>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "#007BFF",
                    }}
                  >
                    {selectedRecord.quantity}
                  </span>
                </Box>

                {selectedRecord.note && (
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <span style={{ fontWeight: "bold", color: "#555" }}>
                      Note:
                    </span>
                    <span style={{ color: "#000", maxWidth: "70%" }}>
                      {selectedRecord.note}
                    </span>
                  </Box>
                )}
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

ProductDetailStockMovement.propTypes = {
  stockRecord: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user_name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductDetailStockMovement;
