import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import useSetting from "../../../../redux/hooks/setting/useSetting";

const VoucherTable = ({ printVoucher, vouchers }) => {
  const { setting } = useSetting();

  const [open, setOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const handleOpen = (voucher) => {
    setSelectedVoucher(voucher);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVoucher(null);
  };

  const handlePrintVoucher = async (id) => {
    const response = await printVoucher(id);

    window.alert(response);
    handleClose();
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

  if (!vouchers) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <TableContainer component={Paper} className="overflow-x-auto">
        <Table sx={{ minWidth: 650 }} aria-label="voucher table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#002d5d" }}>
              {[
                "NO",
                "VOUCHER",
                "ITEM COUNT",
                "TAX",
                "TOTAL",
                "DATE",
                "TIME",
                "",
              ].map((header, index) => (
                <TableCell
                  key={index}
                  align={index === 7 ? "center" : "right"}
                  sx={{
                    padding: "16px",
                    color: "white",
                    textWrap: "nowrap",
                    textAlign:
                      index === 7 ? "center" : index < 2 ? "left" : "right",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {vouchers?.map((rVoucher, index) => (
              <TableRow
                key={rVoucher?.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#38577e" : "#456a90",
                  "&:hover": { opacity: 0.9 },
                  borderBottom: "1px solid #ddd",
                }}
              >
                <TableCell
                  align="left"
                  sx={{ color: "white", padding: "16px", textWrap: "nowrap" }}
                >
                  {rVoucher?.id}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", padding: "16px", textWrap: "nowrap" }}
                >
                  {rVoucher?.voucher_number}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", padding: "16px", textWrap: "nowrap" }}
                >
                  {rVoucher?.product_count}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", padding: "16px", textWrap: "nowrap" }}
                >
                  {rVoucher?.tax}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", padding: "16px", textWrap: "nowrap" }}
                >
                  {rVoucher?.net_total?.toLocaleString()}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", padding: "16px", textWrap: "nowrap" }}
                >
                  {rVoucher?.created_at}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", padding: "16px", textWrap: "nowrap" }}
                >
                  {rVoucher?.created_time}
                </TableCell>
                <TableCell align="center" sx={{ padding: "16px" }}>
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
                      textWrap: "nowrap",
                    }}
                    onClick={() => handleOpen(rVoucher)}
                  >
                    View Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        aria-labelledby="voucher-details-title"
        aria-describedby="voucher-details-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Box sx={modalStyle}>
          {selectedVoucher && (
            <>
              <Box textAlign="center" mb={2}>
                <h2 id="voucher-details-title">
                  {setting?.name ? setting?.name : "ANDROMEDA 306"}
                </h2>
                <p>
                  Voucher No:{" "}
                  <strong style={{ color: "#002d5d" }}>
                    {selectedVoucher.voucher_number}
                  </strong>
                </p>
                <p>
                  Address:{" "}
                  {setting?.address ? (
                    <strong style={{ color: "#002d5d" }}>
                      {setting?.address}
                    </strong>
                  ) : (
                    <></>
                  )}
                </p>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Box>
                  <p>Cashier: {selectedVoucher.user_name || "N/A"}</p>
                  <p>Phone: {setting.phone || "N/A"}</p>
                </Box>
                <Box textAlign="right">
                  <p className=" text-nowrap">
                    Date: {selectedVoucher.created_at}
                  </p>
                  <p className=" text-nowrap">
                    Time: {selectedVoucher.created_time}
                  </p>
                </Box>
              </Box>

              <Table
                size="small"
                sx={{
                  marginBottom: 2,
                  borderTop: "2px solid black",
                  borderBottom: "2px solid black",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="center">Qty</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedVoucher.records?.map((record) => (
                    <TableRow key={record?.id}>
                      <TableCell>{record?.product_name}</TableCell>
                      <TableCell align="center">{record?.quantity}</TableCell>
                      <TableCell align="right">
                        {record?.sale_price?.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        {record?.cost?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Box
                display="flex"
                flexDirection={"column"}
                alignItems={"end"}
                justifyContent="space-between"
                mb={2}
              >
                <p>Subtotal: {selectedVoucher.total?.toLocaleString()} Ks</p>
                <p>Tax: {selectedVoucher.tax} Ks</p>
                <p>
                  <strong>
                    Total: {selectedVoucher.net_total?.toLocaleString()} Ks
                  </strong>
                </p>
              </Box>

              <Box textAlign="center" mt={4}>
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
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                  onClick={() => handlePrintVoucher(selectedVoucher.id)}
                >
                  Export Voucher
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

VoucherTable.propTypes = {
  printVoucher: PropTypes.func.isRequired,
  vouchers: PropTypes.array.isRequired,
};

export default VoucherTable;
