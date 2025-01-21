import axios from "axios";
import config from "../../../config/environment";

const fetchShowSetting = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${config.API_URL}/setting/show`, {
      headers,
    });
    // console.log("Fetched your app setting :", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to fetch your app setting:", error);
    throw error;
  }
};

const fetchUpdateSetting = async (setting, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.put(
      `${config.API_URL}/setting/update`,
      {
        ...setting,
      },
      {
        headers,
      }
    );
    // console.log("App Setting updated", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to update app setting:", error);
    throw error;
  }
};

export { fetchShowSetting, fetchUpdateSetting };
