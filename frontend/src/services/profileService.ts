import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}`; // Adjust if needed

// service fetch user profile
export const getProfile = async (token: string) => {
  try {
    console.log(token);
    const response = await axios.get(`${API_URL}users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token for authentication
      },
    });
    console.log(response);
    return response.data; // Returns user profile data
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch profile";
  }
};
