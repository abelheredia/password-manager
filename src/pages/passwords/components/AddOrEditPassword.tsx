import { Modal } from 'antd';
import { FieldValues } from 'react-hook-form';
import { TextField } from '../../../components';

type AddOrEditPasswordProps = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  loadingModal: boolean;
  passwordForm: FieldValues;
  title: string;
};

export const AddOrEditPassword = ({
  isModalOpen,
  handleOk,
  handleCancel,
  loadingModal,
  passwordForm,
  title
}: AddOrEditPasswordProps) => {
  return (
    <Modal
      title={`${title} Password`}
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
  );
};
