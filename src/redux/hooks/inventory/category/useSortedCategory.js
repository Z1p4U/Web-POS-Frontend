import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useEffect, useMemo } from "react";
import useAuth from "../../auth/useAuth";
import {
  categoryList,
  clearCategoryData,
} from "../../../services/inventory/category/categorySlice";

const useSortedCategory = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();

  const categorySort = useMemo(() => ({ order: "name", sort: "ASC" }), []);

  const categoryResponse = useSelector(
    (state) => state?.category,
    shallowEqual
  );

  const sortedCategories = categoryResponse?.sortedCategories;
  const pageCount = categoryResponse?.lastPage;
  const totalRecord = categoryResponse?.totalRecord;

  useEffect(() => {
    if (token) {
      dispatch(
        categoryList({
          token,
          categorySort,
        })
      );
    } else {
      dispatch(clearCategoryData());
    }
  }, [token, dispatch, categorySort]);

  return {
    sortedCategories,
    pageCount,
    totalRecord,
  };
};

export default useSortedCategory;
