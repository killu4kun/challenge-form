import useForm from '../../hooks/useForm';
import { FormValues, FormErrors } from '../../types/form';
import {
  validateCEP,
  validateEmail,
  validateName,
} from '../../utils/validations';
import { api, getForms } from '../../services/api';
import { useEffect, useState } from 'react';

const Form = () => {
  const [forms, setForms] = useState<FormValues[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingForm, setEditingForm] = useState<FormValues | null>(null);
  const { values, errors, handleChange, handleSubmit, setValues } = useForm({
    initialValues: {
      email: '',
      name: '',
      cep: '',
    },
    onSubmit: async (values: FormValues) => {
      try {
        if (editingForm) {
          await api.patch(`/form/update/${editingForm._id}`, values);
          setEditingForm(null);
        } else {
          await api.post('/form/submit', values);
        }
        fetchForms();
      } catch (error: any) {
        console.log(error);
        setError(error.response.data.message);
      }
    },
    validate: (values: FormValues): FormErrors => {
      const errors: FormErrors = {};
      if (!validateName(values.name)) errors.name = 'Nome inválido';
      if (!validateEmail(values.email)) errors.email = 'Email inválido';
      if (!validateCEP(values.cep)) errors.cep = 'CEP inválido';
      return errors;
    },
  });
  const fetchForms = async () => {
    try {
      const forms = await getForms();
      setForms(forms);
    } catch (error) {
      console.error('Erro ao buscar os formulários:', error);
    }
  };

  useEffect(() => {
    if (editingForm) {
      setValues && setValues(editingForm);
    } else {
      setValues && setValues({ email: '', name: '', cep: '' });
    }
  }, [editingForm, setValues]);

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-8'>
      <div className='bg-white w-full max-w-lg p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold text-center mb-6'>
          {editingForm ? 'Editar Formulário' : 'Novo Formulário'}
        </h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Nome:
            </label>
            <input
              type='text'
              name='name'
              value={values.name}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
            )}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email:
            </label>
            <input
              type='email'
              name='email'
              value={values.email}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              CEP:
            </label>
            <input
              type='text'
              name='cep'
              value={values.cep}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.cep && (
              <p className='text-red-500 text-sm mt-1'>{errors.cep}</p>
            )}
          </div>
          <div className='flex justify-between items-center'></div>

          <button
            type='submit'
            className='bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none'
          >
            {editingForm ? 'Editar' : 'Enviar'}
          </button>
          {editingForm && (
            <button
              type='button'
              onClick={() => setEditingForm(null)}
              className='text-red-600 py-2 px-4 rounded-md hover:bg-red-100 focus:outline-none'
            >
              Cancelar
            </button>
          )}
        </form>
        <div className='mt-8'>
          <h2 className='text-xl font-bold mb-4'>Formulários Enviados</h2>
          <ul className='space-y-4'>
            {forms.map((form, index) => (
              <li
                key={index}
                className='border p-4 rounded-lg shadow-sm hover:bg-gray-100'
              >
                <p>
                  <strong className='font-medium text-gray-800'>Nome:</strong>{' '}
                  {form.name}
                </p>
                <p>
                  <strong className='font-medium text-gray-800'>Email:</strong>{' '}
                  {form.email}
                </p>
                <p>
                  <strong className='font-medium text-gray-800'>CEP:</strong>{' '}
                  {form.cep}
                </p>
                <button
                  className='bg-yellow-500 text-white py-1 px-3 rounded-md mt-2 hover:bg-yellow-600 focus:outline-none'
                  onClick={() => setEditingForm(form)}
                >
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Form;
