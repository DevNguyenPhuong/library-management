//Call API here
import axios from "../axios";

export async function getAllData() {
  const  data  = axios.get(`/categories`);
  if (data?.error) throw new Error(data?.error.messsage);
  console.log(data?.data.result)
  return data?.data.result;
}

export async function createData(url,data) {
  await axios.post(url, data);
}

export async function updateData({ sampleId, updatedSample }) {
  await axios.put(`/samples/${sampleId}`, updatedSample);
}

export async function deleteSample(noteId) {
  await axios.delete(`/samples/${noteId}`);
}

