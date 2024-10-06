import axios from "../axios";

export async function getAllSamples() {
  const { data, error } = axios.get(`/samples`);
  if (error) throw new Error(error.messsage);
  return data;
}

export async function createSample(sample) {
  await axios.post(`/samples`, sample);
}

export async function updateSample({ sampleId, updatedSample }) {
  await axios.put(`/samples/${sampleId}`, updatedSample);
}

export async function deleteSample(noteId) {
  await axios.delete(`/samples/${noteId}`);
}
