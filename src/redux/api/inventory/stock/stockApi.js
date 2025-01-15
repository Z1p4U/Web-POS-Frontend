import axios from "axios";
import config from "../../../../config/environment";

const fetchControlStock = async (stocks, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/stock/control`,
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

export { fetchControlStock };
