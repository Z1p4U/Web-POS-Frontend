import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "../../auth/useAuth";
import {
  clearProductData,
  productCreate,
  productDelete,
  productDetail,
  productList,
  productUpdate,
  productImport,
} from "../../../services/inventory/product/productSlice";
import { fetchExportProducts } from "../../../api/inventory/product/productApi";

const useProduct = ({ page, per_page, noPagination = false } = {}) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [relationshipFilters, setRelationshipFilters] = useState({
    brand_id: "",
    category_id: "",
    supplier_id: "",
  });

  const selectProduct = useMemo(() => (state) => state?.product, []);
  const productResponse = useSelector(selectProduct, shallowEqual);

  console.log(relationshipFilters);

  const allProducts = productResponse?.allProducts;
  const products = productResponse?.products;
  const status = productResponse?.status;
  const pageCount = productResponse?.lastPage;
  const totalRecord = productResponse?.totalRecord;
  const hasLowStock = productResponse?.hasLowStock;
  const hasOutOfStock = productResponse?.hasOutOfStock;
  const pdDetail = productResponse?.productDetail;
  const lowStockItemCount = productResponse?.lowStockItemCount;
  const outOfStockItemCount = productResponse?.outOfStockItemCount;

  const filterProperties = useMemo(() => {
    if (filter === "Low") {
      return { operator: "between", value: "1|10" };
    } else if (filter === "Out") {
      return { operator: "=", value: 0 };
    } else {
      return { operator: null, value: null };
    }
  }, [filter]);

  useEffect(() => {
    if (token) {
      const paginationParam = noPagination ? undefined : { page, per_page };
      dispatch(
        productList({
          token,
          pagination: paginationParam,
          search,
          filterProperties,
          relationshipFilters,
        })
      );
    } else {
      dispatch(clearProductData());
    }
  }, [
    token,
    page,
    per_page,
    noPagination,
    dispatch,
    search,
    filterProperties,
    relationshipFilters,
  ]);

  const handleCreateProduct = useCallback(
    async (productsData) => {
      try {
        const response = await dispatch(
          productCreate({
            products: productsData,
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
    async (id, productsData) => {
      try {
        const response = await dispatch(
          productUpdate({
            id,
            products: productsData,
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

  const handleProductDetail = useCallback(
    async (id) => {
      try {
        const response = await dispatch(
          productDetail({
            id,
            token,
          })
        );
        return response;
      } catch (error) {
        console.error("Failed to fetch product detail:", error);
      }
    },
    [dispatch, token]
  );

  const refetchProducts = useCallback(() => {
    if (token) {
      const paginationParam = noPagination ? undefined : { page, per_page };
      dispatch(productList({ token, pagination: paginationParam, search }));
      setFilter("All");
    }
  }, [dispatch, token, search, page, per_page, noPagination]);

  const fetchAllProducts = useCallback(async () => {
    try {
      const perPage = totalRecord || 1000;
      const response = await dispatch(
        productList({
          token,
          pagination: { page: 1, per_page: perPage },
          search: "",
        })
      );
      return response?.payload?.data || [];
    } catch (error) {
      console.error("Failed to fetch all Products:", error);
      return [];
    }
  }, [dispatch, token, totalRecord]);

  const handleFileValidation = (file) => {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxFileSize) {
      throw new Error("File size exceeds the maximum limit of 5MB.");
    }
  };

  const handleImportProducts = useCallback(
    async (file) => {
      try {
        handleFileValidation(file);
        const response = await dispatch(
          productImport({
            file,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to import products:", error);
      }
    },
    [dispatch, token]
  );

  const handleExportProducts = useCallback(
    async (type) => {
      try {
        await fetchExportProducts(token, type);
      } catch (error) {
        console.error("Failed to export Excel:", error);
      }
    },
    [token]
  );

  return {
    products,
    allProducts,
    pdDetail,
    search,
    status,
    pageCount,
    totalRecord,
    filter,
    hasLowStock,
    hasOutOfStock,
    lowStockItemCount,
    outOfStockItemCount,
    relationshipFilters,
    setFilter,
    setSearch,
    refetchProducts,
    handleUpdateProduct,
    handleCreateProduct,
    handleProductDetail,
    handleDeleteProduct,
    fetchAllProducts,
    handleExportProducts,
    handleImportProducts,
    setRelationshipFilters,
  };
};

export default useProduct;
