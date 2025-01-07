import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RenderKeypadRow from "./RenderKeypadRow";
import { Modal, Box, Button } from "@mui/material";
import ConfirmationModal from "../../../components/ui/model/ConfirmationModal";
import useCheckout from "../../../redux/hooks/sale/checkout/useCheckout";

const ProductCalculator = ({ selectedProduct, setSelectedProduct }) => {
  const paymentMethods = [
    { id: 1, name: "Cash" },
    { id: 2, name: "K Pay" },
    { id: 3, name: "Wave Money" },
  ];

  const { handleCheckout } = useCheckout();

  const [selectReceivePd, setSelectReceivePd] = useState(null);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isManuallySelected, setIsManuallySelected] = useState(false);
  const [formData, setFormData] = useState({
    products: [],
    payment_type: "",
  });

  useEffect(() => {
    if (selectedProduct.length > 0 && !isManuallySelected) {
      setSelectReceivePd(
        selectedProduct[selectedProduct.length - 1]?.product?.id
      );
    }
  }, [selectedProduct, isManuallySelected]);

  useEffect(() => {
    const totalAmount = selectedProduct.reduce(
      (sum, { quantity, product }) => sum + quantity * product.sale_price,
      0
    );
    setTotal(totalAmount);
    setTax(totalAmount * 0); // Example: 0% tax
  }, [selectedProduct]);

  const handlePayment = () => setModalOpen(true);

  const selectReceiveHandler = (id) => {
    setIsManuallySelected(true);
    setSelectReceivePd(id);
  };

  const updateQuantity = (value, id) => {
    setSelectedProduct((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? {
              ...item,
              quantity: parseInt(`${item.quantity || ""}${value}`, 10) || 1,
            }
          : item
      )
    );
    setIsManuallySelected(true);
  };

  const deleteProduct = (id) => {
    const updatedSelectedProduct = selectedProduct.filter(
      (item) => item.product.id !== id
    );
    setSelectedProduct(updatedSelectedProduct);
  };

  const clearQuantity = (id) => {
    setSelectedProduct((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: 1 } : item
      )
    );
  };

  const deleteLastDigit = (id) => {
    setSelectedProduct((prev) =>
      prev.map((item) => {
        if (item.product.id === id) {
          const newQuantity = item.quantity.toString().slice(0, -1);
          return { ...item, quantity: parseInt(newQuantity, 10) || 1 };
        }
        return item;
      })
    );
  };

  const handleKeypadClick = (value) => {
    if (!selectReceivePd) return;

    if (typeof value === "number" || value === "00") {
      updateQuantity(value, selectReceivePd);
    } else if (value === "DEL") {
      deleteLastDigit(selectReceivePd);
    } else if (value === "CLR") {
      deleteProduct(selectReceivePd);
    } else if (value === "RESET") {
      handleOpenConfirm();
    } else if (value === "CANCEL") {
      clearQuantity(selectReceivePd);
    }
  };

  const handlePaymentSelect = (method) => {
    const products = selectedProduct.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }));

    setFormData({
      products: products,
      payment_type: method,
    });
  };

  const checkoutConfirm = (formData) => {
    handleCheckout(formData);
    setModalOpen(false);
  };

  const handleOpenConfirm = () => setIsConfirm(true);

  const handleCloseConfirm = () => setIsConfirm(false);

  const handleReset = () => {
    setSelectedProduct([]);
    setIsConfirm(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    width: "80%",
    maxWidth: "800px",
    border: "0px",
  };

  return (
    <div className="w-full border-l h-full border-dim bg-primary pt-5">
      <div className="flex flex-col h-full">
        <h1 className="text-[25px] font-semibold px-8 pb-4 tracking-wide text-white">
          Receive
        </h1>

        <div className="h-auto overflow-y-scroll scrollbar">
          {selectedProduct?.map((data) => (
            <div
              onClick={() => selectReceiveHandler(data.product.id)}
              key={data.product.id}
              className={`${
                selectReceivePd === data.product.id ? "bg-[#ffffff15]" : ""
              } border-b pt-1 border-dim flex justify-between items-center hover:bg-[#ffffff15] cursor-pointer`}
            >
              <div className="px-8 pb-2 flex flex-col">
                <p className="tracking-wide text-lg text-white">
                  {data.product.name}
                </p>
                <p className="flex gap-2 text-sm tracking-wide text-[#acaaaa]">
                  <span>
                    {data.quantity || "0"} {data.unit || "khu"}
                  </span>
                  <span className="text-end">{data.product.sale_price}</span>
                </p>
              </div>
              <div>
                <p className="px-8 font-semibold text-lg tracking-wider text-white">
                  {(
                    data.product.sale_price * Number(data.quantity || 0)
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct.length > 0 && (
          <div className="flex justify-end text-white mt-auto py-2">
            <div className="mx-8">
              <p className="text-xl tracking-wide">
                <span>Total: </span>
                <span className="font-semibold">{total.toFixed(2)}</span>
              </p>
              <p className="text-[#acaaaa] text-end tracking-wide">
                Tax: {tax.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        <div
          className={`flex flex-col bg-secondary ${
            selectedProduct.length === 0 ? "mt-auto" : "mt-0"
          }`}
        >
          <RenderKeypadRow
            values={[1, 2, 3, "DEL"]}
            onClick={handleKeypadClick}
          />
          <RenderKeypadRow
            values={[4, 5, 6, "CLR"]}
            onClick={handleKeypadClick}
          />
          <RenderKeypadRow
            values={[7, 8, 9, "RESET"]}
            onClick={handleKeypadClick}
          />
          <RenderKeypadRow
            values={[0, ".", "00", "CANCEL"]}
            onClick={handleKeypadClick}
          />

          <button
            onClick={handlePayment}
            className="border-t hover:bg-[#ffffff15] border-dim py-3 text-[#8ab4f8] font-medium tracking-wider flex justify-center items-center gap-2 uppercase select-none"
          >
            Checkout
          </button>
        </div>
      </div>

      <ConfirmationModal
        open={isConfirm}
        onClose={handleCloseConfirm}
        onConfirm={handleReset}
        message="Are you sure you want to reset? This action cannot be undone."
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ ...modalStyle }}>
          <h2 className=" text-primary text-xl text-center">
            Select Payment Method
          </h2>
          <div className=" flex justify-center items-center my-10 gap-5">
            {paymentMethods?.map((method) => (
              <div
                key={method?.id}
                className={`aspect-square max-w-[120px] w-full rounded-md shadow-md flex justify-center items-center bg-primary text-white cursor-pointer ${formData?.payment_type == method?.name ? "opacity-80" : ""}`}
                onClick={() => handlePaymentSelect(method.name)}
              >
                {method.name}
              </div>
            ))}
          </div>

          <div className=" flex justify-center items-center ">
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
              onClick={() => checkoutConfirm(formData)}
            >
              Export Voucher
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

ProductCalculator.propTypes = {
  selectedProduct: PropTypes.array,
  setSelectedProduct: PropTypes.func,
};

export default ProductCalculator;
