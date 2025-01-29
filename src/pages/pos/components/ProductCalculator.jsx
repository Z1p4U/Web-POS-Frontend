import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import RenderKeypadRow from "./RenderKeypadRow";
import { Modal, Box, Button } from "@mui/material";
import ConfirmationModal from "../../../components/ui/model/ConfirmationModal";
import useCheckout from "../../../redux/hooks/sale/checkout/useCheckout";
import Swal from "sweetalert2";
import useVoucher from "../../../redux/hooks/sale/voucher/useVoucher";

const ProductCalculator = ({
  selectedProduct,
  setSelectedProduct,
  refetchProducts,
}) => {
  const paymentMethods = [
    { id: 1, name: "Cash" },
    { id: 2, name: "K Pay" },
    { id: 3, name: "Wave Money" },
  ];
  const { handleCheckout } = useCheckout();
  const { printVoucher } = useVoucher();

  const [selectCalcPd, setSelectCalcPd] = useState(null);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isManuallySelected, setIsManuallySelected] = useState(false);
  const [formData, setFormData] = useState({
    products: [],
    payment_type: "",
  });

  const prevLengthRef = useRef(selectedProduct.length);

  useEffect(() => {
    const prevLength = prevLengthRef.current;
    const currentLength = selectedProduct.length;

    if (selectedProduct.length > 0 && !isManuallySelected) {
      setSelectCalcPd(selectedProduct[selectedProduct.length - 1]?.product?.id);
    } else if (isManuallySelected && prevLength !== currentLength) {
      setIsManuallySelected(false);
    }

    prevLengthRef.current = currentLength;
  }, [selectedProduct, isManuallySelected]);

  useEffect(() => {
    const totalAmount = selectedProduct.reduce(
      (sum, { quantity, product }) => sum + quantity * product.sale_price,
      0
    );
    setTotal(totalAmount);
    setTax(totalAmount * 0);
  }, [selectedProduct]);

  const handlePayment = () => setModalOpen(true);

  const selectReceiveHandler = (id) => {
    setSelectCalcPd(id);
    setIsManuallySelected(true);
  };

  const updateQuantity = (value, id) => {
    setSelectedProduct((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? {
              ...item,
              quantity: Math.max(
                Math.min(
                  parseInt(`${item.quantity || ""}${value}`, 10) || 1,
                  item.product.total_stock
                ),
                0
              ),
            }
          : item
      )
    );
  };

  const removeProduct = (id) => {
    const updatedSelectedProduct = selectedProduct.filter(
      (item) => item.product.id !== id
    );
    setSelectedProduct(updatedSelectedProduct);
  };

  const deleteLastDigit = (id) => {
    setSelectedProduct((prev) =>
      prev.map((item) => {
        if (item.product.id === id) {
          const newQuantity = item.quantity.toString().slice(0, -1);
          return { ...item, quantity: parseInt(newQuantity, 10) || 0 };
        }
        return item;
      })
    );
  };

  const handleKeypadClick = (value) => {
    if (!selectCalcPd) return;

    switch (value) {
      case "DEL":
        deleteLastDigit(selectCalcPd);
        break;
      case "REMOVE":
        removeProduct(selectCalcPd);
        break;
      case "RESET":
        handleOpenConfirm();
        break;
      default:
        if (typeof value === "number" || value === "00") {
          updateQuantity(value, selectCalcPd);
        }
        break;
    }
  };

  const handlePaymentSelect = (method) => {
    if (selectedProduct.length === 0) {
      alert("No products selected!");
      return;
    }

    const products = selectedProduct
      .filter((item) => item.quantity > 0)
      .map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      }));

    if (products.length === 0) {
      alert("No products with quantity greater than 0!");
      return;
    }

    setFormData({
      products,
      payment_type: method,
    });
  };

  const checkoutConfirm = async (formData) => {
    const res = await handleCheckout(formData);

    if (res?.message === "Checkout completed successfully.") {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `${res?.message}`,
        footer: `<a href="/sale/daily-voucher"> Go to check voucher</a>`,
      });

      printVoucher(res?.data?.id);

      setModalOpen(false);

      setSelectedProduct([]);

      setFormData({
        products: [],
        payment_type: "",
      });

      refetchProducts();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `${res?.message}`,
      });

      setModalOpen(false);

      refetchProducts();
    }
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
                selectCalcPd === data.product.id ? "bg-[#ffffff15]" : ""
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
            values={[4, 5, 6, "REMOVE"]}
            onClick={handleKeypadClick}
          />
          <RenderKeypadRow
            values={[7, 8, 9, "RESET"]}
            onClick={handleKeypadClick}
          />
          <RenderKeypadRow values={["00", 0, ""]} onClick={handleKeypadClick} />

          <button
            onClick={handlePayment}
            className="border-t hover:bg-[#ffffff15] border-dim py-5 text-[#8ab4f8] font-medium tracking-wider flex justify-center items-center gap-2 uppercase select-none"
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
              Checkout
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
  refetchProducts: PropTypes.func,
};

export default ProductCalculator;
