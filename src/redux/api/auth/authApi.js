import axios from "axios";
import config from "../../../config/environment";

const fetchLogin = async (email, password) => {
  try {
    const response = await axios.post(`${config.API_URL}/login`, {
      email,
      password,
    });
    console.log(response);
    return response?.data;
  } catch (error) {
    console.log("Failed to Login:", error);
    throw error;
  }
};

const fetchRegister = async (
  name,
  role,
  username,
  password,
  selfRegister,
  primaryPhone,
  email,
  addressType
) => {
  try {
    const response = await axios.post(`${config.API_URL}v1/person/create`, {
      name,
      role,
      username,
      password,
      selfRegister,
      contact: {
        primaryPhone,
        email,
        addressType,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Failed to Register:", error);
    throw error;
  }
};

const fetchLogout = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(
      `${config.API_URL}v1/user/revoke_token`,
      { token },
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Failed to Logout:", error);
    throw error;
  }
};

export { fetchLogin, fetchLogout, fetchRegister };
