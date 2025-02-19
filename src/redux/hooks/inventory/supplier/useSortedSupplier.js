import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useEffect, useMemo } from "react";
import useAuth from "../../auth/useAuth";
import {
  supplierList,
  clearSupplierData,
} from "../../../services/inventory/supplier/supplierSlice";

const useSortedSupplier = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();

  const supplierSort = useMemo(() => ({ order: "name", sort: "ASC" }), []);

  const supplierResponse = useSelector(
    (state) => state?.supplier,
    shallowEqual
  );

  const sortedSuppliers = supplierResponse?.sortedSuppliers;
  const pageCount = supplierResponse?.lastPage;
  const totalRecord = supplierResponse?.totalRecord;

  useEffect(() => {
    if (token) {
      dispatch(
        supplierList({
          token,
          supplierSort,
        })
      );
    } else {
      dispatch(clearSupplierData());
    }
  }, [token, dispatch, supplierSort]);

  return {
    sortedSuppliers,
    pageCount,
    totalRecord,
  };
};

export default useSortedSupplier;
