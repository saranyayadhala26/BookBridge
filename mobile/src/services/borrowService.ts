import api from "../api/axios";

export const requestBorrow = async (bookId: string) => {
  const response = await api.post(`/borrow/request/${bookId}`);
  return response.data;
};