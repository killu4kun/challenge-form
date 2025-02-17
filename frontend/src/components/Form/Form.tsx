import useForm from '../../hooks/useForm';
import { FormValues, FormErrors } from '../../types/form';

const Form = () => {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values: FormValues) => {
      console.log(values);
    },
    validate: (values: FormValues): FormErrors => {
      const errors: FormErrors = {};
      if (!values.email) {
        errors.email = 'Email is required';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      }
      return errors;
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        name='email'
        value={values.email}
        onChange={handleChange}
        placeholder='Email'
      />
      {errors.email && <p>{errors.email}</p>}
      <input
        type='password'
        name='password'
        value={values.password}
        onChange={handleChange}
        placeholder='Password'
      />
      {errors.password && <p>{errors.password}</p>}
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Form;
