import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ========== Authentication APIs ==========

export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

// ========== Property APIs ==========

export const getAllProperties = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.location) params.append('location', filters.location);
  if (filters.minPrice) params.append('minPrice', filters.minPrice);
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
  if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);
  
  const response = await api.get(`/properties?${params.toString()}`);
  return response.data;
};

export const getPropertyById = async (id) => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};

export const createProperty = async (propertyData) => {
  const response = await api.post('/properties', propertyData);
  return response.data;
};

export const updateProperty = async (id, propertyData) => {
  const response = await api.put(`/properties/${id}`, propertyData);
  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await api.delete(`/properties/${id}`);
  return response.data;
};

export const uploadImages = async (formData) => {
  const response = await api.post('/properties/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// ========== User Management APIs (Admin) ==========

export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// ========== Property Moderation APIs (Admin) ==========

export const getPendingProperties = async () => {
  const response = await api.get('/properties/admin/pending');
  return response.data;
};

export const approveProperty = async (id) => {
  const response = await api.patch(`/properties/${id}/approve`);
  return response.data;
};

export const rejectProperty = async (id) => {
  const response = await api.patch(`/properties/${id}/reject`);
  return response.data;
};

// ========== Favorites APIs ==========

export const toggleFavorite = async (propertyId) => {
  const response = await api.post(`/users/favorites/${propertyId}`);
  return response.data;
};

export const getFavorites = async () => {
  const response = await api.get('/users/favorites');
  return response.data;
};

export default api;
