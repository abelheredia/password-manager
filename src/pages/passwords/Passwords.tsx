import { Typography, Button, Modal, Alert, Card } from 'antd';
import { Password } from '../../types';
import { usePasswords } from '../../hooks';
import { TextField } from '../../components';
import { Head } from '../../components/Head';
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const Passwords = () => {
  const {
    passwordsData,
    isModalOpen,
    showModal,
    handleOk,
    handleCancel,
    passwordForm,
    showModalEdit,
    handleDelete,
    searchPasswordForm,
    isModalDeleteOpen,
    onConfirmDelete,
    action,
    loading,
    loadingModal,
    alert,
    showAlert,
    onCopyPassword
  } = usePasswords();

  const PASSWORD_ACTIONS: (password: Password) => React.ReactNode[] = (
    password
  ) => [
    <CopyOutlined onClick={() => onCopyPassword(password)} key="copy" />,
    <EditOutlined onClick={() => showModalEdit(password)} key="edit" />,
    <DeleteOutlined onClick={() => onConfirmDelete(password)} key="delete" />
  ];

  return (
    <div className="p-10 w-[calc(100vw - 5rem)]">
      <div className="flex flex-col justify-between mb-3 w-full">
        <Head />
        <Title level={3}>Passwords</Title>
        <div className="flex justify-between gap-3">
          <TextField
            hookForm={searchPasswordForm}
            name="description"
            label="Buscar"
          />
          <Button variant="outlined" color="primary" onClick={showModal}>
            Agregar
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {passwordsData.map((password) => (
          <Card
            loading={loading}
            actions={
              password.description !== 'Password Manager'
                ? PASSWORD_ACTIONS(password)
                : []
            }
            key={password.id}
          >
            <Card.Meta
              title={password.description}
              description={
                <>
                  <p>{password.user}</p>
                  <p>{password.email}</p>
                </>
              }
            />
          </Card>
        ))}
      </div>
      <Modal
        title={`${action === 'create' ? 'Agregar' : 'Editar'} Password`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Cancelar"
        okText="Guardar"
        centered
        width={350}
        loading={loadingModal}
      >
        <div className="flex flex-col gap-3 my-5">
          <TextField
            hookForm={passwordForm}
            name="description"
            label="Descripción"
          />
          <TextField hookForm={passwordForm} name="user" label="Usuario" />
          <TextField hookForm={passwordForm} name="email" label="Email" />
          <TextField
            hookForm={passwordForm}
            name="password"
            label="Contraseña"
            type="password"
          />
        </div>
      </Modal>
      <Modal
        title="Eliminar Password"
        open={isModalDeleteOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
        cancelText="Cancelar"
        okText="Eliminar"
        centered
        width={350}
        loading={loadingModal}
      >
        <div className="flex flex-col gap-3 my-5">
          <p>
            ¿Estás seguro que deseas eliminar el password de{' '}
            {passwordForm.watch('description')}?
          </p>
        </div>
      </Modal>
      {showAlert && (
        <Alert
          message={alert.message}
          type={alert.type}
          style={{ position: 'fixed', bottom: 50 }}
        />
      )}
    </div>
  );
};
