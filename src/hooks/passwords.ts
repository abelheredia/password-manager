import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePasswordsStore } from '../stores';
import { Password } from '../types';
import { nanoid } from 'nanoid';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordSchema } from '../schemas';

export const usePasswords = () => {
  const { passwords, createPassword, updatePassword, deletePassword } =
    usePasswordsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const [action, setAction] = useState<'create' | 'edit'>('create');

  const [passwordsData, setPasswordsData] = useState<Password[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const passwordForm = useForm<any>({
    mode: 'all',
    defaultValues: {
      id: '',
      key: '',
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
    passwordForm.handleSubmit(() => {
      const { id, description, user, email, password } =
        passwordForm.getValues();

      if (action === 'edit') {
        updatePassword({
          id,
          key: nanoid(),
          description,
          user,
          email,
          password
        });
      } else {
        createPassword({
          id: nanoid(),
          key: nanoid(),
          description,
          user,
          email,
          password
        });
      }

      setIsModalOpen(false);
    })();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalDeleteOpen(false);
  };

  const handleDelete = () => {
    deletePassword(passwordForm.getValues('id') as string);
    setIsModalDeleteOpen(false);
  };

  const onConfirmDelete = (item: Password) => {
    const { id, description } = item;

    passwordForm.setValue('id', id);
    passwordForm.setValue('description', description);

    setIsModalDeleteOpen(true);
  };

  useEffect(() => {
    setPasswordsData(passwords);
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
    action
  };
};
