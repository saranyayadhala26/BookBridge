import api from "../api/axios";

export const getAllBooks = async () => {
  const response = await api.get("/books");
  return response.data;
};

export const searchBooks = async (search: string) => {
  const response = await api.get("/books/search", {
    params: {
      title: search,
    },
  });

  return response.data;
};

export const deleteBook = async (bookId: string) => {
  const response = await api.delete(`/books/${bookId}`);
  return response.data;
};

export const updateBook = async (
  bookId: string,
  bookData: {
    title: string;
    author: string;
    category: string;
    description: string;
    condition: string;
    location: string;
  }
) => {
  const response = await api.put(`/books/${bookId}`, bookData);
  return response.data;
};