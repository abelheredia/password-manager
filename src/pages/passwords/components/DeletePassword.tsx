import { Modal } from 'antd';
import { FieldValues } from 'react-hook-form';

type DeletePasswordProps = {
  isModalDeleteOpen: boolean;
  handleDelete: () => void;
  handleCancel: () => void;
  loadingModal: boolean;
  passwordForm: FieldValues;
};

export const DeletePassword = ({
  isModalDeleteOpen,
  handleDelete,
  handleCancel,
  loadingModal,
  passwordForm
}: DeletePasswordProps) => {
  return (
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
  );
};
