import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePasswordsStore } from '../stores';
import { Password } from '../types';
import { nanoid } from 'nanoid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const usePasswords = () => {
  const { passwords, createPassword, updatePassword, deletePassword } = usePasswordsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const [isModalJSONOpen, setIsModalJSONOpen] = useState(false);

  const [action, setAction] = useState<'create' | 'edit'>('create');

  const [passwordsData, setPasswordsData] = useState<Password[]>([]);

  const schema = yup.object().shape({
    description: yup.string().required('Descripción es requerida'),
    user: yup.string().required('Usuario es requerido'),
    email: yup.string().email('Email inválido'),
    password: yup.string().required('La contraseña es requerida')
  });

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
    resolver: yupResolver(schema)
  });

  const searchPasswordForm = useForm({
    mode: 'all',
    defaultValues: {
      description: ''
    }
  });

  const JSONschema = yup.object().shape({
    json: yup
      .string()
      .required('Passwords son requeridos')
      .matches(/^\[.*\]$/, 'Formato de passwords inválido')
  });

  const JSONForm = useForm({
    mode: 'all',
    defaultValues: {
      json: ''
    },
    resolver: yupResolver(JSONschema)
  });

  const searchPassword = () => {
    const filteredPasswords = passwords.filter((password) => {
      const { description } = searchPasswordForm.getValues();

      return password.description.toLowerCase().includes(description.toLowerCase());
    });

    setPasswordsData(filteredPasswords);
  };

  const showModal = () => {
    setAction('create');
    passwordForm.reset();
    setIsModalOpen(true);
  };

  const showModalJSON = () => {
    JSONForm.reset();
    setIsModalJSONOpen(true);
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
      const { id, description, user, email, password } = passwordForm.getValues();

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
    setIsModalJSONOpen(false);
  };

  const handleOkJSON = () => {
    JSONForm.handleSubmit(() => {
      const { json } = JSONForm.getValues();

      const passwords = JSON.parse(json);

      for (const password of passwords) {
        createPassword({
          id: nanoid(),
          key: nanoid(),
          description: password.description,
          user: password.user,
          email: password.email,
          password: password.password
        });
      }

      setIsModalJSONOpen(false);
    })();
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

  const onCopyJSON = () => {
    const json = JSON.stringify(passwordsData, null, 2);
    navigator.clipboard.writeText(json);
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
    isModalJSONOpen,
    JSONForm,
    handleOkJSON,
    showModalJSON,
    onCopyJSON
  };
};
