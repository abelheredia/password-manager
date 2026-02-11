import { object, string } from 'yup';

export const loginSchema = object().shape({
  email: string().email('Email inválido').required('El correo es requerido'),
  password: string().required('La contraseña es requerida')
});

export const registerSchema = object().shape({
  username: string().required('El nombre de usuario es requerido'),
  nombre: string().required('El nombre completo es requerido'),
  apellido: string().required('El nombre completo es requerido'),
  email: string().email('Email inválido').required('El correo es requerido'),
  password: string().required('La contraseña es requerida')
});

export const forgotPasswordSchema = object().shape({
  email: string().email('Email inválido')
});
