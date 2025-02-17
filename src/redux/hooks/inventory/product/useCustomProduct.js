// useCustomProduct.js
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useEffect, useMemo } from "react";
import useAuth from "../../auth/useAuth";
import {
  clearProductData,
  productStatus,
} from "../../../services/inventory/product/productSlice";

const useCustomProduct = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();

  // Memoize a selector to reduce re-renders.
  const selectProduct = useMemo(() => (state) => state?.product, []);
  const productResponse = useSelector(selectProduct, shallowEqual);

  const totalProducts = productResponse?.totalProducts;
  const hasLowStock = productResponse?.hasLowStock;
  const hasOutOfStock = productResponse?.hasOutOfStock;
  const lowStockItemCount = productResponse?.lowStockItemCount;
  const outOfStockItemCount = productResponse?.outOfStockItemCount;

  // Fetch all products (no pagination passed)
  useEffect(() => {
    if (token) {
      dispatch(productStatus({ token }));
    } else {
      dispatch(clearProductData());
    }
  }, [token, dispatch]);

  return {
    totalProducts,
    hasLowStock,
    hasOutOfStock,
    lowStockItemCount,
    outOfStockItemCount,
  };
};

export default useCustomProduct;
