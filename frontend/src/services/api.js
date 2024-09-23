import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const getVMs = () => api.get('/vms');
export const createVM = (vmData) => api.post('/vms', vmData);
export const updateVM = (vmId, vmData) => api.put(`/vms/${vmId}`, vmData);
export const deleteVM = (vmId) => api.delete(`/vms/${vmId}`);

export const getBackups = () => api.get('/backups');
export const createBackup = (backupData) => api.post('/backups', backupData);
export const deleteBackup = (backupId) => api.delete(`/backups/${backupId}`);

export const getUsers = () => api.get('/users');
export const createUser = (userData) => api.post('/users', userData);
export const updateUser = (userId, userData) => api.put(`/users/${userId}`, userData);
export const deleteUser = (userId) => api.delete(`/users/${userId}`);

export default api;