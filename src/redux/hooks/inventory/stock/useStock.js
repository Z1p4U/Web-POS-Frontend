import { useDispatch } from "react-redux";
import { useCallback } from "react";
import useAuth from "../../auth/useAuth";
import { controlStock } from "../../../services/inventory/stock/stockSlice";

const useStock = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();

  const handleControlStock = useCallback(
    async (stocks) => {
      try {
        const response = await dispatch(
          controlStock({
            stocks,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to add stocks:", error);
      }
    },
    [dispatch, token]
  );

  return { handleControlStock };
};

export default useStock;
