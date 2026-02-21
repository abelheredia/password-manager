import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePasswordsStore } from '../stores';
import { Password } from '../types';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordSchema } from '../schemas';
import { passwordService } from '../services';
import { useAlert } from './alert';

export const usePasswords = () => {
  const {
    passwords,
    createPassword,
    updatePassword,
    deletePassword,
    setPasswords
  } = usePasswordsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const [action, setAction] = useState<'create' | 'edit'>('create');

  const [passwordsData, setPasswordsData] = useState<Password[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [loadingModal, setLoadingModal] = useState<boolean>(false);

  const { alert, showAlert, displayAlert } = useAlert();

  const passwordForm = useForm({
    mode: 'all',
    defaultValues: {
      id: 0,
      description: '',
      user: '',
      email: '',
      password: ''
    },
    resolver: yupResolver(passwordSchema)
  });

  const searchPasswordForm = useForm({
    mode: 'all',
    defaultValues: {
      description: ''
    }
  });

  const getPasswords = async () => {
    setLoading(true);
    try {
      const response = await passwordService.getAll();
      setPasswordsData(response);
      setPasswords(response);
    } catch (error) {
      displayAlert(`Error al listar: ${error}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const searchPassword = () => {
    const filteredPasswords = passwords.filter((password) => {
      const { description } = searchPasswordForm.getValues();

      return password.description
        .toLowerCase()
        .includes(description.toLowerCase());
    });

    setPasswordsData(filteredPasswords);
  };

  const showModal = () => {
    setAction('create');
    passwordForm.reset();
    setIsModalOpen(true);
  };

  const showModalEdit = (item: Password) => {
    setAction('edit');

    const { id, description, user, email, password } = item;

    passwordForm.setValue('id', id);
    passwordForm.setValue('description', description);
    passwordForm.setValue('user', user);
    passwordForm.setValue('email', email);
    passwordForm.setValue('password', password);

    setIsModalOpen(true);
  };

  const handleOk = () => {
    passwordForm.handleSubmit(async () => {
      setLoadingModal(true);
      try {
        const { id, description, user, email, password } =
          passwordForm.getValues();

        if (action === 'edit') {
          const { status, message } = await passwordService.update(Number(id), {
            description,
            user,
            email,
            password
          });

          if (status === 'success') {
            updatePassword({
              id: Number(id),
              description,
              user,
              email,
              password,
              main: 0
            });
            displayAlert(message, 'success');
          }
        } else {
          const { status, message, data } = await passwordService.create({
            description,
            user,
            email,
            password
          });
          if (status === 'success') {
            createPassword({
              id: data.id,
              description,
              user,
              email,
              password,
              main: 0
            });
            displayAlert(message, 'success');
          }
        }
      } catch (error) {
        displayAlert(
          `Error al ${action === 'create' ? 'crear' : 'editar'} password: ${error}`,
          'error'
        );
      } finally {
        handleFinally();
      }
    })();
  };

  const handleFinally = () => {
    setLoadingModal(false);
    handleCancel();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalDeleteOpen(false);
  };

  const handleDelete = async () => {
    setLoadingModal(true);
    try {
      const { status, message } = await passwordService.delete(
        Number(passwordForm.getValues('id'))
      );
      if (status === 'success') {
        deletePassword(Number(passwordForm.getValues('id')));
        displayAlert(message, 'success');
      }
    } catch (error) {
      displayAlert(`Error al eliminar: ${error}`, 'error');
    } finally {
      handleFinally();
    }
  };

  const onConfirmDelete = (item: Password) => {
    const { id, description } = item;

    passwordForm.setValue('id', id);
    passwordForm.setValue('description', description);

    setIsModalDeleteOpen(true);
  };

  const onCopyPassword = (item: Password) => {
    navigator.clipboard.writeText(item.password);
    displayAlert('Contraseña copiada al portapapeles', 'success');
  };

  useEffect(() => {
    if (passwords.length === 0) {
      getPasswords();
    } else {
      setPasswordsData(passwords);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (passwords.length > 0) {
      setPasswordsData(passwords);
    }
  }, [passwords]);

  useEffect(() => {
    searchPassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPasswordForm.watch('description')]);

  return {
    isModalOpen,
    showModal,
    handleOk,
    handleCancel,
    passwordForm,
    showModalEdit,
    handleDelete,
    searchPasswordForm,
    searchPassword,
    passwordsData,
    isModalDeleteOpen,
    onConfirmDelete,
    action,
    loading,
    alert,
    showAlert,
    loadingModal,
    setLoadingModal,
    onCopyPassword
  };
};
