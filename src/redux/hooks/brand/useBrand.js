import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "../auth/useAuth";
import {
  brandCreate,
  brandDelete,
  brandList,
  clearBrandData,
} from "../../services/brand/brandSlice";

const useBrand = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [pagination, setPagination] = useState({ page: 1, per_page: 10 });
  const [search, setSearch] = useState("");

  const selectBrand = useMemo(() => (state) => state?.brand, []);

  const brandResponse = useSelector(selectBrand, shallowEqual); // Ensures that it only triggers re-renders if the reference changes

  const brands = brandResponse?.brands;
  const pageCount = brandResponse?.lastPage;

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
    setSearch,
    setPagination,
    handleCreateBrand,
    handleDeleteBrand,
  };
};

export default useBrand;
