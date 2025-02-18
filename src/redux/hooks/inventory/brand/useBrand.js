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

const useBrand = ({ page, per_page, noPagination = false } = {}) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [search, setSearch] = useState("");
  const [brandSort, setBrandSort] = useState({});

  const selectBrand = useMemo(() => (state) => state?.brand, []);
  const brandResponse = useSelector(selectBrand, shallowEqual);

  const brands = brandResponse?.brands;
  const sortedBrands = brandResponse?.sortedBrands;
  const pageCount = brandResponse?.lastPage;
  const totalRecord = brandResponse?.totalRecord;

  useEffect(() => {
    if (token) {
      const pagination = noPagination ? undefined : { page, per_page };
      dispatch(
        brandList({
          token,
          pagination,
          search,
          brandSort,
        })
      );
    } else {
      dispatch(clearBrandData());
    }
  }, [token, page, per_page, noPagination, dispatch, search, brandSort]);

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
    sortedBrands,
    search,
    pageCount,
    totalRecord,
    setBrandSort,
    setSearch,
    handleUpdateBrand,
    handleCreateBrand,
    handleDeleteBrand,
  };
};

export default useBrand;
