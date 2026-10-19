import { FieldValues } from 'react-hook-form';
import { TextField } from '../../../components';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

type SearchOrAddPasswordProps = {
  searchPasswordForm: FieldValues;
  showModal: () => void;
};

export const SearchOrAddPassword = ({
  searchPasswordForm,
  showModal
}: SearchOrAddPasswordProps) => {
  return (
    <div className="flex justify-between gap-2">
      <TextField
        hookForm={searchPasswordForm}
        name="description"
        label="Buscar contraseña"
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={showModal}
        icon={<PlusOutlined />}
      >
        Nueva
      </Button>
    </div>
  );
};
