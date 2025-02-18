import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const submitForm = async (data: {
  name: string;
  email: string;
  cep: string;
}) => {
  const response = await api.post('/form/submit', data);
  return response.data;
};

export const getForms = async () => {
  const response = await api.get('/form');
  return response.data;
};
