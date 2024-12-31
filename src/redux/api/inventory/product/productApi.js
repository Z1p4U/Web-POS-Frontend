import axios from "axios";
import config from "../../../../config/environment";

const fetchProduct = async (token, pagination, search, columns = "name") => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${config.API_URL}/product/list`, {
      headers,
      params: {
        ...pagination,
        columns,
        search,
      },
    });
    // console.log("Fetched Product:", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to fetch Product:", error);
    throw error;
  }
};

const fetchCreateProduct = async (products, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/product/create`,
      {
        ...products,
      },
      {
        headers,
      }
    );
    // console.log("Product Added", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to add product data:", error);
    throw error;
  }
};

const fetchUpdateProduct = async (id, products, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.put(
      `${config.API_URL}/product/update/${id}`,
      {
        ...products,
      },
      {
        headers,
      }
    );
    // console.log("Product Updated", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to update product data:", error);
    throw error;
  }
};

const fetchDeleteProduct = async (id, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.delete(
      `${config.API_URL}/product/delete/${id}`,
      {
        headers,
      }
    );
    console.log("Product deleted", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to delete product data:", error);
    throw error;
  }
};

const fetchProductDetail = async (token, id) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${config.API_URL}/product/show/${id}`, {
      headers,
    });
    // console.log("Fetched Product Detail :", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to fetch Product Detail:", error);
    throw error;
  }
};

export {
  fetchProduct,
  fetchCreateProduct,
  fetchUpdateProduct,
  fetchDeleteProduct,
  fetchProductDetail,
};
