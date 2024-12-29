import axios from "axios";
import config from "../../../../config/environment";

const fetchCategory = async (token, pagination, search, columns = "name") => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${config.API_URL}/category/list`, {
      headers,
      params: {
        ...pagination,
        columns,
        search,
      },
    });
    // console.log("Fetched Category:", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to fetch Category:", error);
    throw error;
  }
};

const fetchCreateCategory = async (categories, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/category/create`,
      {
        ...categories,
      },
      {
        headers,
      }
    );
    // console.log("Category Added", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to add category data:", error);
    throw error;
  }
};

const fetchUpdateCategory = async (id, categories, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.put(
      `${config.API_URL}/category/update/${id}`,
      {
        ...categories,
      },
      {
        headers,
      }
    );
    // console.log("Category Updated", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to update category data:", error);
    throw error;
  }
};

const fetchDeleteCategory = async (id, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.delete(
      `${config.API_URL}/category/delete/${id}`,
      {
        headers,
      }
    );
    console.log("Category deleted", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to delete category data:", error);
    throw error;
  }
};

export {
  fetchCategory,
  fetchCreateCategory,
  fetchUpdateCategory,
  fetchDeleteCategory,
};
