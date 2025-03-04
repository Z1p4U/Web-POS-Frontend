import axios from "axios";
import config from "../../../../config/environment";

const fetchTodayVoucher = async (token, date) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/voucher/today`,
      {
        date,
      },
      {
        headers,
      }
    );
    // console.log("Fetched Voucher:", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to fetch Voucher:", error);
    throw error;
  }
};

const fetchMonthlyVoucher = async (token, month) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/voucher/monthly`,
      {
        month,
      },
      {
        headers,
      }
    );
    // console.log("Fetched Voucher:", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to fetch Voucher:", error);
    throw error;
  }
};

const fetchYearlyVoucher = async (token, year) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/voucher/yearly`,
      {
        year,
      },
      {
        headers,
      }
    );
    // console.log("Fetched Voucher:", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to fetch Voucher:", error);
    throw error;
  }
};

const fetchDaysInMonth = async (token, month) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/voucher/monthly-day`,
      {
        month,
      },
      {
        headers,
      }
    );
    // console.log("Fetched Voucher:", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to fetch Voucher:", error);
    throw error;
  }
};

const fetchMonthsInYear = async (token, year) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/voucher/yearly-month`,
      {
        year,
      },
      {
        headers,
      }
    );
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

const fetchPrintVoucher = async (token, id) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(
      `${config.API_URL}/print/test/${id}`,
      // `${config.API_URL}/print/lan/${id}`,
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

export {
  fetchTodayVoucher,
  fetchMonthlyVoucher,
  fetchYearlyVoucher,
  fetchPrintVoucher,
  fetchVoucherDetail,
  fetchDaysInMonth,
  fetchMonthsInYear,
};
