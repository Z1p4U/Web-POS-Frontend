import axios from "axios";
import config from "../../../../config/environment";

const fetchSupplier = async (
  token,
  pagination = {},
  search,
  columns = "name"
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const params = {
      columns,
      search,
      ...(pagination || {}),
    };

    const response = await axios.get(`${config.API_URL}/supplier/list`, {
      headers,
      params,
    });

    return response?.data;
  } catch (error) {
    console.log("Failed to fetch Supplier:", error);
    throw error;
  }
};

const fetchCreateSupplier = async (suppliers, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/supplier/create`,
      {
        ...suppliers,
      },
      {
        headers,
      }
    );
    // console.log("Supplier Added", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to add supplier data:", error);
    throw error;
  }
};

const fetchUpdateSupplier = async (id, suppliers, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.put(
      `${config.API_URL}/supplier/update/${id}`,
      {
        ...suppliers,
      },
      {
        headers,
      }
    );
    // console.log("Supplier Updated", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to update supplier data:", error);
    throw error;
  }
};

const fetchDeleteSupplier = async (id, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.delete(
      `${config.API_URL}/supplier/delete/${id}`,
      {
        headers,
      }
    );
    console.log("Supplier deleted", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to delete supplier data:", error);
    throw error;
  }
};

export {
  fetchSupplier,
  fetchCreateSupplier,
  fetchUpdateSupplier,
  fetchDeleteSupplier,
};
