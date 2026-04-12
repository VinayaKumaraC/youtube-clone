// central axios instance for API calls

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090/api",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;