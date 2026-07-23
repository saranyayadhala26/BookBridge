import api from "../api/axios";

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (
  fullName: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string
) => {
  const response = await api.post("/auth/register", {
    fullName,
    email,
    phone,
    password,
    confirmPassword,
  });

  return response.data;
};