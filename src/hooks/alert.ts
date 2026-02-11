import { useState } from 'react';
import { IAlert } from '../types';

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

  return { alert, showAlert, displayAlert };
};
