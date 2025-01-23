import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import useAuth from "../../auth/useAuth";
import { checkoutCreate } from "../../../services/sale/checkout/checkoutSlice";

const useCheckout = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();

  const selectCheckout = useMemo(() => (state) => state?.checkout, []);
  const checkoutResponse = useSelector(selectCheckout, shallowEqual);
  const status = checkoutResponse?.status;

  const handleCheckout = useCallback(
    async (formData) => {
      try {
        const response = await dispatch(
          checkoutCreate({
            formData,
            token,
          })
        );

        return response?.payload;
      } catch (error) {
        console.error("Failed to Checkout:", error);
      }
    },
    [dispatch, token]
  );

  return {
    status,
    handleCheckout,
  };
};

export default useCheckout;
