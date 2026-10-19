import { Alert } from 'antd';
import { Password } from '../../types';
import { usePasswords } from '../../hooks';
import { Head } from '../../components/Head';
import { DeletePassword } from './components/DeletePassword';
import { AddOrEditPassword } from './components/AddOrEditPassword';
import { PasswordCard } from './components/PasswordCard';
import { SearchOrAddPassword } from './components/SearchOrAddPassword';

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

  const PasswordList = ({ passwordData }: { passwordData: Password[] }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {passwordData.map((password) => (
          <PasswordCard
            password={password}
            loading={loading}
            onCopyPassword={onCopyPassword}
            showModalEdit={showModalEdit}
            onConfirmDelete={onConfirmDelete}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-10 flex flex-col gap-5">
      <Head />
      <SearchOrAddPassword
        searchPasswordForm={searchPasswordForm}
        showModal={showModal}
      />
      <PasswordList passwordData={passwordsData} />
      <AddOrEditPassword
        title={action === 'create' ? 'Agregar' : 'Editar'}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        loadingModal={loadingModal}
        passwordForm={passwordForm}
      />
      <DeletePassword
        isModalDeleteOpen={isModalDeleteOpen}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
        loadingModal={loadingModal}
        passwordForm={passwordForm}
      />
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
