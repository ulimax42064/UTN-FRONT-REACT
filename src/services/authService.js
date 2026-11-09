import api from './api';

export const login = async (email, password) => {
  const { data } = await api.post('/login/login', { email, password });
  return data; // { mensaje, token }
};

export const registrar = async (datos) => {
  const { data } = await api.post('/login', datos);
  return data;
};
