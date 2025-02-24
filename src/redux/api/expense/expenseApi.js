import axios from "axios";
import config from "../../../config/environment";

const fetchExpense = async (
  token,
  pagination = {},
  search,
  expenseSort,
  columns = "name"
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const params = {
      columns,
      search,
      ...(expenseSort || {}),
      ...(pagination || {}),
    };

    const response = await axios.get(`${config.API_URL}/expense/list`, {
      headers,
      params,
    });

    return response?.data;
  } catch (error) {
    console.log("Failed to fetch Expense:", error);
    throw error;
  }
};

const fetchCreateExpense = async (expenses, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/expense/create`,
      {
        ...expenses,
      },
      {
        headers,
      }
    );
    // console.log("Expense Added", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to add expense data:", error);
    throw error;
  }
};

const fetchUpdateExpense = async (id, expenses, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.put(
      `${config.API_URL}/expense/update/${id}`,
      {
        ...expenses,
      },
      {
        headers,
      }
    );
    // console.log("Expense Updated", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to update expense data:", error);
    throw error;
  }
};

const fetchDeleteExpense = async (id, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.delete(
      `${config.API_URL}/expense/delete/${id}`,
      {
        headers,
      }
    );
    console.log("Expense deleted", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to delete expense data:", error);
    throw error;
  }
};

export {
  fetchExpense,
  fetchCreateExpense,
  fetchUpdateExpense,
  fetchDeleteExpense,
};
