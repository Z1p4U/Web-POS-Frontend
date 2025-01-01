import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "../../auth/useAuth";
import {
  categoryCreate,
  categoryDelete,
  categoryList,
  categoryUpdate,
  clearCategoryData,
} from "../../../services/inventory/category/categorySlice";

const useCategory = ({ page, per_page, noPagination = false } = {}) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [search, setSearch] = useState("");

  const selectCategory = useMemo(() => (state) => state?.category, []);

  const categoryResponse = useSelector(selectCategory, shallowEqual); // Ensures that it only triggers re-renders if the reference changes

  const categories = categoryResponse?.categories;
  const pageCount = categoryResponse?.lastPage;
  const totalRecord = categoryResponse?.totalRecord;

  useEffect(() => {
    if (token) {
      const pagination = noPagination ? undefined : { page, per_page };
      dispatch(
        categoryList({
          token,
          pagination,
          search,
        })
      );
    } else {
      dispatch(clearCategoryData());
    }
  }, [token, page, per_page, noPagination, dispatch, search]);

  const handleCreateCategory = useCallback(
    async (categories) => {
      try {
        const response = await dispatch(
          categoryCreate({
            categories,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to add categories:", error);
      }
    },
    [dispatch, token]
  );

  const handleUpdateCategory = useCallback(
    async (id, categories) => {
      try {
        const response = await dispatch(
          categoryUpdate({
            id,
            categories,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to update categories:", error);
      }
    },
    [dispatch, token]
  );

  const handleDeleteCategory = useCallback(
    async (id) => {
      try {
        const response = await dispatch(
          categoryDelete({
            id,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to delete categories:", error);
      }
    },
    [dispatch, token]
  );

  const fetchAllCategory = useCallback(async () => {
    try {
      const perPage = totalRecord || 1000;
      const response = await dispatch(
        categoryList({
          token,
          pagination: { page: 1, per_page: perPage },
          search: "",
        })
      );

      return response?.payload?.data || [];
    } catch (error) {
      console.error("Failed to fetch all categories:", error);
      return [];
    }
  }, [dispatch, token, totalRecord]);

  return {
    categories,
    search,
    pageCount,
    totalRecord,
    setSearch,
    handleUpdateCategory,
    handleCreateCategory,
    handleDeleteCategory,
    fetchAllCategory,
  };
};

export default useCategory;
