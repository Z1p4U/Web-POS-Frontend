import { useDispatch } from "react-redux";
import { useCallback } from "react";
import useAuth from "../../auth/useAuth";
import {
  addStock,
  adjustStock,
} from "../../../services/inventory/stock/stockSlice";

const useStock = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();

  const handleAddStock = useCallback(
    async (stocks) => {
      try {
        const response = await dispatch(
          addStock({
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

  const handleAdjustStock = useCallback(
    async (stocks) => {
      try {
        const response = await dispatch(
          adjustStock({
            stocks,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to adjust stocks:", error);
      }
    },
    [dispatch, token]
  );

  return { handleAddStock, handleAdjustStock };
};

export default useStock;
