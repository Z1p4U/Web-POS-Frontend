import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo } from "react";
import useAuth from "../../auth/useAuth";
import {
  clearVoucherData,
  dailyVoucherList,
  exportVoucherData,
  voucherDetailData,
} from "../../../services/sale/voucher/voucherSlice";

const useVoucher = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();

  const selectVouchers = useMemo(() => (state) => state?.voucher, []);

  const voucherResponse = useSelector(selectVouchers, shallowEqual); // Ensures that it only triggers re-renders if the reference changes

  const vouchers = voucherResponse?.vouchers;
  const dailyTotalSale = voucherResponse?.dailyTotalSale;

  // console.log(voucherResponse);

  useEffect(() => {
    if (token) {
      dispatch(dailyVoucherList({ token }));
    } else {
      dispatch(clearVoucherData());
    }
  }, [token, dispatch]);

  const getVoucherDetail = useCallback(
    async (id) => {
      try {
        const response = await dispatch(
          voucherDetailData({
            token,
            id,
          })
        );
        console.log(response.payload.data);
        return response.payload.data;
      } catch (error) {
        console.error("Failed to get Voucher Detail", error);
      }
    },
    [dispatch, token]
  );

  const exportVoucher = useCallback(
    async (id) => {
      try {
        const response = await dispatch(
          exportVoucherData({
            token,
            id,
          })
        );
        return response.payload.message;
      } catch (error) {
        console.error("Failed to get Voucher Detail", error);
      }
    },
    [dispatch, token]
  );

  return {
    vouchers,
    dailyTotalSale,
    getVoucherDetail,
    exportVoucher,
  };
};

export default useVoucher;
