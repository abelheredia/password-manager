import { Button, Card } from 'antd';
import { useState } from 'react';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons';
import { Password } from '../../../types';

type PasswordCardProps = {
  password: Password;
  loading: boolean;
  onCopyPassword: (password: Password) => void;
  showModalEdit: (password: Password) => void;
  onConfirmDelete: (password: Password) => void;
};

export const PasswordCard = ({
  password,
  loading,
  onCopyPassword,
  showModalEdit,
  onConfirmDelete
}: PasswordCardProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const PASSWORD_ACTIONS: (password: Password) => React.ReactNode[] = (
    password
  ) => [
    <CopyOutlined onClick={() => onCopyPassword(password)} key="copy" />,
    <EditOutlined onClick={() => showModalEdit(password)} key="edit" />,
    <DeleteOutlined onClick={() => onConfirmDelete(password)} key="delete" />
  ];

  return (
    <Card
      loading={loading}
      actions={PASSWORD_ACTIONS(password)}
      key={password.id}
    >
      <Card.Meta
        title={password.description}
        description={
          <>
            <p>{password.user}</p>
            <div className="flex items-center gap-2">
              <p>{isPasswordVisible ? password.password : '••••••••'}</p>
              <Button
                aria-label={
                  isPasswordVisible
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'
                }
                icon={
                  isPasswordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />
                }
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                type="text"
              />
            </div>
          </>
        }
      />
    </Card>
  );
};
