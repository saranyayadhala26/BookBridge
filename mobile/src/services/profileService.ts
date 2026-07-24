import api from "../api/axios";

export const getMyBooks = async () => {
  const response = await api.get("/profile/my-books");
  return response.data;
};