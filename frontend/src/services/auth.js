import api from './api';

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  localStorage.setItem('token', response.data.token);
  return response.data.user;
};

export const logout = async () => {
  await api.post('/auth/logout');
  localStorage.removeItem('token');
};

export const checkAuthStatus = async () => {
  try {
    const response = await api.get('/auth/status');
    return response.data.user;
  } catch (error) {
    localStorage.removeItem('token');
    throw error;
  }
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  localStorage.setItem('token', response.data.token);
  return response.data.user;
};