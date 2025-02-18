import useForm from '../../hooks/useForm';
import { FormValues, FormErrors } from '../../types/form';
import {
  validateCEP,
  validateEmail,
  validateName,
} from '../../utils/validations';

const Form = () => {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: '',
      cep: '',
    },
    onSubmit: (values: FormValues) => {
      console.log(values);
    },
    validate: (values: FormValues): FormErrors => {
      const errors: FormErrors = {};
      if (!validateName(values.name)) errors.name = 'Nome inválido';
      if (!validateEmail(values.email)) errors.email = 'Email inválido';
      if (!validateCEP(values.cep)) errors.cep = 'CEP inválido';
      return errors;
    },
  });

  return (
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
        {errors.email && <p className='text-red-500'>{errors.email}</p>}
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
      <button type='submit'>Enviar</button>
    </form>
  );
};

export default Form;
