import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor for JWT if needed
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("aitherios:user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const products = {
  getAll: () => API.get("/products"),
  getById: (id) => API.get(`/products/${id}`),
  getByCategory: (cat) => API.get(`/products?category=${cat}`),
};

export const drops = {
  getAll: () => API.get("/drops"),
};

export const auth = {
  login: (credentials) => API.post("/auth/login", credentials),
  register: (userData) => API.post("/auth/register", userData),
  me: () => API.get("/auth/me"),
};

export const admin = {
  getStats: () => API.get("/admin/stats"),
  getProducts: () => API.get("/admin/products"),
  getOrders: () => API.get("/admin/orders"),
  getUsers: () => API.get("/admin/users"),
};

export default API;
