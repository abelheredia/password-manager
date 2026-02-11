import { Table, Typography, Button, Modal, TableProps } from 'antd';
import { Password } from '../../types';
import { PASSWORD_COLUMNS } from '../../constants';
import { usePasswords } from '../../hooks';
import { TextField } from '../../components';
import { Head } from '../../components/Head';

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
    action
  } = usePasswords();

  const PASSWORD_COLUMNS_ACTIONS: TableProps<Password>['columns'] = [
    ...(PASSWORD_COLUMNS as []),
    {
      title: '',
      render: (item) => (
        <div className="flex gap-3">
          <Button
            color="primary"
            variant="dashed"
            onClick={() => {
              showModalEdit(item);
            }}
          >
            Editar
          </Button>
          <Button
            color="red"
            variant="dashed"
            onClick={() => {
              onConfirmDelete(item);
            }}
          >
            Eliminar
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="p-10 w-[100vw]">
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
      <Table<Password>
        dataSource={passwordsData}
        columns={PASSWORD_COLUMNS_ACTIONS}
      />
      <Modal
        title={`${action === 'create' ? 'Agregar' : 'Editar'} Password`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Cancelar"
        okText="Guardar"
        centered
        width={350}
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
      >
        <div className="flex flex-col gap-3 my-5">
          <p>
            ¿Estás seguro que deseas eliminar el password de{' '}
            {passwordForm.watch('description')}?
          </p>
        </div>
      </Modal>
    </div>
  );
};
