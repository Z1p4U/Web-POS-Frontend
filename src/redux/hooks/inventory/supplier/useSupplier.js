import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "../../auth/useAuth";
import {
  clearSupplierData,
  supplierCreate,
  supplierDelete,
  supplierList,
  supplierUpdate,
} from "../../../services/inventory/supplier/supplierSlice";

const useSupplier = ({ page, per_page, noPagination = false } = {}) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [search, setSearch] = useState("");
  const [supplierSort, setSupplierSort] = useState({});

  const selectSupplier = useMemo(() => (state) => state?.supplier, []);

  const supplierResponse = useSelector(selectSupplier, shallowEqual); // Ensures that it only triggers re-renders if the reference changes

  const suppliers = supplierResponse?.suppliers;
  const sortedSuppliers = supplierResponse?.sortedSuppliers;
  const pageCount = supplierResponse?.lastPage;
  const totalRecord = supplierResponse?.totalRecord;

  useEffect(() => {
    if (token) {
      const pagination = noPagination ? undefined : { page, per_page };
      dispatch(
        supplierList({
          token,
          pagination,
          search,
          supplierSort,
        })
      );
    } else {
      dispatch(clearSupplierData());
    }
  }, [token, page, per_page, noPagination, dispatch, search, supplierSort]);

  const handleCreateSupplier = useCallback(
    async (suppliers) => {
      try {
        const response = await dispatch(
          supplierCreate({
            suppliers,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to add suppliers:", error);
      }
    },
    [dispatch, token]
  );

  const handleUpdateSupplier = useCallback(
    async (id, suppliers) => {
      try {
        const response = await dispatch(
          supplierUpdate({
            id,
            suppliers,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to update suppliers:", error);
      }
    },
    [dispatch, token]
  );

  const handleDeleteSupplier = useCallback(
    async (id) => {
      try {
        const response = await dispatch(
          supplierDelete({
            id,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to delete suppliers:", error);
      }
    },
    [dispatch, token]
  );
  const fetchAllSuppliers = useCallback(async () => {
    try {
      const perPage = totalRecord || 1000;
      const response = await dispatch(
        supplierList({
          token,
          pagination: { page: 1, per_page: perPage },
          search: "",
        })
      );

      return response?.payload?.data || [];
    } catch (error) {
      console.error("Failed to fetch all Suppliers:", error);
      return [];
    }
  }, [dispatch, token, totalRecord]);

  return {
    suppliers,
    sortedSuppliers,
    search,
    pageCount,
    totalRecord,
    setSupplierSort,
    setSearch,
    handleUpdateSupplier,
    handleCreateSupplier,
    handleDeleteSupplier,
    fetchAllSuppliers,
  };
};

export default useSupplier;
