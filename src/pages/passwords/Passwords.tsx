import { Table, Typography, Button, Modal, TableProps } from 'antd';
import { Password } from '../../types';
import { PASSWORD_COLUMNS } from '../../constants';
import { usePasswords } from '../../hooks';
import { TextField, TextArea } from '../../components';

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
    confirmDelete,
    isModalJSONOpen,
    JSONForm,
    handleOkJSON,
    showModalJSON
  } = usePasswords();

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
              confirmDelete(item);
            }}
          >
            Eliminar
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="p-10 w-[100vh]">
      <div className="flex justify-between items-center mb-3 w-full">
        <Title level={3}>Passwords</Title>
        <div className="flex gap-3">
          <TextField hookForm={searchPasswordForm} name="description" label="Buscar" />
          <Button variant="outlined" color="primary" onClick={showModal}>
            Agregar
          </Button>
          <Button variant="outlined" color="primary" onClick={showModalJSON}>
            Agregar JSON
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
      <Modal
        title="Agregar JSON"
        open={isModalJSONOpen}
        onOk={handleOkJSON}
        onCancel={handleCancel}
        cancelText="Cancelar"
        okText="Agregar"
        centered
        width={350}
      >
        <div className="flex flex-col gap-3 my-5">
          <TextArea hookForm={JSONForm} name="json" label="JSON" />
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
          <p>¿Estás seguro que deseas eliminar el password de {passwordForm.watch('description')}?</p>
        </div>
      </Modal>
    </div>
  );
};
