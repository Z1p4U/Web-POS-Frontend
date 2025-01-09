import { useDispatch } from "react-redux";
import { useCallback } from "react";
import useAuth from "../../auth/useAuth";
import { checkoutCreate } from "../../../services/sale/checkout/checkoutSlice";

const useCheckout = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();

  const handleCheckout = useCallback(
    async (formData) => {
      try {
        const response = await dispatch(
          checkoutCreate({
            formData,
            token,
          })
        );

        // console.log(response);
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to add data:", error);
      }
    },
    [dispatch, token]
  );

  return {
    handleCheckout,
  };
};

export default useCheckout;
