import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const submitForm = async (data: {
  name: string;
  email: string;
  cep: string;
}) => {
  try {
    const response = await api.post('/form/submit', data);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error) throw new Error(error.response?.data.message);
    }
  }
  throw new Error('Erro ao enviar o formulário');
};

export const getForms = async () => {
  const response = await api.get('/form/get');
  return response.data;
};
