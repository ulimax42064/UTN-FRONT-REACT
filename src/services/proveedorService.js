import api from './api';

const URL = '/proveedores';

export const obtenerProveedores = async (ciudad = '') => {
  const params = ciudad ? { ciudad } : {};
  const { data } = await api.get(URL, { params });
  return data;
};

export const crearProveedor = async (datos) => {
  const { data } = await api.post(URL, datos);
  return data;
};

export const actualizarCalificacion = async (id, calificacion) => {
  const { data } = await api.patch(`${URL}/${id}/calificacion`, { calificacion });
  return data;
};
