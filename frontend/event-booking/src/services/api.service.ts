// src/services/apiService.ts

import axios from "axios";

const apiUrl = "http://localhost:5000/api"; // Update this if the API base URL changes

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Helper function to set token for Authorization
const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers["Authorization"];
  }
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const response = await api.post("/auth/register", {
    name,
    email,
    password,
    role,
  });
  return response.data;
};

export const bookEvent = async (eventId: number) => {
  const response = await api.post(`/book/${eventId}`);
  return response.data;
};

export const cancelBooking = async (eventId: number) => {
  const response = await api.delete(`/book/${eventId}`);
  return response.data;
};

export const getEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

// Set token for authentication
export const setToken = (token: string) => {
  setAuthToken(token);
};
