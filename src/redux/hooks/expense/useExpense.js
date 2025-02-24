import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "../auth/useAuth";
import {
  expenseCreate,
  expenseDelete,
  expenseList,
  expenseUpdate,
  clearExpenseData,
} from "../../services/expense/expenseSlice";

const useExpense = ({ page, per_page, noPagination = false } = {}) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [search, setSearch] = useState("");
  const [expenseSort, setExpenseSort] = useState({});

  const selectExpense = useMemo(() => (state) => state?.expense, []);
  const expenseResponse = useSelector(selectExpense, shallowEqual);

  const expenses = expenseResponse?.expenses;
  const sortedExpenses = expenseResponse?.sortedExpenses;
  const pageCount = expenseResponse?.lastPage;
  const totalRecord = expenseResponse?.totalRecord;

  useEffect(() => {
    if (token) {
      const pagination = noPagination ? undefined : { page, per_page };
      dispatch(
        expenseList({
          token,
          pagination,
          search,
          expenseSort,
        })
      );
    } else {
      dispatch(clearExpenseData());
    }
  }, [token, page, per_page, noPagination, dispatch, search, expenseSort]);

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
        console.error("Failed to add expenses:", error);
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
        console.error("Failed to update expenses:", error);
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
        console.error("Failed to delete expenses:", error);
      }
    },
    [dispatch, token]
  );

  return {
    expenses,
    sortedExpenses,
    search,
    pageCount,
    totalRecord,
    setExpenseSort,
    setSearch,
    handleUpdateExpense,
    handleCreateExpense,
    handleDeleteExpense,
  };
};

export default useExpense;
