import api from "../api/axios";

export const requestBook = async (bookId: string) => {
  const response = await api.post(`/borrow/request/${bookId}`);
  return response.data;
};

export const getMyBorrowedBooks = async () => {
  const response = await api.get("/borrow/my-borrowed");
  return response.data;
};

export const getMyLentBooks = async () => {
  const response = await api.get("/borrow/my-lent");
  return response.data;
};

export const acceptBorrowRequest = async (requestId: string) => {
  const response = await api.put(`/borrow/${requestId}/accept`);
  return response.data;
};

export const rejectBorrowRequest = async (requestId: string) => {
  const response = await api.put(`/borrow/${requestId}/reject`);
  return response.data;
};

export const returnBorrowedBook = async (requestId: string) => {
  const response = await api.put(`/borrow/${requestId}/return`);
  return response.data;
};