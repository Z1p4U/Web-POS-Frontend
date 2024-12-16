import axios from "axios";
import config from "../../../config/environment";

const fetchPhoto = async (token, pagination) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${config.API_URL}/photo/list`, {
      headers,
      params: pagination,
    });
    // console.log("Fetched Photo:", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to fetch Photo:", error);
    throw error;
  }
};

const addPhoto = async (photos, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`${config.API_URL}/photo/store`, photos, {
      headers,
    });
    // console.log("Photo Added", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to add photo:", error);
    throw error;
  }
};

const deletePhoto = async (id, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.delete(
      `${config.API_URL}/photo/delete/${id}`,
      {
        headers,
      }
    );
    // console.log("Photo Deleted", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to delete photo:", error);
    throw error;
  }
};

export { fetchPhoto, addPhoto, deletePhoto };
