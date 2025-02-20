import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import useAuth from "../../auth/useAuth";
import {
  clearStockData,
  todayStock,
} from "../../../services/inventory/stock/stockSlice";

const useTodayStock = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();

  const selectProduct = useMemo(() => (state) => state?.stock, []);

  const stockResponse = useSelector(selectProduct, shallowEqual);
  const stockInCount = stockResponse?.stockInCount;
  const stockOutCount = stockResponse?.stockOutCount;

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

  return { stockInCount, stockOutCount };
};

export default useTodayStock;
