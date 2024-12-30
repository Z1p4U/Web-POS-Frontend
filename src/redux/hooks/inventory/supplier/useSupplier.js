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

const useSupplier = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [pagination, setPagination] = useState({ page: 1, per_page: 10 });
  const [search, setSearch] = useState("");

  const selectSupplier = useMemo(() => (state) => state?.supplier, []);

  const supplierResponse = useSelector(selectSupplier, shallowEqual); // Ensures that it only triggers re-renders if the reference changes

  const suppliers = supplierResponse?.suppliers;
  const pageCount = supplierResponse?.lastPage;
  const totalRecord = supplierResponse?.totalRecord;

  useEffect(() => {
    if (token) {
      dispatch(supplierList({ token, pagination, search }));
    } else {
      dispatch(clearSupplierData());
    }
  }, [token, pagination, dispatch, search]);

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
  return {
    suppliers,
    search,
    pageCount,
    pagination,
    totalRecord,
    setSearch,
    setPagination,
    handleUpdateSupplier,
    handleCreateSupplier,
    handleDeleteSupplier,
  };
};

export default useSupplier;
