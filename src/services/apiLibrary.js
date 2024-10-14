//Call API here
import axios from "../axios";

export async function getAllData(url) {
  const { data, error } = await axios.get(url);
  if (error) throw new Error(error.messsage);
  return data?.result;
}

export async function createData(url, data) {
  await axios.post(url, data);
}

export async function updateData(url, updatedSample) {
  await axios.put(url, updatedSample);
}

export async function deleteData(url) {
  await axios.delete(url);
}

export const getAllBooks = async ({
  page,
  size,
  sortBy,
  sortDirection,
  title,
  author,
}) => {
  const response = await axios.get(`/books`, {
    params: { page, size, sortBy, sortDirection, title, author },
  });
  return response.data;
};

export const searchBooks = async ({ page, size, query }) => {
  const response = await axios.get(`/books/search`, {
    params: { page, size, query },
  });
  return response.data;
};
