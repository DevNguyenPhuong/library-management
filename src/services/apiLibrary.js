//Call API here
import axios from "../axios";

export async function getAllData() {
  const { data, error } = await axios.get(`/categories`);
  if (error) throw new Error(error.messsage);
  return data?.result;
}

export async function createData(url, data) {
  await axios.post(url, data);
}

export async function updateData({ sampleId, updatedSample }) {
  await axios.put(`/samples/${sampleId}`, updatedSample);
}

export async function deleteSample(noteId) {
  await axios.delete(`/samples/${noteId}`);
}
