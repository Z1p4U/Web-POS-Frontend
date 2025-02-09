import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo } from "react";
import useAuth from "../../auth/useAuth";
import {
  clearStockData,
  controlStock,
  todayStock,
} from "../../../services/inventory/stock/stockSlice";

const useStock = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();

  const selectProduct = useMemo(() => (state) => state?.stock, []);

  const stockResponse = useSelector(selectProduct, shallowEqual);

  const stockInCount = stockResponse?.stockInCount;
  const stockOutCount = stockResponse?.stockOutCount;

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

  useEffect(() => {
    if (token) {
      dispatch(
        todayStock({
          token,
        })
      );
    } else {
      dispatch(clearStockData());
    }
  }, [dispatch, token]);

  return { handleControlStock, stockInCount, stockOutCount };
};

export default useStock;
