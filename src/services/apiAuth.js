import axios from "../axios";

export async function login(user) {
  const { data } = await axios.post(`/auth/token`, user);
  return data;
}
