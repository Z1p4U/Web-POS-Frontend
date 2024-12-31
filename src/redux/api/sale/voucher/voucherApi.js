import axios from "axios";
import config from "../../../../config/environment";

const fetchDailyVoucher = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${config.API_URL}/voucher/daily`, {
      headers,
    });
    // console.log("Fetched Voucher:", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to fetch Voucher:", error);
    throw error;
  }
};

const fetchVoucherDetail = async (token, id) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${config.API_URL}/voucher/show/${id}`, {
      headers,
    });
    // console.log("Fetched Voucher:", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to fetch Voucher:", error);
    throw error;
  }
};

const fetchExportVoucher = async (token, id) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(
      `${config.API_URL}/voucher/print/test/${id}`,
      // `${config.API_URL}/voucher/print/lan/${id}`,
      {
        headers,
      }
    );
    // console.log("Fetched Export:", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to fetch Voucher:", error);
    throw error;
  }
};

export { fetchDailyVoucher, fetchExportVoucher, fetchVoucherDetail };
