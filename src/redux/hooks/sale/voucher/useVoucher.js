import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "../../auth/useAuth";
import {
  clearVoucherData,
  todayVoucherList,
  printVoucherData,
  voucherDetailData,
} from "../../../services/sale/voucher/voucherSlice";

const useVoucher = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [selectedDate, setSelectedDate] = useState("");

  const selectVouchers = useMemo(() => (state) => state?.voucher, []);
  const voucherResponse = useSelector(selectVouchers, shallowEqual);

  const vouchers = voucherResponse?.vouchers;
  const dailyTotalSale = voucherResponse?.dailyTotalSale;

  useEffect(() => {
    if (token) {
      dispatch(todayVoucherList({ token, date: selectedDate || null })); // Send date if available, otherwise use today
    } else {
      dispatch(clearVoucherData());
    }
  }, [token, selectedDate, dispatch]);

  const getVoucherDetail = useCallback(
    async (id) => {
      try {
        const response = await dispatch(
          voucherDetailData({
            token,
            id,
          })
        );
        return response.payload.data;
      } catch (error) {
        console.error("Failed to get Voucher Detail", error);
      }
    },
    [dispatch, token]
  );

  const printVoucher = useCallback(
    async (id) => {
      try {
        const response = await dispatch(
          printVoucherData({
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
    printVoucher,
    selectedDate,
    setSelectedDate, // Expose function to update date
  };
};

export default useVoucher;
