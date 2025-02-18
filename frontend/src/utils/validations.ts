export const validateName = (name: string): boolean => {
  return /^[A-Za-z\s]+$/.test(name); //valida minusculas, maiusculas e espaços/sem caractere especial
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // valida se esta no formato de email
};

export const validateCEP = (cep: string): boolean => {
  return /^\d{8}$/.test(cep); //valida se contem 8 digitos
};
