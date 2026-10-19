import { useState } from 'react';
import { IAlert } from '../types';
import axios from 'axios';

const getErrorMessage = (
  error: unknown,
  defaultMessage = 'Ocurrió un error inesperado'
): string => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? defaultMessage;
  }

  return defaultMessage;
};

export const useAlert = () => {
  const [showAlert, setShowAlert] = useState(false);

  const [alert, setAlert] = useState<IAlert>({ message: '', type: 'info' });

  const displayAlert = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    method?: () => void
  ) => {
    setAlert({ message, type });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      method?.();
    }, 1000);
  };

  const displayErrorAlert = (
    error: unknown,
    defaultMessage = 'Ocurrió un error inesperado'
  ) => {
    displayAlert(getErrorMessage(error, defaultMessage), 'error');
  };

  return { alert, showAlert, displayAlert, displayErrorAlert };
};
