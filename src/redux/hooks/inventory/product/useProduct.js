import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "../../auth/useAuth";
import {
  clearProductData,
  productCreate,
  productDelete,
  productList,
  productUpdate,
} from "../../../services/inventory/product/productSlice";

const useProduct = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [pagination, setPagination] = useState({ page: 1, per_page: 10 });
  const [search, setSearch] = useState("");

  const selectProduct = useMemo(() => (state) => state?.product, []);

  const productResponse = useSelector(selectProduct, shallowEqual); // Ensures that it only triggers re-renders if the reference changes

  const products = productResponse?.products;
  const pageCount = productResponse?.lastPage;

  useEffect(() => {
    if (token) {
      dispatch(productList({ token, pagination, search }));
    } else {
      dispatch(clearProductData());
    }
  }, [token, pagination, dispatch, search]);

  const handleCreateProduct = useCallback(
    async (products) => {
      try {
        const response = await dispatch(
          productCreate({
            products,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to add products:", error);
      }
    },
    [dispatch, token]
  );

  const handleUpdateProduct = useCallback(
    async (id, products) => {
      try {
        const response = await dispatch(
          productUpdate({
            id,
            products,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to update products:", error);
      }
    },
    [dispatch, token]
  );

  const handleDeleteProduct = useCallback(
    async (id) => {
      try {
        const response = await dispatch(
          productDelete({
            id,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to delete products:", error);
      }
    },
    [dispatch, token]
  );

  const refetchProducts = useCallback(() => {
    if (token) {
      dispatch(productList({ token, pagination, search }));
    }
  }, [dispatch, token, pagination, search]);

  return {
    products,
    search,
    pageCount,
    pagination,
    setSearch,
    setPagination,
    refetchProducts,
    handleUpdateProduct,
    handleCreateProduct,
    handleDeleteProduct,
  };
};

export default useProduct;
