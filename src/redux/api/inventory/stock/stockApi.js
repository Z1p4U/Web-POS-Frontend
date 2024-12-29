import axios from "axios";
import config from "../../../../config/environment";

const fetchAddStock = async (stocks, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/stock/add`,
      {
        ...stocks,
      },
      {
        headers,
      }
    );
    // console.log("Stock Added", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to add stock data:", error);
    throw error;
  }
};

const fetchAdjustStock = async (stocks, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/stock/adjust`,
      {
        ...stocks,
      },
      {
        headers,
      }
    );
    // console.log("Stock Updated", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to update stock data:", error);
    throw error;
  }
};

export { fetchAddStock, fetchAdjustStock };
