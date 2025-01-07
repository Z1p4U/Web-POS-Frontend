import axios from "axios";
import config from "../../../../config/environment";

const checkout = async (formData, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${config.API_URL}/checkout/handle`,
      {
        ...formData,
      },
      {
        headers,
      }
    );
    // console.log("Checkout Successfully", response);
    return response?.data;
  } catch (error) {
    console.log("Failed to handle checkout:", error);
    throw error;
  }
};

export { checkout };
