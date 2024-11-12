import axios from "../axios";

export async function login(user) {
  const { data } = await axios.post(`/auth/token`, user);
  return data;
}

export async function logout(jwt) {
  console.log("hello");
  console.log(jwt);
  await axios.post(`/auth/logout`, { token: jwt });
}
