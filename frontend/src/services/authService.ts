import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}auth`; //base url

//service to login the user
export const loginUser = async (email: string, password: string) => {
  try {
    //api call
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Login failed";
  }
};

//service to register the user
export const registerUser = async (
  email: string,
  name: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      name,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Registration failed";
  }
};
