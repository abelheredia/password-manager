import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { loginSchema, registerSchema, forgotPasswordSchema } from '../schemas';
import { useState } from 'react';
import { LoginCredentials, RegisterData } from '../types';
import { authService } from '../services';
import { useAlert } from './alert';
import { useAuthStore } from '../stores';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { alert, showAlert, displayAlert } = useAlert();
  const { profile, setProfile, clearProfile } = useAuthStore();
  const isHydrated = useAuthStore.persist.hasHydrated();

  const handleGoToRegister = () => {
    navigate(ROUTES.REGISTER);
  };

  const handleGoToForgotPassword = () => {
    navigate(ROUTES.FORGOT_PASSWORD);
  };

  const handleGoToLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  const forgotForm = useForm({
    mode: 'all',
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(forgotPasswordSchema)
  });

  const loginForm = useForm<LoginCredentials>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(loginSchema)
  });

  const registerForm = useForm<RegisterData>({
    mode: 'all',
    defaultValues: {
      username: '',
      nombre: '',
      apellido: '',
      email: '',
      password: ''
    },
    resolver: yupResolver(registerSchema)
  });

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { token } = await authService.login(loginForm.getValues());
      displayAlert('Login exitoso', 'success', () => {
        setProfile(token);
        navigate(ROUTES.PASSWORDS);
      });
    } catch (error) {
      displayAlert(`Error en login: ${error}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await authService.register(registerForm.getValues());
      displayAlert(`Registro exitoso: ${response}`, 'success');
    } catch (error) {
      displayAlert(`Error en registro: ${error}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearProfile();
    localStorage.clear();
    handleGoToLogin();
  };

  return {
    handleGoToRegister,
    handleGoToForgotPassword,
    handleGoToLogin,
    forgotForm,
    loginForm,
    registerForm,
    handleLogin,
    handleRegister,
    loading,
    showAlert,
    alert,
    handleLogout,
    profile,
    isInitializing: !isHydrated
  };
};
