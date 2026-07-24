import api from "../api/axios";

type AddBookData = {
  title: string;
  author: string;
  category: string;
  description: string;
  condition: string;
  location: string;
  image: any;
};

export const addBook = async (data: AddBookData) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("author", data.author);
  formData.append("category", data.category);
  formData.append("description", data.description);
  formData.append("condition", data.condition);
  formData.append("location", data.location);

  formData.append("coverImage", {
    uri: data.image.uri,
    name: "book.jpg",
    type: "image/jpeg",
  } as any);

  const response = await api.post("/books", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};