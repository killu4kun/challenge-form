import { ChangeEvent, FormEvent } from 'react';

export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface UseFormProps {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
  validate: (values: FormValues) => FormErrors;
}

export interface UseFormReturn {
  values: FormValues;
  errors: FormErrors;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
