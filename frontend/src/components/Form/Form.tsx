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
    <div className='min-h-screen flex items-center justify-center'>
      <h2 className='flex text-xl font-bold mb-4'>
        {editingForm ? 'Editar Formulário' : 'Novo Formulário'}
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium'>Nome:</label>
          <input
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
            className='w-full p-2 border rounded'
          />
          {errors.name && <p className='text-red-500'>{errors.name}</p>}
        </div>
        <div>
          <label className='block text-sm font-medium'>Email:</label>
          <input
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            className='w-full p-2 border rounded'
          />
          {error && <p className='text-red-500'>{error}</p>}
        </div>
        <div>
          <label className='block text-sm font-medium'>CEP:</label>
          <input
            type='text'
            name='cep'
            value={values.cep}
            onChange={handleChange}
            className='w-full p-2 border rounded'
          />
          {errors.cep && <p className='text-red-500'>{errors.cep}</p>}
        </div>
        <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
          {editingForm ? 'Editar' : 'Enviar'}
        </button>
        {editingForm && (
          <button
            type='button'
            onClick={() => setEditingForm(null)}
            className='bg-red-500 text-white p-2 rounded'
          >
            Cancelar
          </button>
        )}
      </form>
      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>Formulários Enviados</h2>
        <ul>
          {forms.map((form, index) => (
            <li key={index} className='border p-2 mb-2'>
              <p>
                <strong>Nome:</strong> {form.name}
              </p>
              <p>
                <strong>Email:</strong> {form.email}
              </p>
              <p>
                <strong>CEP:</strong> {form.cep}
              </p>
              <button
                className='bg-yellow-500 text-white p-1 rounded mt-2'
                onClick={() => setEditingForm(form)}
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;
