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

const fetchExportVoucher = async (token, period, value, fileType) => {
  try {
    // Validate file type: only 'excel' or 'csv' are allowed.
    if (!["excel", "csv"].includes(fileType)) {
      throw new Error(
        "Invalid file type. Allowed types are 'excel' and 'csv'."
      );
    }

    // Example: /voucher/export/excel?period=today&value=2025-02-07
    const url = `${config.API_URL}/voucher/export/${fileType}?period=${period}&value=${value}`;

    // Make the API request with the token and set response type to blob.
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });

    // Create a blob URL and set a dynamic file name.
    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    const fileName = `Vouchers.${fileType === "excel" ? "xlsx" : "csv"}`;

    // Create a hidden anchor element, trigger a download, and clean up.
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);

    console.log("File downloaded successfully:", fileName);
  } catch (error) {
    console.error("Failed to export the file:", error);
    throw new Error("Failed to export the file. Please try again.");
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
  fetchExportVoucher,
};
