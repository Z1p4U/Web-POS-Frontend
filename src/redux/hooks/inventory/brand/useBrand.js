import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "../../auth/useAuth";
import {
  brandCreate,
  brandDelete,
  brandList,
  brandUpdate,
  clearBrandData,
} from "../../../services/inventory/brand/brandSlice";

const useBrand = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [pagination, setPagination] = useState({ page: 1, per_page: 10 });
  const [search, setSearch] = useState("");

  const selectBrand = useMemo(() => (state) => state?.brand, []);

  const brandResponse = useSelector(selectBrand, shallowEqual); // Ensures that it only triggers re-renders if the reference changes

  const brands = brandResponse?.brands;
  const pageCount = brandResponse?.lastPage;
  const totalRecord = brandResponse?.totalRecord;

  useEffect(() => {
    if (token) {
      dispatch(brandList({ token, pagination, search }));
    } else {
      dispatch(clearBrandData());
    }
  }, [token, pagination, dispatch, search]);

  const handleCreateBrand = useCallback(
    async (brands) => {
      try {
        const response = await dispatch(
          brandCreate({
            brands,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to add brands:", error);
      }
    },
    [dispatch, token]
  );

  const handleUpdateBrand = useCallback(
    async (id, brands) => {
      try {
        const response = await dispatch(
          brandUpdate({
            id,
            brands,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to update brands:", error);
      }
    },
    [dispatch, token]
  );

  const handleDeleteBrand = useCallback(
    async (id) => {
      try {
        const response = await dispatch(
          brandDelete({
            id,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to delete brands:", error);
      }
    },
    [dispatch, token]
  );
  return {
    brands,
    search,
    pageCount,
    pagination,
    totalRecord,
    setSearch,
    setPagination,
    handleUpdateBrand,
    handleCreateBrand,
    handleDeleteBrand,
  };
};

export default useBrand;
