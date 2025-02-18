import { useState, FormEvent, ChangeEvent } from 'react';
import {
  FormValues,
  FormErrors,
  UseFormProps,
  UseFormReturn,
} from '../types/form';

const useForm = ({
  initialValues,
  onSubmit,
  validate,
}: UseFormProps): UseFormReturn => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validate(values));
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
  };
};

export default useForm;
