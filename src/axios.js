import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/library",
  withCredentials: true,
});

//  "/auth/logout",
const publicRoutes = ["/auth/token", "/auth/introspect", "/auth/refresh"];

api.interceptors.request.use(
  (config) => {
    if (!publicRoutes.some((route) => config.url.includes(route))) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401 &&
      !publicRoutes.some((route) => error.config.url.includes(route))
    ) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
