import { useState } from "react";
import Loader from "../../../ui/loader/Loader";
import PropTypes from "prop-types";
import { Backdrop, Box, Modal } from "@mui/material";

const VoucherTable = ({ exportVoucher, vouchers }) => {
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
  const style = {
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

  console.log(vouchers);

  return (
    <div>
      {!vouchers ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="overflow-x-scroll">
          <table className="text-white max-[760px]:whitespace-nowrap max-[760px]:block max-[760px]:overflow-x-auto w-full">
            <thead className="tracking-wider text-sm border border-dim">
              <tr className="bg-primary">
                <th className="p-4 text-start">NO</th>
                <th className="p-4 text-start">VOUCHER</th>
                <th className="p-4 text-end">ITEM COUNT</th>
                <th className="p-4 text-end">TAX</th>
                <th className="p-4 text-end">TOTAL</th>
                <th className="p-4 text-end">DATE</th>
                <th className="p-4 text-end">TIME</th>
                <th className="p-4 text-end"></th>
              </tr>
            </thead>
            <tbody className="tracking-wide text-sm">
              {vouchers?.map((rVoucher) => (
                <tr
                  key={rVoucher?.id}
                  className="bg-secondary hover:opacity-90 duration-300 border border-dim"
                >
                  <td className="p-4 text-start">{rVoucher?.id}</td>
                  <td className="p-4 text-start">{rVoucher?.voucher_number}</td>
                  <td className="p-4 text-center">{rVoucher?.product_count}</td>
                  <td className="p-4 text-end">{rVoucher?.tax}</td>
                  <td className="p-4 text-end">{rVoucher?.net_total}</td>
                  <td className="p-4 text-end">{rVoucher?.created_at}</td>
                  <td className="p-4 text-end">{rVoucher?.created_time}</td>
                  <td className="p-4 text-center">
                    <div
                      onClick={() => handleOpen(rVoucher)}
                      className="px-3 py-2 rounded-lg bg-primary cursor-pointer"
                    >
                      View Detail
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        aria-labelledby="voucher-details-title"
        aria-describedby="voucher-details-description"
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
          {selectedVoucher && (
            <>
              <div className="text-center mb-4">
                <h2 id="voucher-details-title" className="text-lg font-bold ">
                  Deep Blue POS
                </h2>
                <p className=" my-3">
                  Voucher No:{" "}
                  <span className=" font-bold text-primary">
                    {selectedVoucher.voucher_number}
                  </span>
                </p>
                <hr className="my-2 border-gray-500" />
              </div>
              <div className="flex justify-between mb-4">
                <div>
                  <p>Cashier: {selectedVoucher.user_name || "N/A"}</p>
                  <p>Phone: {selectedVoucher.user_phone || "N/A"}</p>
                </div>
                <div className="text-right">
                  <p>Date: {selectedVoucher.created_at}</p>
                  <p>Time: {selectedVoucher.created_time}</p>
                </div>
              </div>

              <hr className="my-2 border-gray-500" />

              <table className="w-full text-sm">
                <thead className="mb-5">
                  <tr>
                    <th className=" p-2 font-bold text-primary text-left max-w-[500px]">
                      Item
                    </th>
                    <th className=" p-2 font-bold text-primary text-center">
                      Qty
                    </th>
                    <th className=" p-2 font-bold text-primary text-right">
                      Price
                    </th>
                    <th className=" p-2 font-bold text-primary text-right">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {selectedVoucher.records?.map((record) => (
                    <tr
                      key={record?.id}
                      className="border-b border-gray-200 last:border-0"
                    >
                      <td
                        className="text-left p-2 max-w-[500px] truncate"
                        title={record?.product_name}
                      >
                        {record?.product_name}
                      </td>
                      <td className="text-center p-2">{record.quantity}</td>
                      <td className="text-right p-2">{record.sale_price}</td>
                      <td className="text-right p-2">{record.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr className="my-2 border-gray-500" />

              <div className=" flex flex-col gap-3">
                <div className=" flex items-center justify-between ">
                  <span>Subtotal:</span> <span>{selectedVoucher.total} Ks</span>
                </div>
                <div className=" flex items-center justify-between ">
                  <span>Tax: </span>
                  <span>{selectedVoucher.tax} Ks</span>
                </div>
                <div className=" flex items-center justify-between ">
                  <span>Total: </span>
                  <span>{selectedVoucher.net_total} Ks</span>
                </div>
              </div>
              <hr className="my-4 border-gray-500" />
              <p className="text-center">Thank You & See You Again!</p>
            </>
          )}
          <hr className="my-4 border-gray-500" />

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => exportVoucher(selectedVoucher.id)}
              className="bg-primary text-white py-2 px-4 rounded-lg hover:opacity-90 transition"
            >
              Export Voucher
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default VoucherTable;

VoucherTable.propTypes = {
  exportVoucher: PropTypes.any,
  vouchers: PropTypes.any,
};
