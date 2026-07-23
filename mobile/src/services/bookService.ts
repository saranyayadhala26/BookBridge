import api from "../api/axios";

export const getAllBooks = async () => {
  const response = await api.get("/books");
  return response.data;
};

export const searchBooks = async (text: string) => {
  const response = await api.get("/books/search", {
    params: {
      title: text,
    },
  });

  return response.data;
};