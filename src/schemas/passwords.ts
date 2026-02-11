import { object, string } from 'yup';

export const passwordSchema = object().shape({
  description: string().required('Descripción es requerida'),
  user: string().required('Usuario es requerido'),
  email: string().email('Email inválido'),
  password: string().required('La contraseña es requerida')
});
