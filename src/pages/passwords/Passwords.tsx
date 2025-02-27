import { Table, Typography, Button, Modal, TableProps } from 'antd';
import { Password } from '../../types';
import { PASSWORD_COLUMNS } from '../../constants';
import { usePasswords } from '../../hooks';
import { TextField } from '../../components';

const { Title } = Typography;

export const Passwords = () => {
  const { passwordsData, isModalOpen, showModal, handleOk, handleCancel, passwordForm, showModalEdit, handleDelete, searchPasswordForm } =
    usePasswords();

  const PASSWORD_COLUMNS_ACTIONS: TableProps<Password>['columns'] = [
    ...PASSWORD_COLUMNS,
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
              handleDelete(item.id);
            }}
          >
            Eliminar
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-3">
        <Title level={3}>Passwords</Title>
        <div className="flex gap-3">
          <TextField hookForm={searchPasswordForm} name="description" label="Buscar" />
          <Button variant="outlined" color="primary" onClick={showModal}>
            Agregar
          </Button>
          <Button
            variant="outlined"
            color="green"
            onClick={() => {
              console.log('Exportar');
            }}
          >
            Exportar
          </Button>
        </div>
      </div>
      <Table<Password> dataSource={passwordsData} columns={PASSWORD_COLUMNS_ACTIONS} />
      <Modal
        title="Agregar Password"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Cancelar"
        okText="Agregar"
        centered
        width={350}
      >
        <div className="flex flex-col gap-3 my-5">
          <TextField hookForm={passwordForm} name="description" label="Descripción" />
          <TextField hookForm={passwordForm} name="user" label="Usuario" />
          <TextField hookForm={passwordForm} name="email" label="Email" />
          <TextField hookForm={passwordForm} name="password" label="Contraseña" />
        </div>
      </Modal>
    </div>
  );
};
