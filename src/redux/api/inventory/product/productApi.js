import axios from "axios";
import config from "../../../../config/environment";

const fetchProduct = async (
  token,
  pagination = {},
  search,
  filterProperties,
  column = "name",
  columns = "total_stock"
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    console.log(filterProperties);

    const params = {
      column,
      search,
      columns,
      ...(filterProperties || {}),
      ...(pagination || {}),
    };

    const response = await axios.get(`${config.API_URL}/product/list`, {
      headers,
      params,
    });

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
    console.log("Product Updated", response);
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

const fetchExportProducts = async (token, type) => {
  try {
    // Validate type to ensure only 'excel' or 'csv' are allowed
    if (!["excel", "csv"].includes(type)) {
      throw new Error(
        "Invalid file type. Allowed types are 'excel' and 'csv'."
      );
    }

    // Make the API request to download the file
    const response = await axios.get(
      `${config.API_URL}/product/export/${type}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the authorization token
        },
        responseType: "blob", // Fetch the response as binary data
      }
    );

    // Create a URL for the blob response
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Dynamically set the file name based on the type
    const fileName = `Products.${type === "excel" ? "xlsx" : "csv"}`;

    // Create a hidden anchor element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);

    // Append the anchor to the document, trigger click, and clean up
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Revoke the blob URL after use to free memory
    setTimeout(() => window.URL.revokeObjectURL(url), 1000);

    console.log("File downloaded successfully:", fileName);
  } catch (error) {
    console.error("Failed to export the file:", error);
    throw new Error("Failed to export the file. Please try again.");
  }
};

const fetchImportProducts = async (file, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      `${config.API_URL}/product/import`,
      formData,
      { headers }
    );
    return response?.data;
  } catch (error) {
    console.error("Failed to add product data:", error);
    throw error;
  }
};

export {
  fetchProduct,
  fetchCreateProduct,
  fetchUpdateProduct,
  fetchDeleteProduct,
  fetchProductDetail,
  fetchExportProducts,
  fetchImportProducts,
};
