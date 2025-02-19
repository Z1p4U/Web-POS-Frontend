import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useEffect, useMemo } from "react";
import useAuth from "../../auth/useAuth";
import {
  brandList,
  clearBrandData,
} from "../../../services/inventory/brand/brandSlice";

const useSortedBrand = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();

  const brandSort = useMemo(() => ({ order: "name", sort: "ASC" }), []);

  const brandResponse = useSelector((state) => state?.brand, shallowEqual);

  const sortedBrands = brandResponse?.sortedBrands;
  const pageCount = brandResponse?.lastPage;
  const totalRecord = brandResponse?.totalRecord;

  useEffect(() => {
    if (token) {
      dispatch(
        brandList({
          token,
          brandSort,
        })
      );
    } else {
      dispatch(clearBrandData());
    }
  }, [token, dispatch, brandSort]);

  return {
    sortedBrands,
    pageCount,
    totalRecord,
  };
};

export default useSortedBrand;
