import axios from "axios";
import config from "../../../config/environment";

const fetchUser = async (token, pagination = {}, search, columns = "name") => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const params = {
      columns,
      search,
      ...(pagination || {}),
    };

    const response = await axios.get(`${config.API_URL}/user/list`, {
      headers,
      params,
    });

    return response?.data;
  } catch (error) {
    console.log("Failed to fetch Product:", error);
    throw error;
  }
};

const fetchRegister = async (userData, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/user/register`,
      {
        ...userData,
      },
      {
        headers,
      }
    );
    // console.log("User Registered", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to register user :", error);
    throw error;
  }
};

const fetchProfile = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${config.API_URL}/user/profile`, {
      headers,
    });
    // console.log("Fetched your profile :", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to fetch your profile:", error);
    throw error;
  }
};

const fetchUserProfile = async (token, id) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${config.API_URL}/user/profile/${id}`, {
      headers,
    });
    // console.log("Fetched user profile :", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to fetch user profile:", error);
    throw error;
  }
};

const fetchEditProfile = async (userData, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.put(
      `${config.API_URL}/user/edit-profile`,
      {
        ...userData,
      },
      {
        headers,
      }
    );
    // console.log("Profile updated", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to update profile:", error);
    throw error;
  }
};

const fetchEditUserProfile = async (id, userData, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.put(
      `${config.API_URL}/user/edit-profile/${id}`,
      {
        ...userData,
      },
      {
        headers,
      }
    );
    // console.log("User profile updated", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to update user profile:", error);
    throw error;
  }
};

export {
  fetchUser,
  fetchRegister,
  fetchProfile,
  fetchUserProfile,
  fetchEditProfile,
  fetchEditUserProfile,
};
