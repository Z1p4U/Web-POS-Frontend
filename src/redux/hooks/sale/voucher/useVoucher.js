import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "../../auth/useAuth";
import {
  clearVoucherData,
  todayVoucherList,
  monthlyVoucherList,
  yearlyVoucherList,
  printVoucherData,
  voucherDetailData,
} from "../../../services/sale/voucher/voucherSlice";
import dayjs from "dayjs";

const useVoucher = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [activeFilter, setActiveFilter] = useState("day");

  const selectVouchers = useMemo(() => (state) => state?.voucher, []);
  const voucherResponse = useSelector(selectVouchers, shallowEqual);

  const vouchers = voucherResponse?.vouchers;
  const dailyTotalSale = voucherResponse?.dailyTotalSale;
  const monthlyTotalSale = voucherResponse?.monthlyTotalSale;
  const yearlyTotalSale = voucherResponse?.yearlyTotalSale;

  useEffect(() => {
    if (!token) {
      dispatch(clearVoucherData());
      return;
    }

    switch (activeFilter) {
      case "day":
        if (selectedDay) {
          dispatch(todayVoucherList({ token, date: selectedDay }));
        } else {
          const currentDay = dayjs().format("YYYY-MM-DD");
          dispatch(todayVoucherList({ token, date: currentDay }));
        }
        break;

      case "month":
        if (selectedMonth) {
          dispatch(monthlyVoucherList({ token, month: selectedMonth }));
        } else {
          const currentMonth = dayjs().format("YYYY-MM");
          dispatch(monthlyVoucherList({ token, month: currentMonth }));
        }
        break;

      case "year":
        if (selectedYear) {
          dispatch(yearlyVoucherList({ token, year: selectedYear }));
        } else {
          const currentYear = dayjs().format("YYYY");
          dispatch(yearlyVoucherList({ token, year: currentYear }));
        }
        break;

      default:
        console.warn("Invalid filter type");
    }
  }, [token, activeFilter, selectedDay, selectedMonth, selectedYear, dispatch]);

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
        console.error("Failed to print Voucher", error);
      }
    },
    [dispatch, token]
  );

  return {
    vouchers,
    dailyTotalSale,
    monthlyTotalSale,
    yearlyTotalSale,
    getVoucherDetail,
    printVoucher,
    selectedDay,
    setSelectedDay,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    activeFilter,
    setActiveFilter,
  };
};

export default useVoucher;
