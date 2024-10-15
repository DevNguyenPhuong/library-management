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
