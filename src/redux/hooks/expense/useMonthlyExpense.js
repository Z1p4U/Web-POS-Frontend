import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "../auth/useAuth";
import {
  expenseCreate,
  expenseDelete,
  expenseUpdate,
  clearExpenseData,
  monthlyExpense,
} from "../../services/expense/expenseSlice";
import dayjs from "dayjs";

const useMonthlyExpense = ({ page, per_page, noPagination = false } = {}) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState("");

  // Selector to get expense state from Redux
  const selectExpense = useMemo(() => (state) => state?.expense, []);
  const expenseResponse = useSelector(selectExpense, shallowEqual);

  // Destructure values from the expense state
  const expenses = expenseResponse?.expenses;
  const monthlyExpenseList = expenseResponse?.monthlyExpense;
  const sortedExpenses = expenseResponse?.sortedExpenses;
  const pageCount = expenseResponse?.lastPage;
  const totalRecord = expenseResponse?.totalRecord;
  const monthlyExpenseAmount = expenseResponse?.monthlyExpenseAmount;

  useEffect(() => {
    if (token) {
      const pagination = noPagination ? undefined : { page, per_page };

      if (selectedMonth) {
        dispatch(monthlyExpense({ token, month: selectedMonth, pagination }));
      } else {
        const currentMonth = dayjs().format("YYYY-MM");
        dispatch(monthlyExpense({ token, month: currentMonth, pagination }));
      }
    } else {
      dispatch(clearExpenseData());
    }
  }, [dispatch, selectedMonth, token, noPagination, page, per_page]);

  const handleCreateExpense = useCallback(
    async (expenses) => {
      try {
        const response = await dispatch(
          expenseCreate({
            expenses,
            token,
          })
        );

        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to add expense:", error);
      }
    },
    [dispatch, token]
  );

  const handleUpdateExpense = useCallback(
    async (id, expenses) => {
      try {
        const response = await dispatch(
          expenseUpdate({
            id,
            expenses,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to update expense:", error);
      }
    },
    [dispatch, token]
  );

  const handleDeleteExpense = useCallback(
    async (id) => {
      try {
        const response = await dispatch(
          expenseDelete({
            id,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to delete expense:", error);
      }
    },
    [dispatch, token]
  );

  return {
    expenses,
    monthlyExpenseList,
    sortedExpenses,
    selectedMonth,
    pageCount,
    totalRecord,
    monthlyExpenseAmount,
    setSelectedMonth,
    handleUpdateExpense,
    handleCreateExpense,
    handleDeleteExpense,
  };
};

export default useMonthlyExpense;
