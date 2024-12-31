import axios from "axios";
import config from "../../../../config/environment";

const fetchBrand = async (token, pagination = {}, search, columns = "name") => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const params = {
      columns,
      search,
      ...(pagination || {}),
    };

    const response = await axios.get(`${config.API_URL}/brand/list`, {
      headers,
      params,
    });

    return response?.data;
  } catch (error) {
    console.log("Failed to fetch Brand:", error);
    throw error;
  }
};

const fetchCreateBrand = async (brands, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/brand/create`,
      {
        ...brands,
      },
      {
        headers,
      }
    );
    // console.log("Brand Added", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to add brand data:", error);
    throw error;
  }
};

const fetchUpdateBrand = async (id, brands, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.put(
      `${config.API_URL}/brand/update/${id}`,
      {
        ...brands,
      },
      {
        headers,
      }
    );
    // console.log("Brand Updated", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to update brand data:", error);
    throw error;
  }
};

const fetchDeleteBrand = async (id, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.delete(
      `${config.API_URL}/brand/delete/${id}`,
      {
        headers,
      }
    );
    console.log("Brand deleted", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to delete brand data:", error);
    throw error;
  }
};

export { fetchBrand, fetchCreateBrand, fetchUpdateBrand, fetchDeleteBrand };
